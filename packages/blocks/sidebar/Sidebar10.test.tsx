import { render, screen } from '../../../src/__test-utils__/render'
import { Sidebar10 } from './Sidebar10'
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
  {
    label: 'Support',
    items: [{ label: 'Help', icon, onPress: jest.fn() }],
  },
]

describe('Sidebar10', () => {
  it('renders without crashing', () => {
    expect(() => render(<Sidebar10 groups={sampleGroups} />)).not.toThrow()
  })

  it('renders trigger button with default label', () => {
    render(<Sidebar10 groups={sampleGroups} />)
    expect(screen.getByText('Navigation')).toBeDefined()
  })

  it('renders custom trigger label', () => {
    render(<Sidebar10 groups={sampleGroups} triggerLabel="Menu" />)
    expect(screen.getByText('Menu')).toBeDefined()
  })

  it('renders with defaultOpen without crashing', () => {
    expect(() => render(<Sidebar10 groups={sampleGroups} popoverOpen />)).not.toThrow()
  })

  it('renders with right placement without crashing', () => {
    expect(() =>
      render(<Sidebar10 groups={sampleGroups} placement="right" />),
    ).not.toThrow()
  })

  it('renders header without crashing', () => {
    expect(() =>
      render(<Sidebar10 groups={sampleGroups} header={<span>Header</span>} />),
    ).not.toThrow()
  })

  it('renders footer without crashing', () => {
    expect(() =>
      render(<Sidebar10 groups={sampleGroups} footer={<span>Footer</span>} />),
    ).not.toThrow()
  })

  it('calls onPopoverOpenChange when provided', () => {
    const onOpenChange = jest.fn()
    expect(() =>
      render(<Sidebar10 groups={sampleGroups} onPopoverOpenChange={onOpenChange} />),
    ).not.toThrow()
  })
})
