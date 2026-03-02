import { render } from '@testing-library/react'
import { Icon } from '../../primitives/Icon'
import { createIcon } from '../createIcon'

// Create test icons using the actual createIcon factory (uses react-native-svg mock)
const TestIconLine = createIcon(
  'M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z',
  'TestIconLine'
)
const TestIconFill = createIcon(
  'M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20Z',
  'TestIconFill'
)

describe('Icon primitive integration with Remix icons', () => {
  it('renders a Remix icon via the Icon primitive', () => {
    const { container } = render(<Icon icon={TestIconLine} />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('forwards size to Remix icon', () => {
    const { container } = render(<Icon icon={TestIconFill} size={32} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
    expect(svg?.getAttribute('width')).toBe('32')
    expect(svg?.getAttribute('height')).toBe('32')
  })

  it('icons are decorative by default (aria-hidden on wrapper)', () => {
    const { container } = render(<Icon icon={TestIconLine} />)
    const wrapper = container.querySelector('span')
    expect(wrapper).toBeTruthy()
    expect(wrapper?.getAttribute('aria-hidden')).toBe('true')
  })
})

describe('Naming and coexistence', () => {
  it('Remix icons and other icons can coexist without conflicts', () => {
    // Remix icons use the Ri prefix, which avoids collisions
    // with Lucide icons (ArrowRight vs RiArrowRightLine)
    const LucideLikeIcon = createIcon('M5 12h14', 'ArrowRight')

    const { container } = render(
      <>
        <Icon icon={TestIconLine} />
        <Icon icon={LucideLikeIcon} />
      </>
    )
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBe(2)
  })
})

describe('createIcon accessibility', () => {
  it('renders with no implicit accessible name', () => {
    const { container } = render(<TestIconLine />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
    // Raw icon should NOT have role, aria-label, or aria-labelledby
    expect(svg?.getAttribute('role')).toBeNull()
    expect(svg?.getAttribute('aria-label')).toBeNull()
    expect(svg?.getAttribute('aria-labelledby')).toBeNull()
  })

  it('renders SVG with default size and color', () => {
    const { container } = render(<TestIconLine />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('24')
    expect(svg?.getAttribute('height')).toBe('24')
    expect(svg?.getAttribute('fill')).toBe('currentColor')
  })
})
