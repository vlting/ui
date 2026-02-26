import { render, screen } from '../../../src/__test-utils__/render'
import { Button } from './Button'

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeTruthy()
  })

  it('renders a button element', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toBeTruthy()
  })

  it('calls onPress when clicked', () => {
    const onPress = jest.fn()
    render(<Button onPress={onPress}>Click</Button>)
    screen.getByRole('button').click()
    expect(onPress).toHaveBeenCalled()
  })

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn()
    render(
      <Button disabled onPress={onPress}>
        Disabled
      </Button>,
    )
    const btn = screen.getByRole('button')
    // Tamagui uses aria-disabled instead of native disabled attribute
    expect(btn).toHaveAttribute('aria-disabled', 'true')
  })

  it.skip('shows aria-busy when loading', () => {
    // TODO: Tamagui may not render aria-busy in JSDOM
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })

  it('renders each variant without errors', () => {
    const variants = [
      'default',
      'solid',
      'secondary',
      'destructive',
      'outline',
      'ghost',
      'link',
    ] as const
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

  it('renders Button.Text sub-component', () => {
    render(
      <Button>
        <Button.Text>Label</Button.Text>
      </Button>,
    )
    expect(screen.getByText('Label')).toBeTruthy()
  })
})
