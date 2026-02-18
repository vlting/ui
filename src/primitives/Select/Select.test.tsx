import { render, screen } from '../../__test-utils__/render'
import { Select } from './Select'

describe('Select', () => {
  it('renders without crashing', () => {
    render(<Select testID="select" />)
    expect(screen.getByTestId('select')).toBeTruthy()
  })
})
