import { render, screen } from '../../__test-utils__/render'
import { MetricTile } from './MetricTile'

describe('MetricTile', () => {
  it('renders without crashing', () => {
    render(<MetricTile testID="metrictile" />)
    expect(screen.getByTestId('metrictile')).toBeTruthy()
  })
})
