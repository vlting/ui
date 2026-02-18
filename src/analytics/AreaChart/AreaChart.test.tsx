import { render, screen } from '../../__test-utils__/render'
import { AreaChart } from './AreaChart'

describe('AreaChart', () => {
  it('renders without crashing', () => {
    render(<AreaChart testID="areachart" />)
    expect(screen.getByTestId('areachart')).toBeTruthy()
  })
})
