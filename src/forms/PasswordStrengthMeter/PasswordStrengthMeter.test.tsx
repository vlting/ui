import { render, screen } from '../../__test-utils__/render'
import { PasswordStrengthMeter } from './PasswordStrengthMeter'

describe('PasswordStrengthMeter', () => {
  it('renders without crashing', () => {
    render(<PasswordStrengthMeter testID="passwordstrengthmeter" />)
    expect(screen.getByTestId('passwordstrengthmeter')).toBeTruthy()
  })
})
