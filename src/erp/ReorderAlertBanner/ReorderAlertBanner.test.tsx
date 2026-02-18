import { render, screen } from '../../__test-utils__/render'
import { ReorderAlertBanner } from './ReorderAlertBanner'

describe('ReorderAlertBanner', () => {
  it('renders without crashing', () => {
    render(<ReorderAlertBanner testID="reorderalertbanner" />)
    expect(screen.getByTestId('reorderalertbanner')).toBeTruthy()
  })
})
