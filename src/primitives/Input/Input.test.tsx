import { render, screen } from '../../__test-utils__/render'
import { Input } from './Input'

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input testID="input" />)
    expect(screen.getByTestId('input')).toBeTruthy()
  })
})
