import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { Sidebar08 } from './Sidebar08'
import type { NavGroup } from './_shared'

const sampleGroups: NavGroup[] = [
  {
    label: 'Getting Started',
    items: [
      { label: 'Introduction', onPress: jest.fn() },
      { label: 'Installation', onPress: jest.fn() },
    ],
  },
  {
    label: 'Components',
    items: [
      { label: 'Button', onPress: jest.fn() },
      { label: 'Input', onPress: jest.fn() },
    ],
  },
]

describe('Sidebar08', () => {
  it('renders group labels as navigation items', () => {
    render(<Sidebar08 groups={sampleGroups} />)
    expect(screen.getByRole('menuitem', { name: 'Getting Started' })).toBeDefined()
    expect(screen.getByRole('menuitem', { name: 'Components' })).toBeDefined()
  })

  it('renders items from the first group by default', () => {
    render(<Sidebar08 groups={sampleGroups} />)
    expect(screen.getByText('Introduction')).toBeDefined()
    expect(screen.getByText('Installation')).toBeDefined()
  })

  it('switches to selected group items when group is clicked', () => {
    render(<Sidebar08 groups={sampleGroups} />)
    fireEvent.click(screen.getByRole('menuitem', { name: 'Components' }))
    expect(screen.getByText('Button')).toBeDefined()
    expect(screen.getByText('Input')).toBeDefined()
  })

  it('calls onGroupSelect when a group is clicked', () => {
    const onGroupSelect = jest.fn()
    render(<Sidebar08 groups={sampleGroups} onGroupSelect={onGroupSelect} />)
    fireEvent.click(screen.getByRole('menuitem', { name: 'Components' }))
    expect(onGroupSelect).toHaveBeenCalledWith(1)
  })

  it('renders header when provided', () => {
    render(<Sidebar08 groups={sampleGroups} header={<span>Docs</span>} />)
    expect(screen.getByText('Docs')).toBeDefined()
  })

  it('renders footer when provided', () => {
    render(<Sidebar08 groups={sampleGroups} footer={<span>Version 1.0</span>} />)
    expect(screen.getByText('Version 1.0')).toBeDefined()
  })

  it('renders secondary content when provided', () => {
    render(<Sidebar08 groups={sampleGroups} secondaryContent={<span>Extra Info</span>} />)
    expect(screen.getByText('Extra Info')).toBeDefined()
  })

  it('has sidebar landmark', () => {
    const { container } = render(<Sidebar08 groups={sampleGroups} />)
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })

  it('has menu landmarks', () => {
    const { container } = render(<Sidebar08 groups={sampleGroups} />)
    const menus = container.querySelectorAll('[role="menu"]')
    expect(menus.length).toBeGreaterThanOrEqual(2)
  })
})
