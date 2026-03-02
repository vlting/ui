import { render, screen } from '../../../src/__test-utils__/render'
import { Sidebar07 } from './Sidebar07'
import type { NavGroup } from './_shared'

const icon = <span data-testid="nav-icon">*</span>

const sampleGroups: NavGroup[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', icon, onPress: jest.fn() },
      { label: 'Settings', icon, onPress: jest.fn() },
    ],
  },
]

describe('Sidebar07', () => {
  it('renders navigation items with icons', () => {
    render(<Sidebar07 groups={sampleGroups} />)
    expect(screen.getByText('Dashboard')).toBeDefined()
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('renders group labels', () => {
    render(<Sidebar07 groups={sampleGroups} />)
    expect(screen.getByText('Main')).toBeDefined()
  })

  it('renders header when provided', () => {
    render(<Sidebar07 groups={sampleGroups} header={<span>Logo</span>} />)
    expect(screen.getByText('Logo')).toBeDefined()
  })

  it('renders footer when provided', () => {
    render(<Sidebar07 groups={sampleGroups} footer={<span>User</span>} />)
    expect(screen.getByText('User')).toBeDefined()
  })

  it('has sidebar landmark', () => {
    const { container } = render(<Sidebar07 groups={sampleGroups} />)
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })

  it('skips items without icons', () => {
    const groups: NavGroup[] = [
      {
        items: [
          { label: 'With Icon', icon, onPress: jest.fn() },
          { label: 'No Icon', onPress: jest.fn() },
        ],
      },
    ]
    render(<Sidebar07 groups={groups} />)
    expect(screen.getByText('With Icon')).toBeDefined()
    expect(screen.queryByText('No Icon')).toBeNull()
  })

  it('renders trigger button when showTrigger is true', () => {
    render(<Sidebar07 groups={sampleGroups} showTrigger />)
    const trigger = screen.getByRole('button', { name: /sidebar/i })
    expect(trigger).toBeDefined()
  })
})
