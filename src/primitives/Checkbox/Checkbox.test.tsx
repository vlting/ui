import { render, screen } from '../../__test-utils__/render'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders without crashing', () => {
    render(<Checkbox testID="checkbox" />)
    expect(screen.getByTestId('checkbox')).toBeTruthy()
  })
})
