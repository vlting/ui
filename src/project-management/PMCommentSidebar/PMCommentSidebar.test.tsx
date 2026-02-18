import { render, screen } from '../../__test-utils__/render'
import { PMCommentSidebar } from './PMCommentSidebar'

describe('PMCommentSidebar', () => {
  it('renders without crashing', () => {
    render(<PMCommentSidebar testID="pmcommentsidebar" />)
    expect(screen.getByTestId('pmcommentsidebar')).toBeTruthy()
  })
})
