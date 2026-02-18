import { render, screen } from '../../__test-utils__/render'
import { NotesEditor } from './NotesEditor'

describe('NotesEditor', () => {
  it('renders without crashing', () => {
    render(<NotesEditor testID="noteseditor" />)
    expect(screen.getByTestId('noteseditor')).toBeTruthy()
  })
})
