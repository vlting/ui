import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Sidebar05 } from './Sidebar05'
import type { NavGroup } from './_shared'

const sampleGroups: NavGroup[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', onPress: jest.fn() },
      {
        label: 'Products',
        children: [
          { label: 'All Products', onPress: jest.fn() },
          { label: 'Add Product', onPress: jest.fn() },
        ],
      },
      { label: 'Orders', onPress: jest.fn() },
    ],
  },
]

describe('Sidebar05', () => {
  it('renders top-level navigation items', () => {
    render(<Sidebar05 groups={sampleGroups} />)
    expect(screen.getByText('Dashboard')).toBeDefined()
    expect(screen.getByText('Orders')).toBeDefined()
  })

  it('renders parent items with children as collapsible triggers', () => {
    render(<Sidebar05 groups={sampleGroups} />)
    expect(screen.getByText('Products')).toBeDefined()
  })

  it('renders group labels', () => {
    render(<Sidebar05 groups={sampleGroups} />)
    expect(screen.getByText('Main')).toBeDefined()
  })

  it('renders header when provided', () => {
    render(<Sidebar05 groups={sampleGroups} header={<span>My App</span>} />)
    expect(screen.getByText('My App')).toBeDefined()
  })

  it('renders footer when provided', () => {
    render(<Sidebar05 groups={sampleGroups} footer={<span>Footer</span>} />)
    expect(screen.getByText('Footer')).toBeDefined()
  })

  it('calls onPress when a leaf item is clicked', () => {
    const onPress = jest.fn()
    const groups: NavGroup[] = [{ items: [{ label: 'Click Me', onPress }] }]
    render(<Sidebar05 groups={groups} />)
    fireEvent.click(screen.getByRole('menuitem', { name: 'Click Me' }))
    expect(onPress).toHaveBeenCalled()
  })

  it('has sidebar landmark', () => {
    const { container } = render(<Sidebar05 groups={sampleGroups} />)
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })

  it('renders active parent items expanded by default', () => {
    const groups: NavGroup[] = [
      {
        items: [
          {
            label: 'Parent',
            active: true,
            children: [{ label: 'Child A', onPress: jest.fn() }],
          },
        ],
      },
    ]
    render(<Sidebar05 groups={groups} />)
    expect(screen.getByText('Child A')).toBeDefined()
  })
})
