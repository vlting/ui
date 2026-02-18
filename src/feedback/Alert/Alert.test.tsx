import { render, screen } from '../../__test-utils__/render'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders without crashing', () => {
    render(<Alert testID="alert" />)
    expect(screen.getByTestId('alert')).toBeTruthy()
  })
})
