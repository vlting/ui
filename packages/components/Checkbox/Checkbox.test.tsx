import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
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

  it('wraps content in a label element', () => {
    render(
      <Checkbox.Root>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.closest('label')).toBeTruthy()
  })

  // -- Toggle behavior --

  it('toggles on click', () => {
    const onChange = jest.fn()
    render(
      <Checkbox.Root onCheckedChange={onChange}>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('toggles off when already checked (uncontrolled)', () => {
    const onChange = jest.fn()
    render(
      <Checkbox.Root defaultChecked onCheckedChange={onChange}>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(false)
  })

  // -- Focus --

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

  it('supports indeterminate state via checked prop', () => {
    render(
      <Checkbox.Root checked="indeterminate">
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.indeterminate).toBe(true)
  })

  it('supports indeterminate state via indeterminate prop', () => {
    render(
      <Checkbox.Root indeterminate>
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

  it('does not fire onChange when disabled', () => {
    const onChange = jest.fn()
    render(
      <Checkbox.Root disabled onCheckedChange={onChange}>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).not.toHaveBeenCalled()
  })

  // -- Error state --

  it('sets aria-invalid when error is true', () => {
    render(
      <Checkbox.Root error>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    expect(screen.getByRole('checkbox').getAttribute('aria-invalid')).toBe('true')
  })

  // -- Form integration --

  it('supports name and value props', () => {
    render(
      <Checkbox.Root name="terms" value="accepted">
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.name).toBe('terms')
    expect(checkbox.value).toBe('accepted')
  })

  it('supports required prop', () => {
    render(
      <Checkbox.Root required>
        <Checkbox.Indicator />
      </Checkbox.Root>,
    )
    expect(screen.getByRole('checkbox')).toBeRequired()
  })
})
