import { render, screen } from '../../__test-utils__/render'
import { KanbanColumn } from './KanbanColumn'

describe('KanbanColumn', () => {
  it('renders without crashing', () => {
    render(<KanbanColumn testID="kanbancolumn" />)
    expect(screen.getByTestId('kanbancolumn')).toBeTruthy()
  })
})
