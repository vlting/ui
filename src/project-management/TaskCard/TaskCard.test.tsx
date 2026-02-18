import { render, screen } from '../../__test-utils__/render'
import { TaskCard } from './TaskCard'

describe('TaskCard', () => {
  it('renders without crashing', () => {
    render(<TaskCard testID="taskcard" />)
    expect(screen.getByTestId('taskcard')).toBeTruthy()
  })
})
