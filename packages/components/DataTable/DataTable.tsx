import { createStub, noopFn } from '../_stub'

export type ColumnDef<TData = any> = Record<string, any>
export type ColumnFiltersState = any[]
export type SortingState = any[]
export type VisibilityState = Record<string, boolean>
export type PaginationState = { pageIndex: number; pageSize: number }
export interface DataTableProps<TData = any> { data?: TData[]; columns?: ColumnDef<TData>[]; [key: string]: any }

export const DataTable = createStub('DataTable', 'div')
