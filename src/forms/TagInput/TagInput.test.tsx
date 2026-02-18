import { render, screen } from '../../__test-utils__/render'
import { TagInput } from './TagInput'

describe('TagInput', () => {
  it('renders without crashing', () => {
    render(<TagInput testID="taginput" />)
    expect(screen.getByTestId('taginput')).toBeTruthy()
  })
})
