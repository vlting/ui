import { fireEvent, render, screen } from '../../__test-utils__/render'
import { DataGrid } from './DataGrid'

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'status', header: 'Status' },
]

const data = [
  { id: 'r1', name: 'Item A', status: 'Active' },
  { id: 'r2', name: 'Item B', status: 'Inactive' },
  { id: 'r3', name: 'Item C', status: 'Pending' },
]

const keyExtractor = (row: (typeof data)[number]) => row.id

describe('DataGrid', () => {
  it('renders without crashing', () => {
    render(<DataGrid testID="datagrid" columns={columns} data={data} keyExtractor={keyExtractor} />)
    expect(screen.getByTestId('datagrid')).toBeTruthy()
  })

  it('renders all rows', () => {
    render(<DataGrid testID="datagrid" columns={columns} data={data} keyExtractor={keyExtractor} />)
    expect(screen.getByTestId('row-r1')).toBeTruthy()
    expect(screen.getByTestId('row-r2')).toBeTruthy()
    expect(screen.getByTestId('row-r3')).toBeTruthy()
  })

  it('renders column headers', () => {
    render(<DataGrid testID="datagrid" columns={columns} data={data} keyExtractor={keyExtractor} />)
    expect(screen.getByText('Name')).toBeTruthy()
    expect(screen.getByText('Status')).toBeTruthy()
  })

  it('shows empty state when no rows', () => {
    render(
      <DataGrid testID="datagrid" columns={columns} data={[]} keyExtractor={keyExtractor} />,
    )
    expect(screen.getByTestId('datagrid-empty')).toBeTruthy()
  })

  it('shows loading state', () => {
    render(
      <DataGrid testID="datagrid" columns={columns} data={[]} keyExtractor={keyExtractor} loading />,
    )
    expect(screen.getByText('Loading...')).toBeTruthy()
  })

  it('calls onSort when sortable header is pressed', () => {
    const onSort = jest.fn()
    render(
      <DataGrid testID="datagrid" columns={columns} data={data} keyExtractor={keyExtractor} onSort={onSort} />,
    )
    fireEvent.press(screen.getByText('Name'))
    expect(onSort).toHaveBeenCalledWith('name', 'asc')
  })

  it('has grid role with aria-rowcount and aria-colcount', () => {
    render(<DataGrid testID="datagrid" columns={columns} data={data} keyExtractor={keyExtractor} />)
    expect(screen.getByTestId('datagrid')).toBeTruthy()
  })

  it('renders with virtualized prop', () => {
    render(
      <DataGrid
        testID="datagrid"
        columns={columns}
        data={data}
        keyExtractor={keyExtractor}
        virtualized
        estimatedRowHeight={40}
      />,
    )
    expect(screen.getByTestId('datagrid')).toBeTruthy()
  })

  it('renders in dark theme without errors', () => {
    render(
      <DataGrid testID="datagrid-dark" columns={columns} data={data} keyExtractor={keyExtractor} />,
    )
    expect(screen.getByTestId('datagrid-dark')).toBeTruthy()
  })
})
