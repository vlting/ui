import { render, screen } from '../../__test-utils__/render'
import { RadioGroup } from './RadioGroup'

describe('RadioGroup', () => {
  it('renders without crashing', () => {
    render(<RadioGroup testID="radiogroup" />)
    expect(screen.getByTestId('radiogroup')).toBeTruthy()
  })
})
