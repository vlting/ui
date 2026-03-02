import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Sidebar09 } from './Sidebar09'
import type { NavGroup } from './_shared'

const icon = <span data-testid="nav-icon">*</span>

const sampleGroups: NavGroup[] = [
  {
    label: 'Main',
    items: [
      {
        label: 'Dashboard',
        icon,
        onPress: jest.fn(),
        children: [
          { label: 'Overview', onPress: jest.fn() },
          { label: 'Analytics', onPress: jest.fn() },
        ],
      },
      { label: 'Settings', icon, onPress: jest.fn() },
    ],
  },
]

describe('Sidebar09', () => {
  it('renders primary rail with items', () => {
    render(<Sidebar09 groups={sampleGroups} />)
    expect(screen.getAllByRole('menuitem').length).toBeGreaterThanOrEqual(2)
  })

  it('does not show secondary panel initially', () => {
    render(<Sidebar09 groups={sampleGroups} />)
    expect(screen.queryByText('Overview')).toBeNull()
  })

  it('shows secondary panel when item with children is clicked', () => {
    render(<Sidebar09 groups={sampleGroups} />)
    const menuItems = screen.getAllByRole('menuitem')
    fireEvent.click(menuItems[0])
    expect(screen.getByText('Overview')).toBeDefined()
    expect(screen.getByText('Analytics')).toBeDefined()
  })

  it('shows selected item label as secondary panel header', () => {
    render(<Sidebar09 groups={sampleGroups} />)
    const menuItems = screen.getAllByRole('menuitem')
    fireEvent.click(menuItems[0])
    expect(screen.getByText('Dashboard')).toBeDefined()
  })

  it('hides secondary panel when same item is clicked again', () => {
    render(<Sidebar09 groups={sampleGroups} />)
    const menuItems = screen.getAllByRole('menuitem')
    fireEvent.click(menuItems[0])
    expect(screen.getByText('Overview')).toBeDefined()
    // Click same item again to toggle off
    const updatedMenuItems = screen.getAllByRole('menuitem')
    fireEvent.click(updatedMenuItems[0])
    expect(screen.queryByText('Overview')).toBeNull()
  })

  it('renders header when provided', () => {
    render(<Sidebar09 groups={sampleGroups} header={<span>Logo</span>} />)
    expect(screen.getByText('Logo')).toBeDefined()
  })

  it('renders footer when provided', () => {
    render(<Sidebar09 groups={sampleGroups} footer={<span>User</span>} />)
    expect(screen.getByText('User')).toBeDefined()
  })

  it('has sidebar landmark', () => {
    const { container } = render(<Sidebar09 groups={sampleGroups} />)
    const sidebars = container.querySelectorAll('[role="complementary"]')
    expect(sidebars.length).toBeGreaterThanOrEqual(1)
  })

  it('renders children in main content area', () => {
    render(
      <Sidebar09 groups={sampleGroups}>
        <span>Main Content</span>
      </Sidebar09>,
    )
    expect(screen.getByText('Main Content')).toBeDefined()
  })
})
