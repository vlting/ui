import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Select } from './Select'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

describe('Select', () => {
  // -- Renders correctly --

  it('renders without crashing', () => {
    expect(() =>
      render(
        <Select placeholder="Choose">
          <Select.Item value="a">Option A</Select.Item>
          <Select.Item value="b">Option B</Select.Item>
        </Select>,
      ),
    ).not.toThrow()
  })

  it('renders with defaultValue', () => {
    render(
      <Select defaultValue="a">
        <Select.Item value="a">Option A</Select.Item>
        <Select.Item value="b">Option B</Select.Item>
      </Select>,
    )
    expect(screen.getByText('Option A')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <Select size={size}>
          <Select.Item value="a">A</Select.Item>
        </Select>,
      )
      unmount()
    }
  })

  it('renders with groups and labels', () => {
    expect(() =>
      render(
        <Select placeholder="Pick fruit">
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            <Select.Item value="apple">Apple</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Vegetables</Select.Label>
            <Select.Item value="carrot">Carrot</Select.Item>
          </Select.Group>
        </Select>,
      ),
    ).not.toThrow()
  })

  // -- Keyboard navigation --

  it('opens dropdown on Enter key', () => {
    render(
      <Select placeholder="Choose">
        <Select.Item value="a">Option A</Select.Item>
      </Select>,
    )
    const trigger = screen.getByRole('combobox')
    fireEvent.keyDown(trigger, { key: 'Enter' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('opens dropdown on ArrowDown key', () => {
    render(
      <Select placeholder="Choose">
        <Select.Item value="a">Option A</Select.Item>
      </Select>,
    )
    const trigger = screen.getByRole('combobox')
    fireEvent.keyDown(trigger, { key: 'ArrowDown' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes dropdown on Escape key', () => {
    render(
      <Select placeholder="Choose">
        <Select.Item value="a">Option A</Select.Item>
      </Select>,
    )
    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger) // open
    fireEvent.keyDown(trigger, { key: 'Escape' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('selects item on click', () => {
    const onChange = jest.fn()
    render(
      <Select placeholder="Choose" onValueChange={onChange}>
        <Select.Item value="a">Option A</Select.Item>
        <Select.Item value="b">Option B</Select.Item>
      </Select>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByText('Option B'))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  // -- ARIA states --

  it('has combobox role on trigger', () => {
    render(
      <Select placeholder="Choose">
        <Select.Item value="a">A</Select.Item>
      </Select>,
    )
    expect(screen.getByRole('combobox')).toBeTruthy()
  })

  it('has aria-expanded=false when closed', () => {
    render(
      <Select placeholder="Choose">
        <Select.Item value="a">A</Select.Item>
      </Select>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  })

  it('has aria-haspopup=listbox', () => {
    render(
      <Select placeholder="Choose">
        <Select.Item value="a">A</Select.Item>
      </Select>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'listbox')
  })

  it('items have role=option with aria-selected', () => {
    render(
      <Select defaultValue="a" placeholder="Choose">
        <Select.Item value="a">Option A</Select.Item>
        <Select.Item value="b">Option B</Select.Item>
      </Select>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveAttribute('aria-selected', 'true')
    expect(options[1]).toHaveAttribute('aria-selected', 'false')
  })

  it('renders listbox when open', () => {
    render(
      <Select placeholder="Choose">
        <Select.Item value="a">A</Select.Item>
      </Select>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeTruthy()
  })

  // -- Focus management --

  it('trigger is focusable', () => {
    render(
      <Select placeholder="Choose">
        <Select.Item value="a">A</Select.Item>
      </Select>,
    )
    const trigger = screen.getByRole('combobox')
    trigger.focus()
    expect(document.activeElement).toBe(trigger)
  })

  it('selects item with Enter key after arrow navigation', () => {
    const onChange = jest.fn()
    render(
      <Select placeholder="Choose" onValueChange={onChange}>
        <Select.Item value="a">Option A</Select.Item>
        <Select.Item value="b">Option B</Select.Item>
      </Select>,
    )
    const trigger = screen.getByRole('combobox')
    fireEvent.keyDown(trigger, { key: 'ArrowDown' }) // opens, highlight 0
    fireEvent.keyDown(trigger, { key: 'ArrowDown' }) // highlight 1
    fireEvent.keyDown(trigger, { key: 'Enter' }) // select
    expect(onChange).toHaveBeenCalledWith('b')
  })

  // -- Disabled state --

  it('renders disabled state with disabled styles', () => {
    render(
      <Select disabled>
        <Select.Item value="a">A</Select.Item>
      </Select>,
    )
    // stl styled() maps disabled as variant — verify it doesn't open
    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('does not open when disabled', () => {
    render(
      <Select disabled placeholder="Choose">
        <Select.Item value="a">A</Select.Item>
      </Select>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  })
})
