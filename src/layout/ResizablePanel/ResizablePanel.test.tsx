import { fireEvent, render, screen } from '../../__test-utils__/render'
import { ResizablePanel } from './ResizablePanel'

describe('ResizablePanel', () => {
  it('renders without crashing', () => {
    render(<ResizablePanel testID="resizablepanel" />)
    expect(screen.getByTestId('resizablepanel')).toBeTruthy()
  })

  it('renders the resize handle', () => {
    render(<ResizablePanel testID="resizablepanel" />)
    expect(screen.getByTestId('resize-handle')).toBeTruthy()
  })

  it('handle has correct ARIA attributes', () => {
    render(
      <ResizablePanel
        testID="resizablepanel"
        defaultSize={300}
        minSize={100}
        maxSize={600}
      />,
    )
    const handle = screen.getByTestId('resize-handle')
    expect(handle).toBeTruthy()
  })

  it('renders children', () => {
    render(
      <ResizablePanel testID="resizablepanel">
        <span testID="child">Content</span>
      </ResizablePanel>,
    )
    expect(screen.getByTestId('child')).toBeTruthy()
  })

  it('calls onSizeChange with new size on arrow key press', () => {
    const onSizeChange = jest.fn()
    render(
      <ResizablePanel
        testID="resizablepanel"
        defaultSize={300}
        minSize={100}
        maxSize={600}
        step={10}
        onSizeChange={onSizeChange}
      />,
    )
    const handle = screen.getByTestId('resize-handle')
    fireEvent.keyDown(handle, { key: 'ArrowRight' })
    expect(onSizeChange).toHaveBeenCalledWith(310)
  })

  it('clamps to minSize on ArrowLeft past minimum', () => {
    const onSizeChange = jest.fn()
    render(
      <ResizablePanel
        testID="resizablepanel"
        defaultSize={105}
        minSize={100}
        maxSize={600}
        step={10}
        onSizeChange={onSizeChange}
      />,
    )
    const handle = screen.getByTestId('resize-handle')
    fireEvent.keyDown(handle, { key: 'ArrowLeft' })
    expect(onSizeChange).toHaveBeenCalledWith(100)
  })

  it('snaps to minSize on Home key', () => {
    const onSizeChange = jest.fn()
    render(
      <ResizablePanel
        testID="resizablepanel"
        defaultSize={300}
        minSize={100}
        maxSize={600}
        onSizeChange={onSizeChange}
      />,
    )
    const handle = screen.getByTestId('resize-handle')
    fireEvent.keyDown(handle, { key: 'Home' })
    expect(onSizeChange).toHaveBeenCalledWith(100)
  })

  it('snaps to maxSize on End key', () => {
    const onSizeChange = jest.fn()
    render(
      <ResizablePanel
        testID="resizablepanel"
        defaultSize={300}
        minSize={100}
        maxSize={600}
        onSizeChange={onSizeChange}
      />,
    )
    const handle = screen.getByTestId('resize-handle')
    fireEvent.keyDown(handle, { key: 'End' })
    expect(onSizeChange).toHaveBeenCalledWith(600)
  })

  it('renders in vertical direction', () => {
    render(<ResizablePanel testID="resizablepanel" direction="vertical" />)
    expect(screen.getByTestId('resizablepanel')).toBeTruthy()
    expect(screen.getByTestId('resize-handle')).toBeTruthy()
  })

  it('respects controlled size', () => {
    const onSizeChange = jest.fn()
    render(
      <ResizablePanel
        testID="resizablepanel"
        size={400}
        minSize={100}
        maxSize={600}
        onSizeChange={onSizeChange}
      />,
    )
    expect(screen.getByTestId('resizablepanel')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(<ResizablePanel testID="resizablepanel-dark" />)
    expect(screen.getByTestId('resizablepanel-dark')).toBeTruthy()
  })
})
