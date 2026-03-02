import { render, screen } from '../../../src/__test-utils__/render'
import type { NavGroup } from '../sidebar/_shared'
import { AppShellResponsive } from './AppShellResponsive'

const sampleGroups: NavGroup[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', onPress: jest.fn() },
      { label: 'Settings', onPress: jest.fn() },
    ],
  },
]

describe('AppShellResponsive', () => {
  it('renders sidebar mode without crashing', () => {
    expect(() => render(<AppShellResponsive groups={sampleGroups} />)).not.toThrow()
  })

  it('renders navigation items in sidebar mode', () => {
    render(<AppShellResponsive groups={sampleGroups} />)
    expect(screen.getByText('Dashboard')).toBeDefined()
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('renders group labels in sidebar mode', () => {
    render(<AppShellResponsive groups={sampleGroups} />)
    expect(screen.getByText('Main')).toBeDefined()
  })

  it('renders main content in sidebar mode', () => {
    render(
      <AppShellResponsive groups={sampleGroups}>
        <span>Page Content</span>
      </AppShellResponsive>,
    )
    expect(screen.getByText('Page Content')).toBeDefined()
  })

  it('has sidebar landmark in sidebar mode', () => {
    const { container } = render(<AppShellResponsive groups={sampleGroups} />)
    const sidebar = container.querySelector('[role="complementary"]')
    expect(sidebar).not.toBeNull()
  })

  it('renders sidebar header and footer', () => {
    render(
      <AppShellResponsive
        groups={sampleGroups}
        header={<span>Nav Header</span>}
        footer={<span>Nav Footer</span>}
      />,
    )
    expect(screen.getByText('Nav Header')).toBeDefined()
    expect(screen.getByText('Nav Footer')).toBeDefined()
  })

  it('renders sheet mode without crashing', () => {
    expect(() =>
      render(<AppShellResponsive groups={sampleGroups} mode="sheet" />),
    ).not.toThrow()
  })

  it('renders main content in sheet mode', () => {
    render(
      <AppShellResponsive groups={sampleGroups} mode="sheet">
        <span>Sheet Page</span>
      </AppShellResponsive>,
    )
    expect(screen.getByText('Sheet Page')).toBeDefined()
  })

  it('accepts onSheetOpenChange callback', () => {
    const onChange = jest.fn()
    expect(() =>
      render(
        <AppShellResponsive
          groups={sampleGroups}
          mode="sheet"
          onSheetOpenChange={onChange}
        />,
      ),
    ).not.toThrow()
  })
})
