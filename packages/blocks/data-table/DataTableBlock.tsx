import type { ColumnDef } from '@tanstack/react-table'
import type { ComponentType, ReactNode } from 'react'
import { useState } from 'react'
import { Text, View, XStack, YStack } from 'tamagui'
import { Card } from '../../components/Card'
import { DataTable } from '../../components/DataTable'
import { Input } from '../../components/Input'
import type { BlockProps } from '../_shared/types'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC
const XStackJsx = XStack as AnyFC
const YStackJsx = YStack as AnyFC
const CardJsx = Card as AnyFC
const InputJsx = Input as AnyFC
const DataTableJsx = DataTable as unknown as AnyFC

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
    <CardJsx width="100%" padding="$4">
      <YStackJsx gap="$4" width="100%">
        {(title || description || actions) && (
          <XStackJsx
            justifyContent="space-between"
            alignItems="flex-start"
            width="100%"
          >
            <ViewJsx gap="$1" flex={1}>
              {title && (
                <TextJsx fontSize="$5" fontWeight="$4" fontFamily="$heading" color="$color">
                  {title}
                </TextJsx>
              )}
              {description && (
                <TextJsx fontSize="$3" fontFamily="$body" color="$colorSubtle">
                  {description}
                </TextJsx>
              )}
            </ViewJsx>
            {actions}
          </XStackJsx>
        )}

        {searchable && (
          <ViewJsx style={{ maxWidth: 300 }}>
            <InputJsx
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChangeText={setGlobalFilter}
            />
          </ViewJsx>
        )}

        <DataTableJsx
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
      </YStackJsx>
    </CardJsx>
  )
}
