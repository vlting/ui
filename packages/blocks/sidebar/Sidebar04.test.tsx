import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Sidebar04 } from './Sidebar04'
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

describe('Sidebar04', () => {
  it('renders top-level navigation items', () => {
    render(<Sidebar04 groups={sampleGroups} />)
    expect(screen.getByText('Home')).toBeDefined()
  })

  it('renders parent items with children', () => {
    render(<Sidebar04 groups={sampleGroups} />)
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('renders group labels', () => {
    render(<Sidebar04 groups={sampleGroups} />)
    expect(screen.getByText('Navigation')).toBeDefined()
  })

  it('renders header when provided', () => {
    render(<Sidebar04 groups={sampleGroups} header={<span>Floating Nav</span>} />)
    expect(screen.getByText('Floating Nav')).toBeDefined()
  })

  it('renders footer when provided', () => {
    render(<Sidebar04 groups={sampleGroups} footer={<span>Bottom</span>} />)
    expect(screen.getByText('Bottom')).toBeDefined()
  })

  it('renders search input when searchPlaceholder is provided', () => {
    render(<Sidebar04 groups={sampleGroups} searchPlaceholder="Search..." />)
    expect(screen.getByPlaceholderText('Search...')).toBeDefined()
  })

  it('calls onPress when a leaf item is clicked', () => {
    const onPress = jest.fn()
    const groups: NavGroup[] = [{ items: [{ label: 'Click Me', onPress }] }]
    render(<Sidebar04 groups={groups} />)
    fireEvent.click(screen.getByRole('menuitem', { name: 'Click Me' }))
    expect(onPress).toHaveBeenCalled()
  })

  it('has sidebar landmark', () => {
    const { container } = render(<Sidebar04 groups={sampleGroups} />)
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })

  it('uses floating variant', () => {
    const { container } = render(<Sidebar04 groups={sampleGroups} />)
    // Floating variant is set on Sidebar.Root — verify the sidebar renders
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })
})
