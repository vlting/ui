import { render, screen } from '../../__test-utils__/render'
import { SessionExpiredModal } from './SessionExpiredModal'

describe('SessionExpiredModal', () => {
  it('renders without crashing', () => {
    render(<SessionExpiredModal testID="sessionexpiredmodal" />)
    expect(screen.getByTestId('sessionexpiredmodal')).toBeTruthy()
  })
})
