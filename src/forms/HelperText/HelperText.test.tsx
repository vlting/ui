import { render, screen } from '../../__test-utils__/render'
import { HelperText } from './HelperText'

describe('HelperText', () => {
  it('renders without crashing', () => {
    render(<HelperText testID="helpertext" />)
    expect(screen.getByTestId('helpertext')).toBeTruthy()
  })
})
