import { render, screen } from '../../__test-utils__/render'
import { MultiSelect } from './MultiSelect'

describe('MultiSelect', () => {
  it('renders without crashing', () => {
    render(<MultiSelect testID="multiselect" />)
    expect(screen.getByTestId('multiselect')).toBeTruthy()
  })
})
