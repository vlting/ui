import { createRef } from 'react'
import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Textarea } from './Textarea'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

describe('Textarea', () => {
  it('renders with placeholder', () => {
    render(<Textarea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Textarea size={size} placeholder={size} />)
      expect(screen.getByPlaceholderText(size)).toBeTruthy()
      unmount()
    }
  })

  it('calls onChangeText with text value', () => {
    const onChangeText = jest.fn()
    render(<Textarea placeholder="type" onChangeText={onChangeText} />)
    fireEvent.change(screen.getByPlaceholderText('type'), { target: { value: 'hello world' } })
    expect(onChangeText).toHaveBeenCalledWith('hello world')
  })

  it('calls native onChange alongside onChangeText', () => {
    const onChange = jest.fn()
    const onChangeText = jest.fn()
    render(<Textarea placeholder="type" onChange={onChange} onChangeText={onChangeText} />)
    fireEvent.change(screen.getByPlaceholderText('type'), { target: { value: 'x' } })
    expect(onChange).toHaveBeenCalled()
    expect(onChangeText).toHaveBeenCalledWith('x')
  })

  it('sets aria-invalid when error prop is true', () => {
    render(<Textarea error placeholder="err" />)
    expect(screen.getByPlaceholderText('err')).toHaveAttribute('aria-invalid', 'true')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Textarea disabled placeholder="dis" />)
    expect(screen.getByPlaceholderText('dis')).toBeDisabled()
  })

  it('forwards rows prop', () => {
    render(<Textarea rows={5} placeholder="rows" />)
    expect(screen.getByPlaceholderText('rows')).toHaveAttribute('rows', '5')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} placeholder="ref" />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('is focusable', () => {
    render(<Textarea placeholder="focus" />)
    const textarea = screen.getByPlaceholderText('focus')
    textarea.focus()
    expect(document.activeElement).toBe(textarea)
  })
})
