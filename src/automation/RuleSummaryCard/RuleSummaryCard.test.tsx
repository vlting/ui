import { render, screen } from '../../__test-utils__/render'
import { RuleSummaryCard } from './RuleSummaryCard'

describe('RuleSummaryCard', () => {
  it('renders without crashing', () => {
    render(<RuleSummaryCard testID="rulesummarycard" />)
    expect(screen.getByTestId('rulesummarycard')).toBeTruthy()
  })
})
