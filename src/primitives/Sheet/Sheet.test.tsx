import { render, screen } from '../../__test-utils__/render'
import { Sheet } from './Sheet'

describe('Sheet', () => {
  it('renders without crashing', () => {
    render(<Sheet testID="sheet" />)
    expect(screen.getByTestId('sheet')).toBeTruthy()
  })
})
