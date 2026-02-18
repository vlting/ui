import { render, screen } from '../../__test-utils__/render'
import { MFAForm } from './MFAForm'

describe('MFAForm', () => {
  it('renders without crashing', () => {
    render(<MFAForm testID="mfaform" />)
    expect(screen.getByTestId('mfaform')).toBeTruthy()
  })
})
