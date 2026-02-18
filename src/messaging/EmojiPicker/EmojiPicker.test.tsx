import { render, screen } from '../../__test-utils__/render'
import { EmojiPicker } from './EmojiPicker'

describe('EmojiPicker', () => {
  it('renders without crashing', () => {
    render(<EmojiPicker testID="emojipicker" />)
    expect(screen.getByTestId('emojipicker')).toBeTruthy()
  })
})
