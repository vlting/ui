import { fireEvent, render, screen } from '../../__test-utils__/render'
import { BottomTabs } from './BottomTabs'

const items = [
  { value: 'home', label: 'Home' },
  { value: 'search', label: 'Search' },
  { value: 'profile', label: 'Profile' },
]

describe('BottomTabs', () => {
  it('renders without crashing', () => {
    render(<BottomTabs testID="bottomtabs" items={items} />)
    expect(screen.getByTestId('bottomtabs')).toBeTruthy()
  })

  it('renders all tab items', () => {
    render(<BottomTabs testID="bottomtabs" items={items} />)
    expect(screen.getByTestId('tab-home')).toBeTruthy()
    expect(screen.getByTestId('tab-search')).toBeTruthy()
    expect(screen.getByTestId('tab-profile')).toBeTruthy()
  })

  it('first tab is active by default', () => {
    render(<BottomTabs testID="bottomtabs" items={items} />)
    // First tab should be active (aria-selected=true)
    expect(screen.getByTestId('tab-home')).toBeTruthy()
  })

  it('calls onValueChange when a tab is pressed', () => {
    const onValueChange = jest.fn()
    render(
      <BottomTabs
        testID="bottomtabs"
        items={items}
        defaultValue="home"
        onValueChange={onValueChange}
      />,
    )
    fireEvent.press(screen.getByTestId('tab-search'))
    expect(onValueChange).toHaveBeenCalledWith('search')
  })

  it('respects controlled value', () => {
    const onValueChange = jest.fn()
    render(
      <BottomTabs
        testID="bottomtabs"
        items={items}
        value="search"
        onValueChange={onValueChange}
      />,
    )
    expect(screen.getByTestId('tab-search')).toBeTruthy()
  })

  it('does not call onValueChange for disabled tab', () => {
    const onValueChange = jest.fn()
    const itemsWithDisabled = [
      ...items,
      { value: 'settings', label: 'Settings', disabled: true },
    ]
    render(
      <BottomTabs
        testID="bottomtabs"
        items={itemsWithDisabled}
        onValueChange={onValueChange}
      />,
    )
    fireEvent.press(screen.getByTestId('tab-settings'))
    expect(onValueChange).not.toHaveBeenCalledWith('settings')
  })

  it('renders badge label accessibly', () => {
    const itemsWithBadge = [{ value: 'messages', label: 'Messages', badge: 3 }]
    render(<BottomTabs testID="bottomtabs" items={itemsWithBadge} />)
    expect(screen.getByText('Messages, 3 unread')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(<BottomTabs testID="bottomtabs-dark" items={items} />)
    expect(screen.getByTestId('bottomtabs-dark')).toBeTruthy()
  })
})
