import { fireEvent, render, screen } from '../../__test-utils__/render'
import { DataTable } from './DataTable'

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
]

const data = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob', email: 'bob@example.com', role: 'User' },
  { id: '3', name: 'Carol', email: 'carol@example.com', role: 'User' },
]

const keyExtractor = (row: (typeof data)[number]) => row.id

describe('DataTable', () => {
  it('renders without crashing', () => {
    render(<DataTable testID="datatable" columns={columns} data={data} keyExtractor={keyExtractor} />)
    expect(screen.getByTestId('datatable')).toBeTruthy()
  })

  it('renders all rows', () => {
    render(<DataTable testID="datatable" columns={columns} data={data} keyExtractor={keyExtractor} />)
    expect(screen.getByTestId('row-1')).toBeTruthy()
    expect(screen.getByTestId('row-2')).toBeTruthy()
    expect(screen.getByTestId('row-3')).toBeTruthy()
  })

  it('renders column headers', () => {
    render(<DataTable testID="datatable" columns={columns} data={data} keyExtractor={keyExtractor} />)
    expect(screen.getByText('Name')).toBeTruthy()
    expect(screen.getByText('Email')).toBeTruthy()
    expect(screen.getByText('Role')).toBeTruthy()
  })

  it('shows empty state when no rows', () => {
    render(
      <DataTable
        testID="datatable"
        columns={columns}
        data={[]}
        keyExtractor={keyExtractor}
        emptyLabel="No records found."
      />,
    )
    expect(screen.getByTestId('datatable-empty')).toBeTruthy()
    expect(screen.getByText('No records found.')).toBeTruthy()
  })

  it('shows loading state', () => {
    render(
      <DataTable testID="datatable" columns={columns} data={[]} keyExtractor={keyExtractor} loading />,
    )
    expect(screen.getByText('Loading...')).toBeTruthy()
  })

  it('calls onRowPress when a row is pressed', () => {
    const onRowPress = jest.fn()
    render(
      <DataTable
        testID="datatable"
        columns={columns}
        data={data}
        keyExtractor={keyExtractor}
        onRowPress={onRowPress}
      />,
    )
    fireEvent.press(screen.getByTestId('row-1'))
    expect(onRowPress).toHaveBeenCalledWith(data[0])
  })

  it('calls onSort when a sortable header is pressed', () => {
    const onSort = jest.fn()
    render(
      <DataTable
        testID="datatable"
        columns={columns}
        data={data}
        keyExtractor={keyExtractor}
        onSort={onSort}
      />,
    )
    fireEvent.press(screen.getByText('Name'))
    expect(onSort).toHaveBeenCalledWith('name', 'asc')
  })

  it('renders in dark theme without errors', () => {
    render(
      <DataTable testID="datatable-dark" columns={columns} data={data} keyExtractor={keyExtractor} />,
    )
    expect(screen.getByTestId('datatable-dark')).toBeTruthy()
  })
})
