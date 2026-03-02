import { render, screen } from '../../../src/__test-utils__/render'
import { Sidebar13 } from './Sidebar13'
import type { NavGroup } from './_shared'

const sampleGroups: NavGroup[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', onPress: jest.fn() },
      { label: 'Settings', onPress: jest.fn() },
    ],
  },
]

describe('Sidebar13', () => {
  it('renders without crashing', () => {
    expect(() => render(<Sidebar13 groups={sampleGroups} />)).not.toThrow()
  })

  it('renders trigger button with default label', () => {
    render(<Sidebar13 groups={sampleGroups} />)
    expect(screen.getByText('Menu')).toBeDefined()
  })

  it('renders custom trigger label', () => {
    render(<Sidebar13 groups={sampleGroups} triggerLabel="Open Nav" />)
    expect(screen.getByText('Open Nav')).toBeDefined()
  })

  it('renders with controlled open state without crashing', () => {
    expect(() => render(<Sidebar13 groups={sampleGroups} dialogOpen />)).not.toThrow()
  })

  it('renders header without crashing', () => {
    expect(() =>
      render(<Sidebar13 groups={sampleGroups} header={<span>App Logo</span>} />),
    ).not.toThrow()
  })

  it('renders footer without crashing', () => {
    expect(() =>
      render(<Sidebar13 groups={sampleGroups} footer={<span>v1.0</span>} />),
    ).not.toThrow()
  })

  it('renders with custom dialog title without crashing', () => {
    expect(() =>
      render(<Sidebar13 groups={sampleGroups} dialogTitle="Site Menu" />),
    ).not.toThrow()
  })

  it('accepts onDialogOpenChange callback', () => {
    const onChange = jest.fn()
    expect(() =>
      render(<Sidebar13 groups={sampleGroups} onDialogOpenChange={onChange} />),
    ).not.toThrow()
  })
})
