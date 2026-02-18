import { render, screen } from '../../__test-utils__/render'
import { PieChart } from './PieChart'

describe('PieChart', () => {
  it('renders without crashing', () => {
    render(<PieChart testID="piechart" />)
    expect(screen.getByTestId('piechart')).toBeTruthy()
  })
})
