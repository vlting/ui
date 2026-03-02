import { render, screen } from '../../../src/__test-utils__/render'
import { Sidebar12 } from './Sidebar12'
import type { NavGroup } from './_shared'

const sampleGroups: NavGroup[] = [
  {
    label: 'Navigation',
    items: [
      { label: 'Events', onPress: jest.fn() },
      { label: 'Tasks', onPress: jest.fn() },
    ],
  },
]

describe('Sidebar12', () => {
  it('renders without crashing', () => {
    expect(() => render(<Sidebar12 groups={sampleGroups} />)).not.toThrow()
  })

  it('renders navigation items', () => {
    render(<Sidebar12 groups={sampleGroups} />)
    expect(screen.getByText('Events')).toBeDefined()
    expect(screen.getByText('Tasks')).toBeDefined()
  })

  it('renders group labels', () => {
    render(<Sidebar12 groups={sampleGroups} />)
    expect(screen.getByText('Navigation')).toBeDefined()
  })

  it('renders header when provided', () => {
    render(<Sidebar12 groups={sampleGroups} header={<span>Calendar App</span>} />)
    expect(screen.getByText('Calendar App')).toBeDefined()
  })

  it('renders footer when provided', () => {
    render(<Sidebar12 groups={sampleGroups} footer={<span>Settings</span>} />)
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('has sidebar landmark', () => {
    const { container } = render(<Sidebar12 groups={sampleGroups} />)
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })

  it('renders with calendarPosition bottom without crashing', () => {
    expect(() =>
      render(<Sidebar12 groups={sampleGroups} calendarPosition="bottom" />),
    ).not.toThrow()
  })

  it('accepts selectedDate prop', () => {
    const date = new Date(2026, 2, 15)
    expect(() =>
      render(<Sidebar12 groups={sampleGroups} selectedDate={date} />),
    ).not.toThrow()
  })

  it('accepts onDateSelect callback', () => {
    const onDateSelect = jest.fn()
    expect(() =>
      render(<Sidebar12 groups={sampleGroups} onDateSelect={onDateSelect} />),
    ).not.toThrow()
  })
})
