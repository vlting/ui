import { render, screen } from '../../__test-utils__/render'
import { RichTextEditor } from './RichTextEditor'

describe('RichTextEditor', () => {
  it('renders without crashing', () => {
    render(<RichTextEditor testID="richtexteditor" />)
    expect(screen.getByTestId('richtexteditor')).toBeTruthy()
  })
})
