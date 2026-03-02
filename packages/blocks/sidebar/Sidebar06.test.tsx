import { render, screen } from '../../../src/__test-utils__/render'
import { Sidebar06 } from './Sidebar06'
import type { NavGroup } from './_shared'

const sampleGroups: NavGroup[] = [
  {
    label: 'Navigation',
    items: [
      { label: 'Home', onPress: jest.fn() },
      {
        label: 'Settings',
        children: [
          { label: 'Account', onPress: jest.fn() },
          { label: 'Privacy', onPress: jest.fn() },
        ],
      },
    ],
  },
]

describe('Sidebar06', () => {
  it('renders top-level navigation items', () => {
    render(<Sidebar06 groups={sampleGroups} />)
    expect(screen.getByText('Home')).toBeDefined()
  })

  it('renders parent items with children as dropdown triggers', () => {
    render(<Sidebar06 groups={sampleGroups} />)
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('renders group labels', () => {
    render(<Sidebar06 groups={sampleGroups} />)
    expect(screen.getByText('Navigation')).toBeDefined()
  })

  it('renders header when provided', () => {
    render(<Sidebar06 groups={sampleGroups} header={<span>App Menu</span>} />)
    expect(screen.getByText('App Menu')).toBeDefined()
  })

  it('renders footer when provided', () => {
    render(<Sidebar06 groups={sampleGroups} footer={<span>Bottom</span>} />)
    expect(screen.getByText('Bottom')).toBeDefined()
  })

  it('has sidebar landmark', () => {
    const { container } = render(<Sidebar06 groups={sampleGroups} />)
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })

  it('dropdown trigger has aria-haspopup', () => {
    render(<Sidebar06 groups={sampleGroups} />)
    const trigger = screen.getByRole('button', { name: /Settings/ })
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
  })
})
