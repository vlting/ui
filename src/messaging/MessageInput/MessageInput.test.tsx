import { render, screen } from '../../__test-utils__/render'
import { MessageInput } from './MessageInput'

describe('MessageInput', () => {
  it('renders without crashing', () => {
    render(<MessageInput testID="messageinput" />)
    expect(screen.getByTestId('messageinput')).toBeTruthy()
  })
})
