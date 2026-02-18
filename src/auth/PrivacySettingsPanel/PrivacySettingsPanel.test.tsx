import { render, screen } from '../../__test-utils__/render'
import { PrivacySettingsPanel } from './PrivacySettingsPanel'

describe('PrivacySettingsPanel', () => {
  it('renders without crashing', () => {
    render(<PrivacySettingsPanel testID="privacysettingspanel" />)
    expect(screen.getByTestId('privacysettingspanel')).toBeTruthy()
  })
})
