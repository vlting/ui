import { render, screen } from '../../../src/__test-utils__/render'
import { Sidebar14 } from './Sidebar14'
import type { NavGroup } from './_shared'

const sampleGroups: NavGroup[] = [
  {
    label: 'Context',
    items: [
      { label: 'Properties', onPress: jest.fn() },
      { label: 'History', onPress: jest.fn() },
    ],
  },
]

describe('Sidebar14', () => {
  it('renders navigation items', () => {
    render(<Sidebar14 groups={sampleGroups} />)
    expect(screen.getByText('Properties')).toBeDefined()
    expect(screen.getByText('History')).toBeDefined()
  })

  it('renders group labels', () => {
    render(<Sidebar14 groups={sampleGroups} />)
    expect(screen.getByText('Context')).toBeDefined()
  })

  it('renders title when provided', () => {
    render(<Sidebar14 groups={sampleGroups} title="Details" />)
    expect(screen.getByText('Details')).toBeDefined()
  })

  it('renders header when provided', () => {
    render(<Sidebar14 groups={sampleGroups} header={<span>Panel</span>} />)
    expect(screen.getByText('Panel')).toBeDefined()
  })

  it('renders footer when provided', () => {
    render(<Sidebar14 groups={sampleGroups} footer={<span>Actions</span>} />)
    expect(screen.getByText('Actions')).toBeDefined()
  })

  it('has sidebar landmark', () => {
    const { container } = render(<Sidebar14 groups={sampleGroups} />)
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })

  it('renders trigger button by default', () => {
    render(<Sidebar14 groups={sampleGroups} />)
    const trigger = screen.getByRole('button', { name: /sidebar/i })
    expect(trigger).toBeDefined()
  })

  it('hides trigger when showTrigger is false', () => {
    render(<Sidebar14 groups={sampleGroups} showTrigger={false} />)
    expect(screen.queryByRole('button', { name: /sidebar/i })).toBeNull()
  })
})
