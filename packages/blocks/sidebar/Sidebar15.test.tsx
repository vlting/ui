import { render, screen } from '../../../src/__test-utils__/render'
import { Sidebar15 } from './Sidebar15'
import type { NavGroup } from './_shared'

const leftGroups: NavGroup[] = [
  {
    label: 'Navigation',
    items: [
      { label: 'Dashboard', onPress: jest.fn() },
      { label: 'Projects', onPress: jest.fn() },
    ],
  },
]

const rightGroups: NavGroup[] = [
  {
    label: 'Details',
    items: [
      { label: 'Properties', onPress: jest.fn() },
      { label: 'History', onPress: jest.fn() },
    ],
  },
]

describe('Sidebar15', () => {
  it('renders left sidebar items', () => {
    render(<Sidebar15 leftGroups={leftGroups} rightGroups={rightGroups} />)
    expect(screen.getByText('Dashboard')).toBeDefined()
    expect(screen.getByText('Projects')).toBeDefined()
  })

  it('renders right sidebar items', () => {
    render(<Sidebar15 leftGroups={leftGroups} rightGroups={rightGroups} />)
    expect(screen.getByText('Properties')).toBeDefined()
    expect(screen.getByText('History')).toBeDefined()
  })

  it('renders group labels', () => {
    render(<Sidebar15 leftGroups={leftGroups} rightGroups={rightGroups} />)
    expect(screen.getByText('Navigation')).toBeDefined()
    expect(screen.getByText('Details')).toBeDefined()
  })

  it('renders main content area', () => {
    render(
      <Sidebar15 leftGroups={leftGroups} rightGroups={rightGroups}>
        <span>Main Content</span>
      </Sidebar15>,
    )
    expect(screen.getByText('Main Content')).toBeDefined()
  })

  it('renders left header when provided', () => {
    render(
      <Sidebar15
        leftGroups={leftGroups}
        rightGroups={rightGroups}
        leftHeader={<span>Left Header</span>}
      />,
    )
    expect(screen.getByText('Left Header')).toBeDefined()
  })

  it('renders right header when provided', () => {
    render(
      <Sidebar15
        leftGroups={leftGroups}
        rightGroups={rightGroups}
        rightHeader={<span>Right Header</span>}
      />,
    )
    expect(screen.getByText('Right Header')).toBeDefined()
  })

  it('has two sidebar landmarks', () => {
    const { container } = render(
      <Sidebar15 leftGroups={leftGroups} rightGroups={rightGroups} />,
    )
    const sidebars = container.querySelectorAll('[role="complementary"]')
    expect(sidebars.length).toBe(2)
  })

  it('renders left and right footers', () => {
    render(
      <Sidebar15
        leftGroups={leftGroups}
        rightGroups={rightGroups}
        leftFooter={<span>Left Footer</span>}
        rightFooter={<span>Right Footer</span>}
      />,
    )
    expect(screen.getByText('Left Footer')).toBeDefined()
    expect(screen.getByText('Right Footer')).toBeDefined()
  })
})
