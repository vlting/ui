import { render, screen } from '../../__test-utils__/render'
import { DeadlineIndicator } from './DeadlineIndicator'

describe('DeadlineIndicator', () => {
  it('renders without crashing', () => {
    render(<DeadlineIndicator testID="deadlineindicator" />)
    expect(screen.getByTestId('deadlineindicator')).toBeTruthy()
  })
})
