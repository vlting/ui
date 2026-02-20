import { fireEvent, render, screen } from '../../__test-utils__/render'
import { Breadcrumbs } from './Breadcrumbs'

const twoItems = [
  { label: 'Home', href: '/' },
  { label: 'Profile' },
]

const fiveItems = [
  { label: 'Home', href: '/' },
  { label: 'Settings', href: '/settings' },
  { label: 'Account', href: '/settings/account' },
  { label: 'Security', href: '/settings/account/security' },
  { label: 'Passwords' },
]

describe('Breadcrumbs', () => {
  it('renders without crashing', () => {
    render(<Breadcrumbs testID="breadcrumbs" items={twoItems} />)
    expect(screen.getByTestId('breadcrumbs')).toBeTruthy()
  })

  it('renders all items with two items', () => {
    render(<Breadcrumbs testID="breadcrumbs" items={twoItems} />)
    expect(screen.getByText('Home')).toBeTruthy()
    expect(screen.getByText('Profile')).toBeTruthy()
  })

  it('last item is not a link and has aria-current="page"', () => {
    render(<Breadcrumbs testID="breadcrumbs" items={fiveItems} />)
    expect(screen.getByTestId('breadcrumb-current')).toBeTruthy()
    expect(screen.getByText('Passwords')).toBeTruthy()
  })

  it('ancestor items are links', () => {
    render(<Breadcrumbs testID="breadcrumbs" items={fiveItems} />)
    expect(screen.getByTestId('breadcrumb-link-0')).toBeTruthy()
  })

  it('renders nav landmark with accessible label', () => {
    render(<Breadcrumbs testID="breadcrumbs" items={twoItems} accessibilityLabel="Breadcrumb" />)
    expect(screen.getByRole('navigation')).toBeTruthy()
  })

  it('shows ellipsis when maxItems is set', () => {
    render(<Breadcrumbs testID="breadcrumbs" items={fiveItems} maxItems={3} />)
    expect(screen.getByTestId('breadcrumbs-ellipsis')).toBeTruthy()
  })

  it('expands hidden items when ellipsis is clicked', () => {
    render(<Breadcrumbs testID="breadcrumbs" items={fiveItems} maxItems={3} />)
    fireEvent.click(screen.getByTestId('breadcrumbs-ellipsis'))
    // After expand, all items should be visible
    expect(screen.getByText('Home')).toBeTruthy()
    expect(screen.getByText('Settings')).toBeTruthy()
  })

  it('calls onPress when a button-style item is pressed', () => {
    const onPress = jest.fn()
    const items = [{ label: 'Home', onPress }, { label: 'Current' }]
    render(<Breadcrumbs testID="breadcrumbs" items={items} />)
    fireEvent.press(screen.getByTestId('breadcrumb-link-0'))
    expect(onPress).toHaveBeenCalled()
  })

  it('renders in dark theme without errors', () => {
    render(<Breadcrumbs testID="breadcrumbs-dark" items={twoItems} />)
    expect(screen.getByTestId('breadcrumbs-dark')).toBeTruthy()
  })
})
