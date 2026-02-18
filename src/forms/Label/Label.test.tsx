import { render, screen } from '../../__test-utils__/render'
import { Label } from './Label'

describe('Label', () => {
  it('renders without crashing', () => {
    render(<Label testID="label" />)
    expect(screen.getByTestId('label')).toBeTruthy()
  })
})
