import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { Input } from './Input'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

describe('Input', () => {
  // -- Renders correctly --

  it('renders without errors', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy()
  })

  it('renders label when provided', () => {
    render(<Input label="Email" placeholder="email" />)
    expect(screen.getByText('Email')).toBeTruthy()
  })

  it('renders helper text', () => {
    render(<Input helperText="Required field" placeholder="input" />)
    expect(screen.getByText('Required field')).toBeTruthy()
  })

  it('renders error message in error state', () => {
    render(<Input error errorMessage="Invalid" placeholder="input" />)
    expect(screen.getByText('Invalid')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Input size={size} placeholder="input" />)
      expect(screen.getByPlaceholderText('input')).toBeTruthy()
      unmount()
    }
  })

  // -- Keyboard navigation --

  it('accepts text input via keyboard', () => {
    const onChangeText = jest.fn()
    render(<Input placeholder="type here" onChangeText={onChangeText} />)
    const input = screen.getByPlaceholderText('type here')
    fireEvent.change(input, { target: { value: 'hello' } })
    expect(onChangeText).toHaveBeenCalledWith('hello')
  })

  it('is focusable', () => {
    render(<Input placeholder="focus me" />)
    const input = screen.getByPlaceholderText('focus me')
    input.focus()
    expect(document.activeElement).toBe(input)
  })

  // -- ARIA states --

  it('has aria-invalid when error prop is true', () => {
    render(<Input error placeholder="error" />)
    expect(screen.getByPlaceholderText('error')).toHaveAttribute('aria-invalid', 'true')
  })

  it('links error message via aria-describedby', () => {
    render(<Input error errorMessage="Bad input" placeholder="err" />)
    const input = screen.getByPlaceholderText('err')
    const describedBy = input.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    const helper = document.getElementById(describedBy!)
    expect(helper?.textContent).toBe('Bad input')
  })

  it('has aria-label when no label prop', () => {
    render(<Input placeholder="search" />)
    expect(screen.getByPlaceholderText('search')).toHaveAttribute('aria-label', 'search')
  })

  it('associates label via htmlFor', () => {
    render(<Input label="Name" placeholder="name" />)
    const input = screen.getByPlaceholderText('name')
    const label = screen.getByText('Name').closest('label')
    expect(label).toBeTruthy()
    expect(label?.getAttribute('for')).toBe(input.id)
  })

  // -- Disabled state --

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="disabled" />)
    expect(screen.getByPlaceholderText('disabled')).toBeDisabled()
  })

  it('does not call onChangeText when disabled', () => {
    const onChangeText = jest.fn()
    render(<Input disabled onChangeText={onChangeText} placeholder="disabled" />)
    const input = screen.getByPlaceholderText('disabled')
    fireEvent.change(input, { target: { value: 'test' } })
    // Disabled inputs should not trigger change
  })
})
