import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Sidebar02 } from './Sidebar02'
import type { NavGroup } from './_shared'

const sampleGroups: NavGroup[] = [
  {
    label: 'Navigation',
    items: [
      { label: 'Home', onPress: jest.fn() },
      { label: 'About', onPress: jest.fn() },
    ],
  },
  {
    label: 'Settings',
    defaultOpen: false,
    items: [
      { label: 'Profile', onPress: jest.fn() },
      { label: 'Security', onPress: jest.fn() },
    ],
  },
]

describe('Sidebar02', () => {
  it('renders navigation items from expanded groups', () => {
    render(<Sidebar02 groups={sampleGroups} />)
    expect(screen.getByText('Home')).toBeDefined()
    expect(screen.getByText('About')).toBeDefined()
  })

  it('renders group labels as collapsible triggers', () => {
    render(<Sidebar02 groups={sampleGroups} />)
    expect(screen.getByText('Navigation')).toBeDefined()
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('renders header when provided', () => {
    render(<Sidebar02 groups={sampleGroups} header={<span>App Name</span>} />)
    expect(screen.getByText('App Name')).toBeDefined()
  })

  it('renders footer when provided', () => {
    render(<Sidebar02 groups={sampleGroups} footer={<span>Footer</span>} />)
    expect(screen.getByText('Footer')).toBeDefined()
  })

  it('calls onPress when item is clicked', () => {
    const onPress = jest.fn()
    const groups: NavGroup[] = [{ items: [{ label: 'Click Me', onPress }] }]
    render(<Sidebar02 groups={groups} />)
    fireEvent.click(screen.getByRole('menuitem', { name: 'Click Me' }))
    expect(onPress).toHaveBeenCalled()
  })

  it('has sidebar landmark', () => {
    const { container } = render(<Sidebar02 groups={sampleGroups} />)
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })

  it('renders groups without labels as non-collapsible', () => {
    const groups: NavGroup[] = [
      { items: [{ label: 'Always Visible', onPress: jest.fn() }] },
    ]
    render(<Sidebar02 groups={groups} />)
    expect(screen.getByText('Always Visible')).toBeDefined()
  })
})
