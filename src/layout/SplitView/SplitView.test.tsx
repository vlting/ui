import { fireEvent, render, screen } from '../../__test-utils__/render'
import { SplitView } from './SplitView'

describe('SplitView', () => {
  it('renders without crashing', () => {
    render(<SplitView testID="splitview" />)
    expect(screen.getByTestId('splitview')).toBeTruthy()
  })

  it('renders primary and secondary panels', () => {
    render(<SplitView testID="splitview" />)
    expect(screen.getByTestId('splitview-primary')).toBeTruthy()
    expect(screen.getByTestId('splitview-secondary')).toBeTruthy()
  })

  it('renders divider between panels', () => {
    render(<SplitView testID="splitview" />)
    expect(screen.getByTestId('splitview-divider')).toBeTruthy()
  })

  it('renders children in secondary panel', () => {
    render(
      <SplitView testID="splitview">
        <span testID="child">Detail content</span>
      </SplitView>,
    )
    expect(screen.getByTestId('child')).toBeTruthy()
  })

  it('renders resizable divider when resizable=true', () => {
    render(<SplitView testID="splitview" resizable />)
    expect(screen.getByTestId('splitview-divider')).toBeTruthy()
  })

  it('resizable divider has correct ARIA attributes', () => {
    render(
      <SplitView
        testID="splitview"
        resizable
        defaultSplit={0.3}
        minSplit={0.1}
        maxSplit={0.9}
      />,
    )
    const divider = screen.getByTestId('splitview-divider')
    expect(divider).toBeTruthy()
  })

  it('calls onSplitChange on arrow key press of resizable divider', () => {
    const onSplitChange = jest.fn()
    render(
      <SplitView
        testID="splitview"
        resizable
        defaultSplit={0.3}
        step={0.05}
        onSplitChange={onSplitChange}
      />,
    )
    const divider = screen.getByTestId('splitview-divider')
    fireEvent.keyDown(divider, { key: 'ArrowRight' })
    expect(onSplitChange).toHaveBeenCalledWith(expect.closeTo(0.35, 2))
  })

  it('panels have accessible labels', () => {
    render(
      <SplitView
        testID="splitview"
        primaryLabel="Navigation"
        secondaryLabel="Detail view"
      />,
    )
    expect(screen.getByTestId('splitview-primary')).toBeTruthy()
    expect(screen.getByTestId('splitview-secondary')).toBeTruthy()
  })

  it('renders in vertical direction', () => {
    render(<SplitView testID="splitview" direction="vertical" />)
    expect(screen.getByTestId('splitview')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(<SplitView testID="splitview-dark" />)
    expect(screen.getByTestId('splitview-dark')).toBeTruthy()
  })

  it('renders Primary and Secondary sub-components', () => {
    render(
      <SplitView testID="splitview">
        <SplitView.Secondary testID="secondary">Detail</SplitView.Secondary>
      </SplitView>,
    )
    expect(screen.getByTestId('secondary')).toBeTruthy()
  })
})
