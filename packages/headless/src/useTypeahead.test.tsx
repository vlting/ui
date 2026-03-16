import { fireEvent, render, screen } from '@testing-library/react'
import { useTypeahead, type UseTypeaheadProps } from './useTypeahead'

const defaultItems = ['Apple', 'Banana', 'Cherry', 'Date']

function TypeaheadFixture(props: Partial<UseTypeaheadProps>) {
  const items = props.items ?? defaultItems
  const onMatch = props.onMatch ?? jest.fn()
  const { getTypeaheadProps, clearBuffer } = useTypeahead({ items, onMatch, ...props })
  return (
    <div {...getTypeaheadProps()} data-testid="container" tabIndex={0}>
      {items.map((item, i) => (
        <div key={i} data-testid={`item-${i}`}>
          {item}
        </div>
      ))}
      <button data-testid="clear" onClick={clearBuffer}>
        Clear
      </button>
    </div>
  )
}

describe('useTypeahead', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('basic matching', () => {
    it('single char matches first item starting with that char', () => {
      const onMatch = jest.fn()
      render(<TypeaheadFixture onMatch={onMatch} />)
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'b' })
      expect(onMatch).toHaveBeenCalledWith(1) // Banana
    })

    it('multiple chars accumulate and match prefix', () => {
      const onMatch = jest.fn()
      render(<TypeaheadFixture onMatch={onMatch} />)
      const container = screen.getByTestId('container')
      fireEvent.keyDown(container, { key: 'c' })
      fireEvent.keyDown(container, { key: 'h' })
      expect(onMatch).toHaveBeenLastCalledWith(2) // Cherry
    })
  })

  describe('case insensitive', () => {
    it('lowercase input matches uppercase items', () => {
      const onMatch = jest.fn()
      render(<TypeaheadFixture onMatch={onMatch} />)
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'a' })
      expect(onMatch).toHaveBeenCalledWith(0) // Apple
    })

    it('uppercase input matches items', () => {
      const onMatch = jest.fn()
      render(<TypeaheadFixture onMatch={onMatch} />)
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'D' })
      expect(onMatch).toHaveBeenCalledWith(3) // Date
    })
  })

  describe('buffer timeout', () => {
    it('buffer clears after default timeout (500ms)', () => {
      const onMatch = jest.fn()
      render(<TypeaheadFixture onMatch={onMatch} />)
      const container = screen.getByTestId('container')

      fireEvent.keyDown(container, { key: 'd' })
      expect(onMatch).toHaveBeenCalledWith(3) // Date

      jest.advanceTimersByTime(500)

      // After timeout, buffer is clear — typing 'a' matches Apple, not 'da...'
      fireEvent.keyDown(container, { key: 'a' })
      expect(onMatch).toHaveBeenLastCalledWith(0) // Apple
    })

    it('new typing after timeout starts fresh buffer', () => {
      const onMatch = jest.fn()
      render(<TypeaheadFixture onMatch={onMatch} />)
      const container = screen.getByTestId('container')

      fireEvent.keyDown(container, { key: 'c' })
      jest.advanceTimersByTime(500)

      fireEvent.keyDown(container, { key: 'b' })
      expect(onMatch).toHaveBeenLastCalledWith(1) // Banana, not 'cb'
    })
  })

  describe('custom timeout', () => {
    it('respects custom timeout value', () => {
      const onMatch = jest.fn()
      render(<TypeaheadFixture onMatch={onMatch} timeout={200} />)
      const container = screen.getByTestId('container')

      fireEvent.keyDown(container, { key: 'c' })
      expect(onMatch).toHaveBeenCalledWith(2) // Cherry

      jest.advanceTimersByTime(200)

      fireEvent.keyDown(container, { key: 'a' })
      expect(onMatch).toHaveBeenLastCalledWith(0) // Apple (buffer cleared at 200ms)
    })
  })

  describe('no match', () => {
    it('no onMatch call when nothing matches', () => {
      const onMatch = jest.fn()
      render(<TypeaheadFixture onMatch={onMatch} />)
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'z' })
      expect(onMatch).not.toHaveBeenCalled()
    })
  })

  describe('modifier keys', () => {
    it('Ctrl+key is ignored', () => {
      const onMatch = jest.fn()
      render(<TypeaheadFixture onMatch={onMatch} />)
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'a', ctrlKey: true })
      expect(onMatch).not.toHaveBeenCalled()
    })

    it('Meta+key is ignored', () => {
      const onMatch = jest.fn()
      render(<TypeaheadFixture onMatch={onMatch} />)
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'a', metaKey: true })
      expect(onMatch).not.toHaveBeenCalled()
    })

    it('Alt+key is ignored', () => {
      const onMatch = jest.fn()
      render(<TypeaheadFixture onMatch={onMatch} />)
      fireEvent.keyDown(screen.getByTestId('container'), { key: 'a', altKey: true })
      expect(onMatch).not.toHaveBeenCalled()
    })

    it('non-printable keys are ignored', () => {
      const onMatch = jest.fn()
      render(<TypeaheadFixture onMatch={onMatch} />)
      const container = screen.getByTestId('container')
      fireEvent.keyDown(container, { key: 'Enter' })
      fireEvent.keyDown(container, { key: 'Escape' })
      fireEvent.keyDown(container, { key: 'ArrowDown' })
      expect(onMatch).not.toHaveBeenCalled()
    })
  })

  describe('clearBuffer', () => {
    it('imperatively clears buffer and subsequent typing starts fresh', () => {
      const onMatch = jest.fn()
      render(<TypeaheadFixture onMatch={onMatch} />)
      const container = screen.getByTestId('container')

      fireEvent.keyDown(container, { key: 'c' })
      expect(onMatch).toHaveBeenCalledWith(2) // Cherry

      fireEvent.click(screen.getByTestId('clear'))

      // After clear, typing 'a' should match Apple, not 'ca'
      fireEvent.keyDown(container, { key: 'a' })
      expect(onMatch).toHaveBeenLastCalledWith(0) // Apple
    })
  })

  describe('prop-getter', () => {
    it('getTypeaheadProps returns onKeyDown', () => {
      let typeaheadProps: ReturnType<ReturnType<typeof useTypeahead>['getTypeaheadProps']>
      function PropsInspector() {
        const { getTypeaheadProps } = useTypeahead({
          items: ['a'],
          onMatch: jest.fn(),
        })
        typeaheadProps = getTypeaheadProps()
        return <div {...typeaheadProps}>test</div>
      }
      render(<PropsInspector />)
      expect(typeof typeaheadProps!.onKeyDown).toBe('function')
    })
  })
})
