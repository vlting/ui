import { render, screen } from '../../__test-utils__/render'
import { ChatLayout } from './ChatLayout'

describe('ChatLayout', () => {
  it('renders without crashing', () => {
    render(<ChatLayout testID="chatlayout" />)
    expect(screen.getByTestId('chatlayout')).toBeTruthy()
  })
})
