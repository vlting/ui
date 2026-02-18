import { render, screen } from '../../__test-utils__/render'
import { AssignmentAvatarStack } from './AssignmentAvatarStack'

describe('AssignmentAvatarStack', () => {
  it('renders without crashing', () => {
    render(<AssignmentAvatarStack testID="assignmentavatarstack" />)
    expect(screen.getByTestId('assignmentavatarstack')).toBeTruthy()
  })
})
