import { render, screen } from '../../__test-utils__/render'
import { TextArea } from './TextArea'

describe('TextArea', () => {
  it('renders without crashing', () => {
    render(<TextArea testID="textarea" />)
    expect(screen.getByTestId('textarea')).toBeTruthy()
  })
})
