import { render, screen } from '../../__test-utils__/render'
import { LineChart } from './LineChart'

describe('LineChart', () => {
  it('renders without crashing', () => {
    render(<LineChart testID="linechart" />)
    expect(screen.getByTestId('linechart')).toBeTruthy()
  })
})
