import { render, screen } from '../../__test-utils__/render'
import { MentionAutocomplete } from './MentionAutocomplete'

describe('MentionAutocomplete', () => {
  it('renders without crashing', () => {
    render(<MentionAutocomplete testID="mentionautocomplete" />)
    expect(screen.getByTestId('mentionautocomplete')).toBeTruthy()
  })
})
