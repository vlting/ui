import { render, screen } from '../../__test-utils__/render'
import { DocumentEditor } from './DocumentEditor'

describe('DocumentEditor', () => {
  it('renders without crashing', () => {
    render(<DocumentEditor testID="documenteditor" />)
    expect(screen.getByTestId('documenteditor')).toBeTruthy()
  })
})
