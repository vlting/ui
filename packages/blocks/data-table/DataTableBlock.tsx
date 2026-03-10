import type { ColumnDef } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Card } from '../../components/Card'
import { DataTable } from '../../components/DataTable'
import { Input } from '../../components/Input'
import type { BlockProps } from '../_shared/types'

// -- Types --

export type DataTableBlockVariant = 'standard' | 'compact' | 'expandable'

export interface DataTableBlockProps extends BlockProps {
  variant: DataTableBlockVariant
  title?: string
  description?: string
  columns: ColumnDef<Record<string, unknown>, unknown>[]
  data: Record<string, unknown>[]
  searchable?: boolean
  searchPlaceholder?: string
  pageSize?: number
  onRowClick?: (row: Record<string, unknown>) => void
  renderExpandedRow?: (row: Record<string, unknown>) => ReactNode
  actions?: ReactNode
}

const col = { display: 'flex', flexDirection: 'column' as const }
const row = { display: 'flex', flexDirection: 'row' as const }

// -- Main component --

export function DataTableBlock({
  variant,
  title,
  description,
  columns,
  data,
  searchable = false,
  searchPlaceholder = 'Search...',
  pageSize = 10,
  onRowClick,
  renderExpandedRow,
  actions,
}: DataTableBlockProps) {
  const [globalFilter, setGlobalFilter] = useState('')

  return (
    <Card style={{ width: '100%', padding: '16px' }}>
      <div style={{ ...col, gap: '16px', width: '100%' }}>
        {(title || description || actions) && (
          <div
            style={{
              ...row,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <div style={{ ...col, gap: '4px', flex: 1 }}>
              {title && (
                <span style={{ fontSize: '18px', fontWeight: 600 }}>{title}</span>
              )}
              {description && (
                <span style={{ fontSize: '14px', opacity: 0.6 }}>{description}</span>
              )}
            </div>
            {actions}
          </div>
        )}
        {searchable && (
          <div style={{ maxWidth: 300 }}>
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChangeText={setGlobalFilter}
              aria-label="Search table"
            />
          </div>
        )}
        <DataTable
          data={data}
          columns={columns}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          pagination={{ pageIndex: 0, pageSize }}
          dense={variant === 'compact'}
          onRowClick={onRowClick}
          expandable={variant === 'expandable'}
          renderExpandedRow={renderExpandedRow}
        />
      </div>
    </Card>
  )
}
