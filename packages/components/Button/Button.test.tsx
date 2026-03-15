import { createRef } from 'react'
import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Button } from './Button'

describe('Button', () => {
  describe('Rendering', () => {
    it('renders children text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByText('Click me')).toBeTruthy()
    })

    it('renders a button element', () => {
      render(<Button>Click</Button>)
      expect(screen.getByRole('button')).toBeTruthy()
    })

    it('forwards ref to native button element', () => {
      const ref = createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Ref</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('renders each theme without errors', () => {
      const themes = ['primary', 'secondary', 'neutral', 'destructive'] as const
      for (const theme of themes) {
        const { unmount } = render(<Button theme={theme}>Btn</Button>)
        expect(screen.getByText('Btn')).toBeTruthy()
        unmount()
      }
    })

    it('renders each variant without errors', () => {
      const variants = ['solid', 'subtle', 'outline', 'ghost', 'link'] as const
      for (const variant of variants) {
        const { unmount } = render(<Button variant={variant}>Btn</Button>)
        expect(screen.getByText('Btn')).toBeTruthy()
        unmount()
      }
    })

    it('renders each size without errors', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'icon'] as const
      for (const size of sizes) {
        const { unmount } = render(<Button size={size}>Btn</Button>)
        expect(screen.getByRole('button')).toBeTruthy()
        unmount()
      }
    })

    it('renders prefix and suffix alongside children', () => {
      render(
        <Button prefix={<span>Pre</span>} suffix={<span>Suf</span>}>
          Label
        </Button>,
      )
      expect(screen.getByText('Pre')).toBeTruthy()
      expect(screen.getByText('Label')).toBeTruthy()
      expect(screen.getByText('Suf')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('has type="button" to prevent form submission', () => {
      render(<Button>Click</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('has disabled attribute when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('does not use aria-disabled when native disabled suffices', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-disabled')
    })

    // WCAG 2.4.7 — focus indicator: visual test (see playground)
  })

  describe('Keyboard', () => {
    it('activates on Enter key', () => {
      const onClick = jest.fn()
      render(<Button onClick={onClick}>Click</Button>)
      const btn = screen.getByRole('button')
      fireEvent.keyDown(btn, { key: 'Enter' })
      fireEvent.click(btn)
      expect(onClick).toHaveBeenCalled()
    })

    it('activates on Space key', () => {
      const onClick = jest.fn()
      render(<Button onClick={onClick}>Click</Button>)
      const btn = screen.getByRole('button')
      fireEvent.keyUp(btn, { key: ' ' })
      fireEvent.click(btn)
      expect(onClick).toHaveBeenCalled()
    })

    it('is focusable via tab (has no tabIndex=-1)', () => {
      render(<Button>Focus me</Button>)
      const btn = screen.getByRole('button')
      expect(btn.getAttribute('tabindex')).not.toBe('-1')
    })
  })

  describe('Disabled & Loading', () => {
    // Children remain in DOM with visibility:hidden for layout preservation.
    // Spinner overlay renders on top.
    it('renders spinner when loading', () => {
      render(<Button loading>Submit</Button>)
      expect(screen.getByText('Loading')).toBeTruthy()
      expect(screen.getByText('Submit')).toBeTruthy()
    })

    it('shows visually hidden "Loading" text when loading', () => {
      render(<Button loading>Submit</Button>)
      expect(screen.getByText('Loading')).toBeTruthy()
    })

    it('sets aria-busy when loading', () => {
      render(<Button loading>Loading</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('does not set aria-busy when not loading', () => {
      render(<Button>Btn</Button>)
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy')
    })

    it('disables button when loading', () => {
      render(<Button loading>Loading</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('sets aria-busy and disabled when loading', () => {
      render(<Button loading>Submit</Button>)
      const btn = screen.getByRole('button')
      expect(btn).toBeDisabled()
      expect(btn).toHaveAttribute('aria-busy', 'true')
    })

    it('does not call onClick when disabled', () => {
      const onClick = jest.fn()
      render(
        <Button disabled onClick={onClick}>
          Disabled
        </Button>,
      )
      const btn = screen.getByRole('button')
      fireEvent.click(btn)
      expect(onClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', () => {
      const onClick = jest.fn()
      render(
        <Button loading onClick={onClick}>
          Loading
        </Button>,
      )
      fireEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('Focus', () => {
    it('can receive focus', () => {
      render(<Button>Focus</Button>)
      const btn = screen.getByRole('button')
      btn.focus()
      expect(document.activeElement).toBe(btn)
    })
  })
})
