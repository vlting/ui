import { render, screen } from '../../__test-utils__/render'
import { CommentThread } from './CommentThread'

describe('CommentThread', () => {
  it('renders without crashing', () => {
    render(<CommentThread testID="commentthread" />)
    expect(screen.getByTestId('commentthread')).toBeTruthy()
  })
})
