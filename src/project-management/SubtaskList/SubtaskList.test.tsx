import { render, screen } from '../../__test-utils__/render'
import { SubtaskList } from './SubtaskList'

describe('SubtaskList', () => {
  it('renders without crashing', () => {
    render(<SubtaskList testID="subtasklist" />)
    expect(screen.getByTestId('subtasklist')).toBeTruthy()
  })
})
