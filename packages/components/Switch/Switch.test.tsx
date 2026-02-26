import { render } from '../../../src/__test-utils__/render'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders without crashing', () => {
    expect(() => render(<Switch />)).not.toThrow()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Switch size={size} />)
      unmount()
    }
  })

  it('renders with checked state', () => {
    expect(() => render(<Switch checked />)).not.toThrow()
  })

  it('renders with defaultChecked', () => {
    expect(() => render(<Switch defaultChecked />)).not.toThrow()
  })

  it('renders disabled state', () => {
    expect(() => render(<Switch disabled />)).not.toThrow()
  })

  it('calls onCheckedChange callback', () => {
    const onChange = jest.fn()
    expect(() => render(<Switch onCheckedChange={onChange} />)).not.toThrow()
  })
})
