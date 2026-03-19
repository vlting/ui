import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { RadioGroup } from './RadioGroup'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

describe('RadioGroup', () => {
  // -- Renders correctly --

  it('renders without crashing', () => {
    expect(() =>
      render(
        <RadioGroup.Root>
          <RadioGroup.Item value="a">Option A</RadioGroup.Item>
          <RadioGroup.Item value="b">Option B</RadioGroup.Item>
        </RadioGroup.Root>,
      ),
    ).not.toThrow()
  })

  it('renders item labels', () => {
    render(
      <RadioGroup.Root>
        <RadioGroup.Item value="a">Option A</RadioGroup.Item>
        <RadioGroup.Item value="b">Option B</RadioGroup.Item>
      </RadioGroup.Root>,
    )
    expect(screen.getByText('Option A')).toBeTruthy()
    expect(screen.getByText('Option B')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <RadioGroup.Root size={size}>
          <RadioGroup.Item value="a">A</RadioGroup.Item>
        </RadioGroup.Root>,
      )
      unmount()
    }
  })

  it('renders horizontal orientation', () => {
    expect(() =>
      render(
        <RadioGroup.Root orientation="horizontal">
          <RadioGroup.Item value="a">A</RadioGroup.Item>
          <RadioGroup.Item value="b">B</RadioGroup.Item>
        </RadioGroup.Root>,
      ),
    ).not.toThrow()
  })

  // -- Selection --

  it('selects item on click', () => {
    const onChange = jest.fn()
    render(
      <RadioGroup.Root onValueChange={onChange}>
        <RadioGroup.Item value="a">Option A</RadioGroup.Item>
        <RadioGroup.Item value="b">Option B</RadioGroup.Item>
      </RadioGroup.Root>,
    )
    const radios = screen.getAllByRole('radio')
    fireEvent.click(radios[1])
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('radio inputs are focusable', () => {
    render(
      <RadioGroup.Root>
        <RadioGroup.Item value="a">A</RadioGroup.Item>
      </RadioGroup.Root>,
    )
    const radio = screen.getByRole('radio')
    radio.focus()
    expect(document.activeElement).toBe(radio)
  })

  // -- ARIA states --

  it('has radiogroup role on container', () => {
    render(
      <RadioGroup.Root>
        <RadioGroup.Item value="a">A</RadioGroup.Item>
      </RadioGroup.Root>,
    )
    expect(screen.getByRole('radiogroup')).toBeTruthy()
  })

  it('accepts aria-label on root', () => {
    render(
      <RadioGroup.Root aria-label="Choose option">
        <RadioGroup.Item value="a">A</RadioGroup.Item>
      </RadioGroup.Root>,
    )
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Choose option')
  })

  it('has radio role on items', () => {
    render(
      <RadioGroup.Root>
        <RadioGroup.Item value="a">A</RadioGroup.Item>
        <RadioGroup.Item value="b">B</RadioGroup.Item>
      </RadioGroup.Root>,
    )
    expect(screen.getAllByRole('radio')).toHaveLength(2)
  })

  it('has checked state on selected item via defaultValue', () => {
    render(
      <RadioGroup.Root defaultValue="a">
        <RadioGroup.Item value="a">A</RadioGroup.Item>
        <RadioGroup.Item value="b">B</RadioGroup.Item>
      </RadioGroup.Root>,
    )
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toBeChecked()
    expect(radios[1]).not.toBeChecked()
  })

  it('updates checked state on controlled value change', () => {
    const { rerender } = render(
      <RadioGroup.Root value="a">
        <RadioGroup.Item value="a">A</RadioGroup.Item>
        <RadioGroup.Item value="b">B</RadioGroup.Item>
      </RadioGroup.Root>,
    )
    expect(screen.getAllByRole('radio')[0]).toBeChecked()
    rerender(
      <RadioGroup.Root value="b">
        <RadioGroup.Item value="a">A</RadioGroup.Item>
        <RadioGroup.Item value="b">B</RadioGroup.Item>
      </RadioGroup.Root>,
    )
    expect(screen.getAllByRole('radio')[1]).toBeChecked()
  })

  // -- Disabled state --

  it('renders disabled state', () => {
    render(
      <RadioGroup.Root disabled>
        <RadioGroup.Item value="a">A</RadioGroup.Item>
      </RadioGroup.Root>,
    )
    expect(screen.getByRole('radio')).toBeDisabled()
  })

  it('sets disabled attribute on radio inputs when group is disabled', () => {
    render(
      <RadioGroup.Root disabled>
        <RadioGroup.Item value="a">A</RadioGroup.Item>
        <RadioGroup.Item value="b">B</RadioGroup.Item>
      </RadioGroup.Root>,
    )
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toBeDisabled()
    expect(radios[1]).toBeDisabled()
  })

  it('does not call onValueChange when disabled', () => {
    const onChange = jest.fn()
    render(
      <RadioGroup.Root disabled onValueChange={onChange}>
        <RadioGroup.Item value="a">A</RadioGroup.Item>
        <RadioGroup.Item value="b">B</RadioGroup.Item>
      </RadioGroup.Root>,
    )
    fireEvent.click(screen.getAllByRole('radio')[1])
    expect(onChange).not.toHaveBeenCalled()
  })

  // -- Auto name --

  it('generates name automatically for grouping', () => {
    render(
      <RadioGroup.Root>
        <RadioGroup.Item value="a">A</RadioGroup.Item>
        <RadioGroup.Item value="b">B</RadioGroup.Item>
      </RadioGroup.Root>,
    )
    const radios = screen.getAllByRole('radio')
    const name0 = radios[0].getAttribute('name')
    const name1 = radios[1].getAttribute('name')
    expect(name0).toBeTruthy()
    expect(name0).toBe(name1)
  })
})
