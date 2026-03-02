import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Sidebar01 } from './Sidebar01'
import type { NavGroup } from './_shared'

const sampleGroups: NavGroup[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', onPress: jest.fn() },
      { label: 'Projects', onPress: jest.fn(), active: true },
      { label: 'Settings', onPress: jest.fn(), disabled: true },
    ],
  },
  {
    label: 'Support',
    items: [
      { label: 'Help', onPress: jest.fn() },
      { label: 'Contact', onPress: jest.fn() },
    ],
  },
]

describe('Sidebar01', () => {
  it('renders navigation items from groups', () => {
    render(<Sidebar01 groups={sampleGroups} />)
    expect(screen.getByText('Dashboard')).toBeDefined()
    expect(screen.getByText('Projects')).toBeDefined()
    expect(screen.getByText('Settings')).toBeDefined()
    expect(screen.getByText('Help')).toBeDefined()
    expect(screen.getByText('Contact')).toBeDefined()
  })

  it('renders group labels', () => {
    render(<Sidebar01 groups={sampleGroups} />)
    expect(screen.getByText('Main')).toBeDefined()
    expect(screen.getByText('Support')).toBeDefined()
  })

  it('renders title in header', () => {
    render(<Sidebar01 groups={sampleGroups} title="My App" />)
    expect(screen.getByText('My App')).toBeDefined()
  })

  it('renders custom header', () => {
    render(<Sidebar01 groups={sampleGroups} header={<span>Custom Header</span>} />)
    expect(screen.getByText('Custom Header')).toBeDefined()
  })

  it('renders footer', () => {
    render(<Sidebar01 groups={sampleGroups} footer={<span>Footer Content</span>} />)
    expect(screen.getByText('Footer Content')).toBeDefined()
  })

  it('calls onPress when item is clicked', () => {
    const onPress = jest.fn()
    const groups: NavGroup[] = [{ items: [{ label: 'Click Me', onPress }] }]
    render(<Sidebar01 groups={groups} />)
    fireEvent.click(screen.getByRole('menuitem', { name: 'Click Me' }))
    expect(onPress).toHaveBeenCalled()
  })

  it('renders active item with aria-current', () => {
    render(<Sidebar01 groups={sampleGroups} />)
    const activeItem = screen.getByRole('menuitem', { name: 'Projects' })
    expect(activeItem.getAttribute('aria-current')).toBe('page')
  })

  it('renders disabled item with aria-disabled', () => {
    render(<Sidebar01 groups={sampleGroups} />)
    const disabledItem = screen.getByRole('menuitem', { name: 'Settings' })
    expect(disabledItem.getAttribute('aria-disabled')).toBe('true')
  })

  it('has sidebar landmark', () => {
    const { container } = render(<Sidebar01 groups={sampleGroups} />)
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })

  it('has menu landmark', () => {
    const { container } = render(<Sidebar01 groups={sampleGroups} />)
    const menus = container.querySelectorAll('[role="menu"]')
    expect(menus.length).toBe(2) // one per group
  })
})
