import { render, screen } from '../../__test-utils__/render'
import { ChartWrapper } from './ChartWrapper'

describe('ChartWrapper', () => {
  it('renders without crashing', () => {
    render(<ChartWrapper testID="chartwrapper" />)
    expect(screen.getByTestId('chartwrapper')).toBeTruthy()
  })
})
