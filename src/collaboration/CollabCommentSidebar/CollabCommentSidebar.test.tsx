import { render, screen } from '../../__test-utils__/render'
import { CollabCommentSidebar } from './CollabCommentSidebar'

describe('CollabCommentSidebar', () => {
  it('renders without crashing', () => {
    render(<CollabCommentSidebar testID="collabcommentsidebar" />)
    expect(screen.getByTestId('collabcommentsidebar')).toBeTruthy()
  })
})
