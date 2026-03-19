import { createRef } from 'react'
import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Input } from './Input'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Input size={size} placeholder={size} />)
      expect(screen.getByPlaceholderText(size)).toBeTruthy()
      unmount()
    }
  })

  it('calls onChangeText with text value', () => {
    const onChangeText = jest.fn()
    render(<Input placeholder="type" onChangeText={onChangeText} />)
    fireEvent.change(screen.getByPlaceholderText('type'), { target: { value: 'hello' } })
    expect(onChangeText).toHaveBeenCalledWith('hello')
  })

  it('calls native onChange alongside onChangeText', () => {
    const onChange = jest.fn()
    const onChangeText = jest.fn()
    render(<Input placeholder="type" onChange={onChange} onChangeText={onChangeText} />)
    fireEvent.change(screen.getByPlaceholderText('type'), { target: { value: 'x' } })
    expect(onChange).toHaveBeenCalled()
    expect(onChangeText).toHaveBeenCalledWith('x')
  })

  it('sets aria-invalid when error prop is true', () => {
    render(<Input error placeholder="err" />)
    expect(screen.getByPlaceholderText('err')).toHaveAttribute('aria-invalid', 'true')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="dis" />)
    expect(screen.getByPlaceholderText('dis')).toBeDisabled()
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input ref={ref} placeholder="ref" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('spreads native input attributes', () => {
    render(<Input type="email" name="email" placeholder="email" />)
    const input = screen.getByPlaceholderText('email')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('name', 'email')
  })

  it('is focusable', () => {
    render(<Input placeholder="focus" />)
    const input = screen.getByPlaceholderText('focus')
    input.focus()
    expect(document.activeElement).toBe(input)
  })
})
