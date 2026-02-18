import { render, screen } from '../../__test-utils__/render'
import { UsageMeter } from './UsageMeter'

describe('UsageMeter', () => {
  it('renders without crashing', () => {
    render(<UsageMeter testID="usagemeter" />)
    expect(screen.getByTestId('usagemeter')).toBeTruthy()
  })
})
