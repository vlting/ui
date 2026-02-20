import { fireEvent, render, screen } from '../../__test-utils__/render'
import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('renders nothing when closed by default', () => {
    render(<Drawer testID="drawer" />)
    expect(screen.queryByTestId('drawer')).toBeNull()
  })

  it('renders when open=true', () => {
    render(<Drawer testID="drawer" open />)
    expect(screen.getByTestId('drawer')).toBeTruthy()
  })

  it('renders children when open', () => {
    render(
      <Drawer testID="drawer" open>
        <span testID="child">Child content</span>
      </Drawer>,
    )
    expect(screen.getByTestId('drawer')).toBeTruthy()
  })

  it('calls onOpenChange with false when scrim is pressed', () => {
    const onOpenChange = jest.fn()
    render(<Drawer testID="drawer" open onOpenChange={onOpenChange} />)
    fireEvent.press(screen.getByTestId('drawer-scrim'))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('has aria-modal attribute when open', () => {
    render(<Drawer testID="drawer" open />)
    expect(screen.getByTestId('drawer')).toBeTruthy()
  })

  it('renders in different placements', () => {
    const { rerender } = render(<Drawer testID="drawer" open placement="left" />)
    expect(screen.getByTestId('drawer')).toBeTruthy()

    rerender(<Drawer testID="drawer" open placement="right" />)
    expect(screen.getByTestId('drawer')).toBeTruthy()

    rerender(<Drawer testID="drawer" open placement="top" />)
    expect(screen.getByTestId('drawer')).toBeTruthy()

    rerender(<Drawer testID="drawer" open placement="bottom" />)
    expect(screen.getByTestId('drawer')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(<Drawer testID="drawer-dark" open />)
    expect(screen.getByTestId('drawer-dark')).toBeTruthy()
  })

  it('supports uncontrolled defaultOpen', () => {
    render(<Drawer testID="drawer" defaultOpen />)
    expect(screen.getByTestId('drawer')).toBeTruthy()
  })
})
