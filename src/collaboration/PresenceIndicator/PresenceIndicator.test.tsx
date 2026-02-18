import { render, screen } from '../../__test-utils__/render'
import { PresenceIndicator } from './PresenceIndicator'

describe('PresenceIndicator', () => {
  it('renders without crashing', () => {
    render(<PresenceIndicator testID="presenceindicator" />)
    expect(screen.getByTestId('presenceindicator')).toBeTruthy()
  })
})
