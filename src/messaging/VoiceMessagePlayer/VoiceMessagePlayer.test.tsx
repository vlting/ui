import { render, screen } from '../../__test-utils__/render'
import { VoiceMessagePlayer } from './VoiceMessagePlayer'

describe('VoiceMessagePlayer', () => {
  it('renders without crashing', () => {
    render(<VoiceMessagePlayer testID="voicemessageplayer" />)
    expect(screen.getByTestId('voicemessageplayer')).toBeTruthy()
  })
})
