import { render, screen } from '../../../src/__test-utils__/render'
import { Sidebar16 } from './Sidebar16'
import type { NavGroup } from './_shared'

const sampleGroups: NavGroup[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', onPress: jest.fn() },
      { label: 'Settings', onPress: jest.fn() },
    ],
  },
]

describe('Sidebar16', () => {
  it('renders navigation items', () => {
    render(<Sidebar16 groups={sampleGroups} />)
    expect(screen.getByText('Dashboard')).toBeDefined()
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('renders group labels', () => {
    render(<Sidebar16 groups={sampleGroups} />)
    expect(screen.getByText('Main')).toBeDefined()
  })

  it('renders site title', () => {
    render(<Sidebar16 groups={sampleGroups} siteTitle="My App" />)
    expect(screen.getByText('My App')).toBeDefined()
  })

  it('renders site logo', () => {
    render(<Sidebar16 groups={sampleGroups} siteLogo={<span>Logo</span>} />)
    expect(screen.getByText('Logo')).toBeDefined()
  })

  it('renders header actions', () => {
    render(<Sidebar16 groups={sampleGroups} headerActions={<span>Settings Btn</span>} />)
    expect(screen.getByText('Settings Btn')).toBeDefined()
  })

  it('renders main content area', () => {
    render(
      <Sidebar16 groups={sampleGroups}>
        <span>Page Content</span>
      </Sidebar16>,
    )
    expect(screen.getByText('Page Content')).toBeDefined()
  })

  it('has a semantic header element', () => {
    const { container } = render(<Sidebar16 groups={sampleGroups} siteTitle="App" />)
    const headerEl = container.querySelector('header')
    expect(headerEl).not.toBeNull()
  })

  it('has sidebar landmark', () => {
    const { container } = render(<Sidebar16 groups={sampleGroups} />)
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })

  it('renders sidebar header and footer', () => {
    render(
      <Sidebar16
        groups={sampleGroups}
        header={<span>Sidebar Header</span>}
        footer={<span>Sidebar Footer</span>}
      />,
    )
    expect(screen.getByText('Sidebar Header')).toBeDefined()
    expect(screen.getByText('Sidebar Footer')).toBeDefined()
  })
})
