import { render, screen } from '../../__test-utils__/render'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('renders without crashing', () => {
    render(<Pagination testID="pagination" />)
    expect(screen.getByTestId('pagination')).toBeTruthy()
  })
})
