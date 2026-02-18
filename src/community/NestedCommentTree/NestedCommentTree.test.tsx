import { render, screen } from '../../__test-utils__/render'
import { NestedCommentTree } from './NestedCommentTree'

describe('NestedCommentTree', () => {
  it('renders without crashing', () => {
    render(<NestedCommentTree testID="nestedcommenttree" />)
    expect(screen.getByTestId('nestedcommenttree')).toBeTruthy()
  })
})
