import { render, screen } from '../../../src/__test-utils__/render'
import type { NavGroup } from '../sidebar/_shared'
import { Dashboard01 } from './Dashboard01'

const sampleGroups: NavGroup[] = [
  {
    label: 'Main',
    items: [
      { label: 'Overview', onPress: jest.fn() },
      { label: 'Analytics', onPress: jest.fn() },
    ],
  },
]

describe('Dashboard01', () => {
  it('renders without crashing', () => {
    expect(() => render(<Dashboard01 sidebarGroups={sampleGroups} />)).not.toThrow()
  })

  it('renders default title', () => {
    render(<Dashboard01 sidebarGroups={sampleGroups} />)
    expect(screen.getByText('Dashboard')).toBeDefined()
  })

  it('renders custom title', () => {
    render(<Dashboard01 sidebarGroups={sampleGroups} title="Sales" />)
    expect(screen.getByText('Sales')).toBeDefined()
  })

  it('renders description', () => {
    render(<Dashboard01 sidebarGroups={sampleGroups} description="Overview of metrics" />)
    expect(screen.getByText('Overview of metrics')).toBeDefined()
  })

  it('renders sidebar navigation items', () => {
    render(<Dashboard01 sidebarGroups={sampleGroups} />)
    expect(screen.getByText('Overview')).toBeDefined()
    expect(screen.getByText('Analytics')).toBeDefined()
  })

  it('renders sidebar group labels', () => {
    render(<Dashboard01 sidebarGroups={sampleGroups} />)
    expect(screen.getByText('Main')).toBeDefined()
  })

  it('renders sidebar header when provided', () => {
    render(
      <Dashboard01 sidebarGroups={sampleGroups} sidebarHeader={<span>App Logo</span>} />,
    )
    expect(screen.getByText('App Logo')).toBeDefined()
  })

  it('renders sidebar footer when provided', () => {
    render(<Dashboard01 sidebarGroups={sampleGroups} sidebarFooter={<span>v1.0</span>} />)
    expect(screen.getByText('v1.0')).toBeDefined()
  })

  it('renders children when provided', () => {
    render(
      <Dashboard01 sidebarGroups={sampleGroups}>
        <span>Extra Content</span>
      </Dashboard01>,
    )
    expect(screen.getByText('Extra Content')).toBeDefined()
  })

  it('has sidebar landmark', () => {
    const { container } = render(<Dashboard01 sidebarGroups={sampleGroups} />)
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })
})
