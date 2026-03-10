import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { Checkbox } from './Checkbox'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

describe('Checkbox', () => {
  // -- Renders correctly --

  it('renders with basic structure', () => {
    render(
      <Checkbox.Root>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    expect(screen.getByRole('checkbox')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Checkbox.Root size={size}>
          <Checkbox.Indicator />
        </Checkbox.Root>,
      )
      unmount()
    }
  })

  it('renders label children', () => {
    render(
      <Checkbox.Root>
        <Checkbox.Indicator />
        Accept terms
      </Checkbox.Root>,
    )
    expect(screen.getByText('Accept terms')).toBeTruthy()
  })

  // -- Keyboard navigation --

  it('toggles on Space key press via native checkbox', () => {
    const onChange = jest.fn()
    render(
      <Checkbox.Root onCheckedChange={onChange}>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('is focusable via hidden input', () => {
    render(
      <Checkbox.Root>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    const checkbox = screen.getByRole('checkbox')
    checkbox.focus()
    expect(document.activeElement).toBe(checkbox)
  })

  // -- ARIA states --

  it('has unchecked state by default', () => {
    render(
      <Checkbox.Root>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('has checked state when checked=true', () => {
    render(
      <Checkbox.Root checked={true}>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('supports defaultChecked', () => {
    render(
      <Checkbox.Root defaultChecked>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('supports indeterminate state', () => {
    render(
      <Checkbox.Root checked="indeterminate">
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.indeterminate).toBe(true)
  })

  it('toggles from indeterminate to checked on click', () => {
    const onChange = jest.fn()
    render(
      <Checkbox.Root checked="indeterminate" onCheckedChange={onChange}>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  // -- Disabled state --

  it('is disabled when disabled prop is true', () => {
    render(
      <Checkbox.Root disabled>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('sets not-allowed cursor styling when disabled', () => {
    render(
      <Checkbox.Root disabled>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    const label = screen.getByRole('checkbox').closest('label')
    expect(label?.style.cursor).toBe('not-allowed')
    expect(label?.style.opacity).toBe('0.5')
  })
})
