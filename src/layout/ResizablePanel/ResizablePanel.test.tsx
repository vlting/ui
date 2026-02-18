import { render, screen } from '../../__test-utils__/render'
import { ResizablePanel } from './ResizablePanel'

describe('ResizablePanel', () => {
  it('renders without crashing', () => {
    render(<ResizablePanel testID="resizablepanel" />)
    expect(screen.getByTestId('resizablepanel')).toBeTruthy()
  })
})
