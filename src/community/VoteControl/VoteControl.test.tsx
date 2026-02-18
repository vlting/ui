import { render, screen } from '../../__test-utils__/render'
import { VoteControl } from './VoteControl'

describe('VoteControl', () => {
  it('renders without crashing', () => {
    render(<VoteControl testID="votecontrol" />)
    expect(screen.getByTestId('votecontrol')).toBeTruthy()
  })
})
