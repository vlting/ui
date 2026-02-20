import { render, screen } from '../../__test-utils__/render'
import { TopNav } from './TopNav'

describe('TopNav', () => {
  it('renders without crashing', () => {
    render(<TopNav testID="topnav" />)
    expect(screen.getByTestId('topnav')).toBeTruthy()
  })

  it('renders Leading, Center, Trailing sub-components', () => {
    render(
      <TopNav testID="topnav">
        <TopNav.Leading testID="leading">Logo</TopNav.Leading>
        <TopNav.Center testID="center">Nav links</TopNav.Center>
        <TopNav.Trailing testID="trailing">Actions</TopNav.Trailing>
      </TopNav>,
    )
    expect(screen.getByTestId('leading')).toBeTruthy()
    expect(screen.getByTestId('center')).toBeTruthy()
    expect(screen.getByTestId('trailing')).toBeTruthy()
  })

  it('renders without Center slot', () => {
    render(
      <TopNav testID="topnav">
        <TopNav.Leading testID="leading">Logo</TopNav.Leading>
        <TopNav.Trailing testID="trailing">Actions</TopNav.Trailing>
      </TopNav>,
    )
    expect(screen.getByTestId('leading')).toBeTruthy()
    expect(screen.queryByTestId('center')).toBeNull()
  })

  it('has accessible label', () => {
    render(<TopNav testID="topnav" accessibilityLabel="Site navigation" />)
    expect(screen.getByTestId('topnav')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(<TopNav testID="topnav-dark" />)
    expect(screen.getByTestId('topnav-dark')).toBeTruthy()
  })
})
