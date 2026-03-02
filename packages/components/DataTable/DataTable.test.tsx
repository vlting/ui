import type { ColumnDef } from '@tanstack/react-table'
import { fireEvent, render, screen } from '../../../src/__test-utils__/render'
import { DataTable } from './DataTable'

type User = { name: string; email: string; role: string }

const testData: User[] = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'User' },
  { name: 'Charlie', email: 'charlie@example.com', role: 'User' },
]

const testColumns: ColumnDef<User, unknown>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
]

describe('DataTable', () => {
  it('renders basic table with data and columns', () => {
    render(<DataTable data={testData} columns={testColumns} />)
    expect(screen.getByText('Alice')).toBeTruthy()
    expect(screen.getByText('bob@example.com')).toBeTruthy()
    expect(screen.getByText('Name')).toBeTruthy()
    expect(screen.getByText('Email')).toBeTruthy()
    expect(screen.getByText('Role')).toBeTruthy()
  })

  it('renders empty state when no data', () => {
    render(<DataTable data={[]} columns={testColumns} />)
    expect(screen.getByText('No results.')).toBeTruthy()
  })

  it('renders caption when provided', () => {
    render(<DataTable data={testData} columns={testColumns} caption="User list" />)
    expect(screen.getByText('User list')).toBeTruthy()
  })

  it('has proper semantic table structure', () => {
    const { container } = render(<DataTable data={testData} columns={testColumns} />)
    const table = container.querySelector('table')
    expect(table).toBeTruthy()
    expect(table?.querySelector('thead')).toBeTruthy()
    expect(table?.querySelector('tbody')).toBeTruthy()
    expect(table?.querySelectorAll('th').length).toBe(3)
    expect(table?.querySelectorAll('td').length).toBe(9)
  })

  it('clicking sortable header changes aria-sort', () => {
    const { container } = render(<DataTable data={testData} columns={testColumns} />)
    const nameHeader = screen.getByText('Name').closest('th')!
    expect(nameHeader.getAttribute('aria-sort')).toBeNull()

    fireEvent.click(nameHeader)
    expect(nameHeader.getAttribute('aria-sort')).toBe('ascending')

    fireEvent.click(nameHeader)
    expect(nameHeader.getAttribute('aria-sort')).toBe('descending')
  })

  it('renders pagination controls when enabled', () => {
    render(
      <DataTable data={testData} columns={testColumns} enablePagination pageSize={2} />,
    )
    expect(screen.getByText('Page 1 of 2')).toBeTruthy()
    expect(screen.getByLabelText('Previous page')).toBeTruthy()
    expect(screen.getByLabelText('Next page')).toBeTruthy()
  })

  it('pagination Previous/Next buttons work', () => {
    render(
      <DataTable data={testData} columns={testColumns} enablePagination pageSize={2} />,
    )
    // Page 1: Alice, Bob visible
    expect(screen.getByText('Alice')).toBeTruthy()
    expect(screen.getByText('Bob')).toBeTruthy()
    expect(screen.queryByText('Charlie')).toBeNull()

    // Previous disabled on first page
    expect(screen.getByLabelText('Previous page')).toBeDisabled()

    // Go to page 2
    fireEvent.click(screen.getByLabelText('Next page'))
    expect(screen.getByText('Page 2 of 2')).toBeTruthy()
    expect(screen.getByText('Charlie')).toBeTruthy()
    expect(screen.queryByText('Alice')).toBeNull()

    // Next disabled on last page
    expect(screen.getByLabelText('Next page')).toBeDisabled()
  })

  it('column visibility hides columns', () => {
    render(
      <DataTable
        data={testData}
        columns={testColumns}
        columnVisibility={{ email: false }}
      />,
    )
    expect(screen.getByText('Name')).toBeTruthy()
    expect(screen.queryByText('Email')).toBeNull()
    expect(screen.getByText('Role')).toBeTruthy()
    expect(screen.queryByText('alice@example.com')).toBeNull()
  })
})
