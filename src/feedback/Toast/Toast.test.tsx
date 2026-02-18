import { render, screen } from '../../__test-utils__/render'
import { Toast } from './Toast'

describe('Toast', () => {
  it('renders without crashing', () => {
    render(<Toast testID="toast" />)
    expect(screen.getByTestId('toast')).toBeTruthy()
  })
})
