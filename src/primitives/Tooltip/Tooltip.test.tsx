import { render, screen } from '../../__test-utils__/render'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('renders without crashing', () => {
    render(<Tooltip testID="tooltip" />)
    expect(screen.getByTestId('tooltip')).toBeTruthy()
  })
})
