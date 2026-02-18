import { render, screen } from '../../__test-utils__/render'
import { TagFilterBar } from './TagFilterBar'

describe('TagFilterBar', () => {
  it('renders without crashing', () => {
    render(<TagFilterBar testID="tagfilterbar" />)
    expect(screen.getByTestId('tagfilterbar')).toBeTruthy()
  })
})
