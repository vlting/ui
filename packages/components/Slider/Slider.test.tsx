import { render } from '../../../src/__test-utils__/render'
import { Slider } from './Slider'

// Tamagui Slider uses IntersectionObserver + ResizeObserver internally
beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown

  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown
})

describe('Slider', () => {
  it('renders without crashing', () => {
    expect(() => render(<Slider />)).not.toThrow()
  })

  it('renders with explicit value', () => {
    expect(() => render(<Slider value={50} />)).not.toThrow()
  })

  it('renders each size variant', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Slider size={size} />)
      unmount()
    }
  })

  it('renders disabled state', () => {
    expect(() => render(<Slider disabled />)).not.toThrow()
  })
})
