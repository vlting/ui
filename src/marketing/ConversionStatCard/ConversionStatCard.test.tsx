import { render, screen } from '../../__test-utils__/render'
import { ConversionStatCard } from './ConversionStatCard'

describe('ConversionStatCard', () => {
  it('renders without crashing', () => {
    render(<ConversionStatCard testID="conversionstatcard" />)
    expect(screen.getByTestId('conversionstatcard')).toBeTruthy()
  })
})
