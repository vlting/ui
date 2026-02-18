import { render, screen } from '../../__test-utils__/render'
import { Button } from './Button'

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button testID="button" />)
    expect(screen.getByTestId('button')).toBeTruthy()
  })
})
