import { render, screen } from '../../__test-utils__/render'
import { EmailTemplateEditor } from './EmailTemplateEditor'

describe('EmailTemplateEditor', () => {
  it('renders without crashing', () => {
    render(<EmailTemplateEditor testID="emailtemplateeditor" />)
    expect(screen.getByTestId('emailtemplateeditor')).toBeTruthy()
  })
})
