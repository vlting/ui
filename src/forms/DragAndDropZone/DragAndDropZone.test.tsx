import { render, screen } from '../../__test-utils__/render'
import { DragAndDropZone } from './DragAndDropZone'

describe('DragAndDropZone', () => {
  it('renders without crashing', () => {
    render(<DragAndDropZone testID="draganddropzone" />)
    expect(screen.getByTestId('draganddropzone')).toBeTruthy()
  })
})
