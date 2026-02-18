import { render, screen } from '../../__test-utils__/render'
import { CommentItem } from './CommentItem'

describe('CommentItem', () => {
  it('renders without crashing', () => {
    render(<CommentItem testID="commentitem" />)
    expect(screen.getByTestId('commentitem')).toBeTruthy()
  })
})
