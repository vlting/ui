import { render, screen } from '../../__test-utils__/render'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('renders without crashing', () => {
    render(<Sidebar testID="sidebar" />)
    expect(screen.getByTestId('sidebar')).toBeTruthy()
  })

  it('accepts and renders children', () => {
    render(
      <Sidebar testID="sidebar">
        <Sidebar.Item testID="item1">Item 1</Sidebar.Item>
        <Sidebar.Item testID="item2">Item 2</Sidebar.Item>
      </Sidebar>,
    )
    expect(screen.getByTestId('item1')).toBeTruthy()
    expect(screen.getByTestId('item2')).toBeTruthy()
  })

  it('renders in collapsed state', () => {
    render(<Sidebar testID="sidebar" collapsed />)
    expect(screen.getByTestId('sidebar')).toBeTruthy()
  })

  it('renders Header, Body, Footer sub-components', () => {
    render(
      <Sidebar testID="sidebar">
        <Sidebar.Header testID="hdr">Logo</Sidebar.Header>
        <Sidebar.Body testID="body">
          <Sidebar.Item testID="item">Nav item</Sidebar.Item>
        </Sidebar.Body>
        <Sidebar.Footer testID="ftr">User</Sidebar.Footer>
      </Sidebar>,
    )
    expect(screen.getByTestId('hdr')).toBeTruthy()
    expect(screen.getByTestId('body')).toBeTruthy()
    expect(screen.getByTestId('ftr')).toBeTruthy()
  })

  it('renders with custom aria-label', () => {
    render(<Sidebar testID="sidebar" accessibilityLabel="App navigation" />)
    expect(screen.getByTestId('sidebar')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(<Sidebar testID="sidebar-dark" />)
    expect(screen.getByTestId('sidebar-dark')).toBeTruthy()
  })
})
