import { render, screen } from '../../__test-utils__/render'
import { StockLevelIndicator } from './StockLevelIndicator'

describe('StockLevelIndicator', () => {
  it('renders without crashing', () => {
    render(<StockLevelIndicator testID="stocklevelindicator" />)
    expect(screen.getByTestId('stocklevelindicator')).toBeTruthy()
  })
})
