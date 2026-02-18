import { render, screen } from '../../__test-utils__/render'
import { DataTable } from './DataTable'

describe('DataTable', () => {
  it('renders without crashing', () => {
    render(<DataTable testID="datatable" />)
    expect(screen.getByTestId('datatable')).toBeTruthy()
  })
})
