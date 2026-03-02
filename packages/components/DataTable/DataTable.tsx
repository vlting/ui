import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Table } from '../Table'

export interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, unknown>[]
  caption?: string
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  columnFilters?: ColumnFiltersState
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void
  globalFilter?: string
  onGlobalFilterChange?: (filter: string) => void
  pagination?: PaginationState
  onPaginationChange?: (pagination: PaginationState) => void
  columnVisibility?: VisibilityState
  onColumnVisibilityChange?: (visibility: VisibilityState) => void
  enablePagination?: boolean
  pageSize?: number
}

export function DataTable<TData>({
  data,
  columns,
  caption,
  sorting: controlledSorting,
  onSortingChange,
  columnFilters: controlledFilters,
  onColumnFiltersChange,
  globalFilter: controlledGlobalFilter,
  onGlobalFilterChange,
  pagination: controlledPagination,
  onPaginationChange,
  columnVisibility: controlledVisibility,
  onColumnVisibilityChange,
  enablePagination = false,
  pageSize = 10,
}: DataTableProps<TData>) {
  const [internalSorting, setInternalSorting] = useState<SortingState>([])
  const [internalFilters, setInternalFilters] = useState<ColumnFiltersState>([])
  const [internalGlobalFilter, setInternalGlobalFilter] = useState('')
  const [internalPagination, setInternalPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })
  const [internalVisibility, setInternalVisibility] = useState<VisibilityState>({})

  const sorting = controlledSorting ?? internalSorting
  const columnFilters = controlledFilters ?? internalFilters
  const globalFilter = controlledGlobalFilter ?? internalGlobalFilter
  const pagination = controlledPagination ?? internalPagination
  const columnVisibility = controlledVisibility ?? internalVisibility

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      ...(enablePagination ? { pagination } : {}),
    },
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater
      ;(onSortingChange ?? setInternalSorting)(next)
    },
    onColumnFiltersChange: (updater) => {
      const next = typeof updater === 'function' ? updater(columnFilters) : updater
      ;(onColumnFiltersChange ?? setInternalFilters)(next)
    },
    onGlobalFilterChange: (updater) => {
      const next = typeof updater === 'function' ? updater(globalFilter) : updater
      ;(onGlobalFilterChange ?? setInternalGlobalFilter)(next)
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function' ? updater(pagination) : updater
      ;(onPaginationChange ?? setInternalPagination)(next)
    },
    onColumnVisibilityChange: (updater) => {
      const next = typeof updater === 'function' ? updater(columnVisibility) : updater
      ;(onColumnVisibilityChange ?? setInternalVisibility)(next)
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(enablePagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
  })

  return (
    <div>
      <Table.Root>
        {caption && <Table.Caption>{caption}</Table.Caption>}
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Head
                  key={header.id}
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  style={
                    header.column.getCanSort()
                      ? { cursor: 'pointer', userSelect: 'none' }
                      : undefined
                  }
                  aria-sort={
                    header.column.getIsSorted()
                      ? header.column.getIsSorted() === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === 'asc' ? ' \u2191' : ''}
                  {header.column.getIsSorted() === 'desc' ? ' \u2193' : ''}
                </Table.Head>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={columns.length} style={{ textAlign: 'center' }}>
                No results.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
      {enablePagination && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 0',
          }}
        >
          <span style={{ fontSize: '14px' }}>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous page"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
} from '@tanstack/react-table'
