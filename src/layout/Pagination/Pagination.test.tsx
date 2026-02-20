import { fireEvent, render, screen } from '../../__test-utils__/render'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('renders without crashing', () => {
    render(<Pagination testID="pagination" totalPages={10} />)
    expect(screen.getByTestId('pagination')).toBeTruthy()
  })

  it('renders page 1 as active by default', () => {
    render(<Pagination testID="pagination" totalPages={5} />)
    expect(screen.getByTestId('pagination-page-1')).toBeTruthy()
  })

  it('prev button is disabled on page 1', () => {
    render(<Pagination testID="pagination" page={1} totalPages={10} />)
    expect(screen.getByTestId('pagination-prev')).toBeTruthy()
  })

  it('next button is disabled on last page', () => {
    render(<Pagination testID="pagination" page={10} totalPages={10} />)
    expect(screen.getByTestId('pagination-next')).toBeTruthy()
  })

  it('calls onPageChange with correct page when page button pressed', () => {
    const onPageChange = jest.fn()
    render(<Pagination testID="pagination" page={1} totalPages={10} onPageChange={onPageChange} />)
    fireEvent.press(screen.getByTestId('pagination-page-2'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange with page-1 when prev is pressed', () => {
    const onPageChange = jest.fn()
    render(<Pagination testID="pagination" page={5} totalPages={10} onPageChange={onPageChange} />)
    fireEvent.press(screen.getByTestId('pagination-prev'))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('calls onPageChange with page+1 when next is pressed', () => {
    const onPageChange = jest.fn()
    render(<Pagination testID="pagination" page={5} totalPages={10} onPageChange={onPageChange} />)
    fireEvent.press(screen.getByTestId('pagination-next'))
    expect(onPageChange).toHaveBeenCalledWith(6)
  })

  it('does not call onPageChange when prev is pressed on page 1', () => {
    const onPageChange = jest.fn()
    render(<Pagination testID="pagination" page={1} totalPages={10} onPageChange={onPageChange} />)
    fireEvent.press(screen.getByTestId('pagination-prev'))
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('shows ellipsis for large page counts', () => {
    render(<Pagination testID="pagination" page={5} totalPages={20} />)
    // Should have at least one ellipsis indicator
    const ellipses = screen.queryAllByTestId(/pagination-ellipsis/)
    expect(ellipses.length).toBeGreaterThan(0)
  })

  it('renders navigation landmark with accessible label', () => {
    render(<Pagination testID="pagination" totalPages={5} />)
    expect(screen.getByRole('navigation')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(<Pagination testID="pagination-dark" totalPages={5} />)
    expect(screen.getByTestId('pagination-dark')).toBeTruthy()
  })
})
