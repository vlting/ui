import { render, screen } from '../../__test-utils__/render'
import { KanbanBoard } from './KanbanBoard'

describe('KanbanBoard', () => {
  it('renders without crashing', () => {
    render(<KanbanBoard testID="kanbanboard" />)
    expect(screen.getByTestId('kanbanboard')).toBeTruthy()
  })
})
