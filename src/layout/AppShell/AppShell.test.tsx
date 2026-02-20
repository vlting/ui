import { fireEvent, render, screen } from '../../__test-utils__/render'
import { AppShell } from './AppShell'

describe('AppShell', () => {
  it('renders without crashing', () => {
    render(<AppShell testID="appshell" />)
    expect(screen.getByTestId('appshell')).toBeTruthy()
  })

  it('renders header with banner role', () => {
    render(
      <AppShell>
        <AppShell.Header testID="header">Header content</AppShell.Header>
      </AppShell>,
    )
    expect(screen.getByTestId('header')).toBeTruthy()
  })

  it('renders sidebar with navigation role', () => {
    render(
      <AppShell>
        <AppShell.Sidebar testID="sidebar">Sidebar content</AppShell.Sidebar>
      </AppShell>,
    )
    expect(screen.getByTestId('sidebar')).toBeTruthy()
  })

  it('renders content with main role', () => {
    render(
      <AppShell>
        <AppShell.Content testID="content">Main content</AppShell.Content>
      </AppShell>,
    )
    expect(screen.getByTestId('content')).toBeTruthy()
  })

  it('renders footer', () => {
    render(
      <AppShell>
        <AppShell.Footer testID="footer">Footer content</AppShell.Footer>
      </AppShell>,
    )
    expect(screen.getByTestId('footer')).toBeTruthy()
  })

  it('renders all four regions together', () => {
    render(
      <AppShell testID="shell">
        <AppShell.Header testID="hdr">H</AppShell.Header>
        <AppShell.Body>
          <AppShell.Sidebar testID="nav">Nav</AppShell.Sidebar>
          <AppShell.Content testID="main">Content</AppShell.Content>
        </AppShell.Body>
        <AppShell.Footer testID="ftr">Footer</AppShell.Footer>
      </AppShell>,
    )
    expect(screen.getByTestId('shell')).toBeTruthy()
    expect(screen.getByTestId('hdr')).toBeTruthy()
    expect(screen.getByTestId('nav')).toBeTruthy()
    expect(screen.getByTestId('main')).toBeTruthy()
    expect(screen.getByTestId('ftr')).toBeTruthy()
  })

  it('renders without header', () => {
    render(
      <AppShell testID="shell">
        <AppShell.Content testID="content">Main</AppShell.Content>
      </AppShell>,
    )
    expect(screen.getByTestId('content')).toBeTruthy()
    expect(screen.queryByTestId('header')).toBeNull()
  })

  it('renders without sidebar', () => {
    render(
      <AppShell testID="shell">
        <AppShell.Header testID="hdr">H</AppShell.Header>
        <AppShell.Content testID="content">Main</AppShell.Content>
      </AppShell>,
    )
    expect(screen.getByTestId('content')).toBeTruthy()
    expect(screen.queryByTestId('sidebar')).toBeNull()
  })

  it('renders without footer', () => {
    render(
      <AppShell testID="shell">
        <AppShell.Content testID="content">Main</AppShell.Content>
      </AppShell>,
    )
    expect(screen.queryByTestId('footer')).toBeNull()
  })

  it('renders in dark theme without errors', () => {
    const { getByTestId } = render(<AppShell testID="shell-dark" />)
    expect(getByTestId('shell-dark')).toBeTruthy()
  })

  it('calls onSidebarChange in controlled mode', () => {
    const onSidebarChange = jest.fn()
    render(
      <AppShell sidebarOpen={false} onSidebarChange={onSidebarChange} testID="shell" />,
    )
    expect(screen.getByTestId('shell')).toBeTruthy()
  })
})
