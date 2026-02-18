import { render, screen } from '../../__test-utils__/render'
import { UpgradeModal } from './UpgradeModal'

describe('UpgradeModal', () => {
  it('renders without crashing', () => {
    render(<UpgradeModal testID="upgrademodal" />)
    expect(screen.getByTestId('upgrademodal')).toBeTruthy()
  })
})
