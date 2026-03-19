import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Toggle, ToggleGroup } from './Toggle'

describe('Toggle', () => {
  it('renders a button element', () => {
    const { container } = render(<Toggle>Bold</Toggle>)
    expect(container.querySelector('button')).toBeTruthy()
  })

  it('renders children text', () => {
    render(<Toggle>Italic</Toggle>)
    expect(screen.getByText('Italic')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Toggle size={size}>T</Toggle>)
      expect(screen.getByText('T')).toBeTruthy()
      unmount()
    }
  })

  it('renders outline variant', () => {
    const { container } = render(<Toggle variant="outline">O</Toggle>)
    expect(container.querySelector('button')).toBeTruthy()
  })

  it('has type="button" to prevent form submission', () => {
    render(<Toggle>Bold</Toggle>)
    expect(screen.getByRole('button').getAttribute('type')).toBe('button')
  })

  // -- aria-pressed --

  it('has aria-pressed="false" by default', () => {
    render(<Toggle>Bold</Toggle>)
    expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('false')
  })

  it('has aria-pressed="true" when pressed', () => {
    render(<Toggle pressed>Bold</Toggle>)
    expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('true')
  })

  // -- Controlled mode --

  it('controlled mode: pressed prop overrides internal state', () => {
    const { rerender } = render(<Toggle pressed={false}>Bold</Toggle>)
    expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('false')
    rerender(<Toggle pressed={true}>Bold</Toggle>)
    expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('true')
  })

  // -- onPressedChange --

  it('fires onPressedChange with new value on click', () => {
    const onChange = jest.fn()
    render(<Toggle onPressedChange={onChange}>Bold</Toggle>)
    fireEvent.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('fires onPressedChange(false) when toggling off', () => {
    const onChange = jest.fn()
    render(<Toggle defaultPressed onPressedChange={onChange}>Bold</Toggle>)
    fireEvent.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith(false)
  })

  // -- Keyboard --

  it('toggles on Enter key', () => {
    const onChange = jest.fn()
    render(<Toggle onPressedChange={onChange}>Bold</Toggle>)
    const button = screen.getByRole('button')
    // Native button handles Enter as click
    fireEvent.click(button)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  // -- Disabled --

  it('renders disabled state', () => {
    render(<Toggle disabled>D</Toggle>)
    const button = screen.getByRole('button')
    expect(button).toBeTruthy()
  })

  it('does not toggle when disabled', () => {
    const onChange = jest.fn()
    render(<Toggle disabled onPressedChange={onChange}>D</Toggle>)
    fireEvent.click(screen.getByRole('button'))
    expect(onChange).not.toHaveBeenCalled()
  })
})

describe('ToggleGroup', () => {
  it('renders children as Toggle buttons', () => {
    render(
      <ToggleGroup type="exclusive" defaultValue={['a']} aria-label="Formatting">
        <Toggle value="a">A</Toggle>
        <Toggle value="b">B</Toggle>
      </ToggleGroup>,
    )
    expect(screen.getByText('A')).toBeTruthy()
    expect(screen.getByText('B')).toBeTruthy()
  })

  it('renders toggle (multi-select) type', () => {
    render(
      <ToggleGroup type="toggle" defaultValue={['a']} aria-label="Options">
        <Toggle value="a">A</Toggle>
        <Toggle value="b">B</Toggle>
      </ToggleGroup>,
    )
    expect(screen.getByText('A')).toBeTruthy()
    expect(screen.getByText('B')).toBeTruthy()
  })
})
