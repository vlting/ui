import { render, screen } from '../../__test-utils__/render'
import { TaskDetailPanel } from './TaskDetailPanel'

describe('TaskDetailPanel', () => {
  it('renders without crashing', () => {
    render(<TaskDetailPanel testID="taskdetailpanel" />)
    expect(screen.getByTestId('taskdetailpanel')).toBeTruthy()
  })
})
