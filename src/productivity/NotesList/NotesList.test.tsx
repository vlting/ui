import { render, screen } from '../../__test-utils__/render'
import { NotesList } from './NotesList'

describe('NotesList', () => {
  it('renders without crashing', () => {
    render(<NotesList testID="noteslist" />)
    expect(screen.getByTestId('noteslist')).toBeTruthy()
  })
})
