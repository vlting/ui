import { render, screen, fireEvent } from '../../../src/__test-utils__/render'
import { Textarea } from './Textarea'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

describe('Textarea', () => {
  // -- Renders correctly --

  it('renders without errors', () => {
    render(<Textarea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy()
  })

  it('renders label when provided', () => {
    render(<Textarea label="Description" placeholder="desc" />)
    expect(screen.getByText('Description')).toBeTruthy()
  })

  it('renders helper text', () => {
    render(<Textarea helperText="Max 500 chars" placeholder="text" />)
    expect(screen.getByText('Max 500 chars')).toBeTruthy()
  })

  it('renders error message in error state', () => {
    render(<Textarea error errorMessage="Too long" placeholder="text" />)
    expect(screen.getByText('Too long')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Textarea size={size} placeholder="text" />)
      expect(screen.getByPlaceholderText('text')).toBeTruthy()
      unmount()
    }
  })

  // -- Keyboard navigation --

  it('accepts text input', () => {
    const onChangeText = jest.fn()
    render(<Textarea placeholder="type here" onChangeText={onChangeText} />)
    const textarea = screen.getByPlaceholderText('type here')
    fireEvent.change(textarea, { target: { value: 'hello world' } })
    expect(onChangeText).toHaveBeenCalledWith('hello world')
  })

  it('is focusable', () => {
    render(<Textarea placeholder="focus me" />)
    const textarea = screen.getByPlaceholderText('focus me')
    textarea.focus()
    expect(document.activeElement).toBe(textarea)
  })

  // -- ARIA states --

  it('has aria-invalid when error prop is true', () => {
    render(<Textarea error placeholder="error" />)
    expect(screen.getByPlaceholderText('error')).toHaveAttribute('aria-invalid', 'true')
  })

  it('links error message via aria-describedby', () => {
    render(<Textarea error errorMessage="Too long" placeholder="err" />)
    const textarea = screen.getByPlaceholderText('err')
    const describedBy = textarea.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    const helper = document.getElementById(describedBy!)
    expect(helper?.textContent).toBe('Too long')
  })

  it('has aria-label when no label prop', () => {
    render(<Textarea placeholder="notes" />)
    expect(screen.getByPlaceholderText('notes')).toHaveAttribute('aria-label', 'notes')
  })

  it('associates label via htmlFor', () => {
    render(<Textarea label="Bio" placeholder="bio" />)
    const textarea = screen.getByPlaceholderText('bio')
    const label = screen.getByText('Bio').closest('label')
    expect(label).toBeTruthy()
    expect(label?.getAttribute('for')).toBe(textarea.id)
  })

  // -- Disabled state --

  it('is disabled when disabled prop is true', () => {
    render(<Textarea disabled placeholder="disabled" />)
    expect(screen.getByPlaceholderText('disabled')).toBeDisabled()
  })
})
