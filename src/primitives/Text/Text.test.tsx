import { render, screen } from '../../__test-utils__/render'
import { Text } from './Text'

describe('Text', () => {
  it('renders without crashing', () => {
    render(<Text testID="text" />)
    expect(screen.getByTestId('text')).toBeTruthy()
  })
})
