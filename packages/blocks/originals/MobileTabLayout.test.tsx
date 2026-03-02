import { render, screen } from '../../../src/__test-utils__/render'
import { MobileTabLayout } from './MobileTabLayout'
import type { TabItem } from './MobileTabLayout'

// Tamagui Tabs uses ResizeObserver internally
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown
})

const sampleTabs: TabItem[] = [
  { value: 'home', label: 'Home', content: <span>Home Content</span> },
  { value: 'search', label: 'Search', content: <span>Search Content</span> },
  { value: 'profile', label: 'Profile', content: <span>Profile Content</span> },
]

describe('MobileTabLayout', () => {
  it('renders without crashing', () => {
    expect(() => render(<MobileTabLayout tabs={sampleTabs} />)).not.toThrow()
  })

  it('renders tab labels', () => {
    render(<MobileTabLayout tabs={sampleTabs} />)
    expect(screen.getByText('Home')).toBeDefined()
    expect(screen.getByText('Search')).toBeDefined()
    expect(screen.getByText('Profile')).toBeDefined()
  })

  it('renders with default tab', () => {
    expect(() =>
      render(<MobileTabLayout tabs={sampleTabs} defaultTab="search" />),
    ).not.toThrow()
  })

  it('renders with controlled tab', () => {
    const onChange = jest.fn()
    expect(() =>
      render(
        <MobileTabLayout tabs={sampleTabs} activeTab="profile" onTabChange={onChange} />,
      ),
    ).not.toThrow()
  })

  it('renders children when provided', () => {
    render(
      <MobileTabLayout tabs={sampleTabs}>
        <span>Extra</span>
      </MobileTabLayout>,
    )
    expect(screen.getByText('Extra')).toBeDefined()
  })

  it('renders tab icons when provided', () => {
    const tabsWithIcons: TabItem[] = [
      { value: 'home', label: 'Home', icon: <span>🏠</span>, content: <span>Home</span> },
    ]
    expect(() => render(<MobileTabLayout tabs={tabsWithIcons} />)).not.toThrow()
  })

  it('accepts onTabChange callback', () => {
    const onChange = jest.fn()
    expect(() =>
      render(<MobileTabLayout tabs={sampleTabs} onTabChange={onChange} />),
    ).not.toThrow()
  })
})
