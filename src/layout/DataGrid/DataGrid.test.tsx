import { render, screen } from '../../__test-utils__/render'
import { DataGrid } from './DataGrid'

describe('DataGrid', () => {
  it('renders without crashing', () => {
    render(<DataGrid testID="datagrid" />)
    expect(screen.getByTestId('datagrid')).toBeTruthy()
  })
})
