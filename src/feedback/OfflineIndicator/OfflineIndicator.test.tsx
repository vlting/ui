import { render, screen } from '../../__test-utils__/render'
import { OfflineIndicator } from './OfflineIndicator'

describe('OfflineIndicator', () => {
  it('renders without crashing', () => {
    render(<OfflineIndicator testID="offlineindicator" />)
    expect(screen.getByTestId('offlineindicator')).toBeTruthy()
  })
})
