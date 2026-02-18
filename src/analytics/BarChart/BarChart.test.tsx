import { render, screen } from '../../__test-utils__/render'
import { BarChart } from './BarChart'

describe('BarChart', () => {
  it('renders without crashing', () => {
    render(<BarChart testID="barchart" />)
    expect(screen.getByTestId('barchart')).toBeTruthy()
  })
})
