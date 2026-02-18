import { render, screen } from '../../__test-utils__/render'
import { PasswordResetForm } from './PasswordResetForm'

describe('PasswordResetForm', () => {
  it('renders without crashing', () => {
    render(<PasswordResetForm testID="passwordresetform" />)
    expect(screen.getByTestId('passwordresetform')).toBeTruthy()
  })
})
