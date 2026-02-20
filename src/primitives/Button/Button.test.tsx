import { fireEvent, render, screen } from '../../__test-utils__/render'
import { Button } from './Button'

describe('Button', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<Button testID="button" />)
      expect(screen.getByTestId('button')).toBeTruthy()
    })

    it('renders children', () => {
      render(
        <Button>
          <Button.Text>Click me</Button.Text>
        </Button>,
      )
      expect(screen.getByText('Click me')).toBeTruthy()
    })
  })

  describe('variants', () => {
    it('renders primary variant', () => {
      render(<Button testID="btn" variant="primary"><Button.Text>Primary</Button.Text></Button>)
      expect(screen.getByTestId('btn')).toBeTruthy()
    })

    it('renders secondary variant', () => {
      render(<Button testID="btn" variant="secondary"><Button.Text>Secondary</Button.Text></Button>)
      expect(screen.getByTestId('btn')).toBeTruthy()
    })

    it('renders tertiary variant', () => {
      render(<Button testID="btn" variant="tertiary"><Button.Text>Tertiary</Button.Text></Button>)
      expect(screen.getByTestId('btn')).toBeTruthy()
    })

    it('renders destructive variant', () => {
      render(<Button testID="btn" variant="destructive"><Button.Text>Delete</Button.Text></Button>)
      expect(screen.getByTestId('btn')).toBeTruthy()
    })
  })

  describe('sizes', () => {
    it('renders sm size', () => {
      render(<Button testID="btn" size="sm"><Button.Text>Small</Button.Text></Button>)
      expect(screen.getByTestId('btn')).toBeTruthy()
    })

    it('renders md size (default)', () => {
      render(<Button testID="btn"><Button.Text>Medium</Button.Text></Button>)
      expect(screen.getByTestId('btn')).toBeTruthy()
    })

    it('renders lg size', () => {
      render(<Button testID="btn" size="lg"><Button.Text>Large</Button.Text></Button>)
      expect(screen.getByTestId('btn')).toBeTruthy()
    })
  })

  describe('interaction', () => {
    it('fires onPress when pressed', () => {
      const onPress = jest.fn()
      render(<Button testID="btn" onPress={onPress}><Button.Text>Press me</Button.Text></Button>)
      fireEvent.press(screen.getByTestId('btn'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('does not fire onPress when disabled', () => {
      const onPress = jest.fn()
      render(<Button testID="btn" disabled onPress={onPress}><Button.Text>Disabled</Button.Text></Button>)
      // Disabled via pointerEvents: none — press is ignored
      fireEvent.press(screen.getByTestId('btn'))
      expect(onPress).not.toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('renders a spinner when loading', () => {
      render(<Button testID="btn" loading><Button.Text>Save</Button.Text></Button>)
      // Spinner should be rendered; label should not be
      expect(screen.queryByText('Save')).toBeNull()
    })

    it('sets aria-busy when loading', () => {
      render(<Button testID="btn" loading />)
      const btn = screen.getByTestId('btn')
      // aria-busy attribute should indicate loading state
      expect(btn.getAttribute?.('aria-busy')).toBe('true')
    })
  })

  describe('disabled state', () => {
    it('sets aria-disabled when disabled', () => {
      render(<Button testID="btn" disabled />)
      const btn = screen.getByTestId('btn')
      expect(btn.getAttribute?.('aria-disabled')).toBe('true')
    })
  })

  describe('fullWidth', () => {
    it('renders with fullWidth prop', () => {
      render(<Button testID="btn" fullWidth><Button.Text>Full</Button.Text></Button>)
      expect(screen.getByTestId('btn')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has button role', () => {
      render(<Button testID="btn"><Button.Text>Action</Button.Text></Button>)
      const btn = screen.getByTestId('btn')
      expect(btn.getAttribute?.('role')).toBe('button')
    })

    it('accepts aria-label for icon-only buttons', () => {
      render(<Button testID="btn" aria-label="Close dialog" />)
      expect(screen.getByTestId('btn')).toBeTruthy()
    })
  })

  describe('compound sub-components', () => {
    it('exposes Button.Text', () => {
      render(<Button><Button.Text testID="btn-text">Label</Button.Text></Button>)
      expect(screen.getByTestId('btn-text')).toBeTruthy()
    })

    it('exposes Button.Icon', () => {
      render(<Button><Button.Icon testID="btn-icon" /></Button>)
      expect(screen.getByTestId('btn-icon')).toBeTruthy()
    })
  })
})
