import { render, screen } from '../../__test-utils__/render'
import { StageBadge } from './StageBadge'

describe('StageBadge', () => {
  it('renders without crashing', () => {
    render(<StageBadge testID="stagebadge" />)
    expect(screen.getByTestId('stagebadge')).toBeTruthy()
  })
})
