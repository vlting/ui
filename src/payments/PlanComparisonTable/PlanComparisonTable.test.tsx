import { render, screen } from '../../__test-utils__/render'
import { PlanComparisonTable } from './PlanComparisonTable'

describe('PlanComparisonTable', () => {
  it('renders without crashing', () => {
    render(<PlanComparisonTable testID="plancomparisontable" />)
    expect(screen.getByTestId('plancomparisontable')).toBeTruthy()
  })
})
