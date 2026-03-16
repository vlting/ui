import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { useFocusScope, type UseFocusScopeProps } from './useFocusScope'

function FocusScopeFixture({ contain = true, ...props }: UseFocusScopeProps) {
  const { getScopeProps } = useFocusScope({ contain, ...props })
  return (
    <div {...getScopeProps()} data-testid="scope">
      <button data-testid="first">First</button>
      <input data-testid="middle" />
      <button data-testid="last">Last</button>
    </div>
  )
}

function EmptyFixture(props: UseFocusScopeProps) {
  const { getScopeProps } = useFocusScope(props)
  return (
    <div {...getScopeProps()} data-testid="scope">
      <span>No focusable elements</span>
    </div>
  )
}

function SingleFocusableFixture(props: UseFocusScopeProps) {
  const { getScopeProps } = useFocusScope(props)
  return (
    <div {...getScopeProps()} data-testid="scope">
      <button data-testid="only">Only</button>
    </div>
  )
}

function RestoreFixture() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button data-testid="trigger" onClick={() => setOpen(true)}>
        Open
      </button>
      {open && (
        <FocusScopeFixture
          contain
          restoreFocus
          autoFocus
        />
      )}
      {open && (
        <button data-testid="close" onClick={() => setOpen(false)}>
          Close
        </button>
      )}
    </div>
  )
}

function DeactivateFixture() {
  const [contain, setContain] = useState(true)
  const { getScopeProps } = useFocusScope({ contain })
  return (
    <div>
      <div {...getScopeProps()} data-testid="scope">
        <button data-testid="inner">Inner</button>
      </div>
      <button data-testid="outer" onClick={() => setContain(false)}>
        Outer
      </button>
    </div>
  )
}

describe('useFocusScope', () => {
  describe('focus containment', () => {
    it('Tab from last element moves to first', () => {
      render(<FocusScopeFixture />)
      const last = screen.getByTestId('last')
      last.focus()
      fireEvent.keyDown(screen.getByTestId('scope'), { key: 'Tab' })
      expect(document.activeElement).toBe(screen.getByTestId('first'))
    })

    it('Shift+Tab from first element moves to last', () => {
      render(<FocusScopeFixture />)
      const first = screen.getByTestId('first')
      first.focus()
      fireEvent.keyDown(screen.getByTestId('scope'), {
        key: 'Tab',
        shiftKey: true,
      })
      expect(document.activeElement).toBe(screen.getByTestId('last'))
    })

    it('Tab cycles within scope', () => {
      render(<FocusScopeFixture />)
      const scope = screen.getByTestId('scope')
      const last = screen.getByTestId('last')
      const first = screen.getByTestId('first')

      last.focus()
      fireEvent.keyDown(scope, { key: 'Tab' })
      expect(document.activeElement).toBe(first)

      // Tab from first should NOT wrap (middle is next in DOM)
      first.focus()
      fireEvent.keyDown(scope, { key: 'Tab' })
      // First is not the last element, so default behavior (not prevented)
      expect(document.activeElement).toBe(first)
    })
  })

  describe('auto-focus', () => {
    it('focuses first focusable element on mount when autoFocus=true', () => {
      render(<FocusScopeFixture autoFocus />)
      expect(document.activeElement).toBe(screen.getByTestId('first'))
    })

    it('does not auto-focus when autoFocus=false', () => {
      render(<FocusScopeFixture autoFocus={false} />)
      expect(document.activeElement).not.toBe(screen.getByTestId('first'))
    })
  })

  describe('focus restore', () => {
    it('restores focus to previously focused element on unmount', () => {
      render(<RestoreFixture />)
      const trigger = screen.getByTestId('trigger')
      trigger.focus()
      fireEvent.click(trigger)

      // Scope should auto-focus first element
      expect(document.activeElement).toBe(screen.getByTestId('first'))

      // Close the scope
      fireEvent.click(screen.getByTestId('close'))

      // Focus should return to trigger
      expect(document.activeElement).toBe(trigger)
    })

    it('does not restore focus when restoreFocus=false', () => {
      function NoRestoreFixture() {
        const [open, setOpen] = useState(false)
        return (
          <div>
            <button data-testid="trigger" onClick={() => setOpen(true)}>
              Open
            </button>
            {open && (
              <FocusScopeFixture contain restoreFocus={false} autoFocus />
            )}
            {open && (
              <button data-testid="close" onClick={() => setOpen(false)}>
                Close
              </button>
            )}
          </div>
        )
      }
      render(<NoRestoreFixture />)
      const trigger = screen.getByTestId('trigger')
      trigger.focus()
      fireEvent.click(trigger)
      fireEvent.click(screen.getByTestId('close'))
      expect(document.activeElement).not.toBe(trigger)
    })
  })

  describe('deactivation', () => {
    it('contain=false stops trapping', () => {
      const { rerender } = render(<FocusScopeFixture contain />)
      const last = screen.getByTestId('last')
      last.focus()

      // With contain=true, Tab from last wraps to first
      fireEvent.keyDown(screen.getByTestId('scope'), { key: 'Tab' })
      expect(document.activeElement).toBe(screen.getByTestId('first'))

      // With contain=false, no wrapping
      rerender(<FocusScopeFixture contain={false} />)
      last.focus()
      fireEvent.keyDown(screen.getByTestId('scope'), { key: 'Tab' })
      // Should not wrap — activeElement stays on last (default browser behavior)
      expect(document.activeElement).toBe(last)
    })
  })

  describe('prop-getter', () => {
    it('getScopeProps returns ref and onKeyDown', () => {
      let scopeProps: ReturnType<ReturnType<typeof useFocusScope>['getScopeProps']>
      function PropsInspector() {
        const { getScopeProps } = useFocusScope()
        scopeProps = getScopeProps()
        return <div {...scopeProps} data-testid="scope"><button>btn</button></div>
      }
      render(<PropsInspector />)
      expect(scopeProps!.ref).toBeDefined()
      expect(scopeProps!.ref.current).toBeInstanceOf(HTMLElement)
      expect(typeof scopeProps!.onKeyDown).toBe('function')
    })

    it('props spread correctly onto container', () => {
      render(<FocusScopeFixture />)
      const scope = screen.getByTestId('scope')
      expect(scope).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('empty scope does not throw on Tab', () => {
      render(<EmptyFixture />)
      expect(() => {
        fireEvent.keyDown(screen.getByTestId('scope'), { key: 'Tab' })
      }).not.toThrow()
    })

    it('single focusable child keeps focus on Tab', () => {
      render(<SingleFocusableFixture />)
      const only = screen.getByTestId('only')
      only.focus()
      // Tab on the only element — it's both first and last, so wraps to itself
      fireEvent.keyDown(screen.getByTestId('scope'), { key: 'Tab' })
      expect(document.activeElement).toBe(only)
    })
  })
})
