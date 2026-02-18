import { render, screen } from '../../__test-utils__/render'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders without crashing', () => {
    render(<Spinner testID="spinner" />)
    expect(screen.getByTestId('spinner')).toBeTruthy()
  })
})
