import { render, screen } from '../../__test-utils__/render'
import { ConditionBuilder } from './ConditionBuilder'

describe('ConditionBuilder', () => {
  it('renders without crashing', () => {
    render(<ConditionBuilder testID="conditionbuilder" />)
    expect(screen.getByTestId('conditionbuilder')).toBeTruthy()
  })
})
