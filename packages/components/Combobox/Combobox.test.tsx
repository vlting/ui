import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Combobox } from './Combobox'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

describe('Combobox', () => {
  // -- Options API --

  it('renders with placeholder', () => {
    render(<Combobox.Root options={options} placeholder="Select fruit" />)
    expect(screen.getByPlaceholderText('Select fruit')).toBeTruthy()
  })

  it('has role="combobox" on input', () => {
    render(<Combobox.Root options={options} placeholder="Select" />)
    expect(screen.getByRole('combobox')).toBeTruthy()
  })

  it('renders when disabled', () => {
    render(<Combobox.Root options={options} disabled placeholder="Disabled" />)
    expect(screen.getByPlaceholderText('Disabled')).toBeTruthy()
  })

  it('shows selected value', () => {
    render(<Combobox.Root options={options} value="apple" placeholder="Select" />)
    expect(screen.getByDisplayValue('Apple')).toBeTruthy()
  })

  // -- Compound API --

  it('renders compound API without crashing', () => {
    expect(() =>
      render(
        <Combobox.Root>
          <Combobox.Input placeholder="Search..." />
          <Combobox.Content>
            <Combobox.Item value="a">Alpha</Combobox.Item>
            <Combobox.Item value="b">Beta</Combobox.Item>
          </Combobox.Content>
        </Combobox.Root>,
      ),
    ).not.toThrow()
  })

  it('opens on input focus', () => {
    render(
      <Combobox.Root>
        <Combobox.Input placeholder="Search..." />
        <Combobox.Content>
          <Combobox.Item value="a">Alpha</Combobox.Item>
        </Combobox.Content>
      </Combobox.Root>,
    )
    fireEvent.focus(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
  })

  it('has aria-haspopup=listbox', () => {
    render(
      <Combobox.Root>
        <Combobox.Input placeholder="Search..." />
      </Combobox.Root>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'listbox')
  })

  it('has aria-autocomplete=list', () => {
    render(
      <Combobox.Root>
        <Combobox.Input placeholder="Search..." />
      </Combobox.Root>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-autocomplete', 'list')
  })

  it('closes on Escape', () => {
    render(
      <Combobox.Root>
        <Combobox.Input placeholder="Search..." />
        <Combobox.Content>
          <Combobox.Item value="a">Alpha</Combobox.Item>
        </Combobox.Content>
      </Combobox.Root>,
    )
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    expect(input).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(input).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders empty state', () => {
    render(
      <Combobox.Root>
        <Combobox.Input placeholder="Search..." />
        <Combobox.Content>
          <Combobox.Empty>Nothing here</Combobox.Empty>
        </Combobox.Content>
      </Combobox.Root>,
    )
    fireEvent.focus(screen.getByRole('combobox'))
    expect(screen.getByText('Nothing here')).toBeTruthy()
  })

  it('renders group with label', () => {
    render(
      <Combobox.Root>
        <Combobox.Input placeholder="Search..." />
        <Combobox.Content>
          <Combobox.Group>
            <Combobox.Label>Fruit</Combobox.Label>
            <Combobox.Item value="a">Apple</Combobox.Item>
          </Combobox.Group>
        </Combobox.Content>
      </Combobox.Root>,
    )
    fireEvent.focus(screen.getByRole('combobox'))
    expect(screen.getByText('Fruit')).toBeTruthy()
    expect(screen.getByText('Apple')).toBeTruthy()
  })

  it('opens on ArrowDown when closed', () => {
    render(
      <Combobox.Root>
        <Combobox.Input placeholder="Search..." />
        <Combobox.Content>
          <Combobox.Item value="a">Alpha</Combobox.Item>
        </Combobox.Content>
      </Combobox.Root>,
    )
    const input = screen.getByRole('combobox')
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(input).toHaveAttribute('aria-expanded', 'true')
  })

  it('typing updates search value', () => {
    render(
      <Combobox.Root>
        <Combobox.Input placeholder="Search..." />
        <Combobox.Content>
          <Combobox.Item value="a">Alpha</Combobox.Item>
        </Combobox.Content>
      </Combobox.Root>,
    )
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(input).toHaveAttribute('aria-expanded', 'true')
    expect((input as HTMLInputElement).value).toBe('test')
  })
})
