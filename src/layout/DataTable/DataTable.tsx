import React, { memo, useCallback, useState } from 'react'
import { Text, XStack, YStack, styled } from 'tamagui'

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc' | 'none'

export type DataTableColumn<TRow = Record<string, unknown>> = {
  key: string
  header: string
  render?: (value: unknown, row: TRow) => React.ReactNode
  sortable?: boolean
  width?: number | string
}

export type DataTableProps<TRow = Record<string, unknown>> = {
  /** Column definitions */
  columns: DataTableColumn<TRow>[]
  /** Row data */
  data: TRow[]
  /** Unique key extractor for rows */
  keyExtractor: (row: TRow) => string
  /** Controlled sort key */
  sortKey?: string
  /** Controlled sort direction */
  sortDirection?: SortDirection
  /** Callback when sort changes */
  onSort?: (key: string, direction: SortDirection) => void
  /** Whether rows are selectable */
  selectable?: boolean
  /** Selected row keys */
  selectedKeys?: string[]
  /** Callback when selection changes */
  onSelectionChange?: (keys: string[]) => void
  /** Callback when a row is pressed */
  onRowPress?: (row: TRow) => void
  /** Whether to stick the header */
  stickyHeader?: boolean
  /** Whether data is loading */
  loading?: boolean
  /** Empty state label */
  emptyLabel?: string
  testID?: string
}

// ─── Row component ────────────────────────────────────────────────────────────

const RowContainer = styled(XStack, {
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  alignItems: 'center',

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  variants: {
    selected: {
      true: {
        backgroundColor: '$backgroundPress',
      },
    },
    header: {
      true: {
        backgroundColor: '$backgroundStrong',
      },
    },
  } as const,
})

const CellContainer = styled(XStack, {
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  alignItems: 'center',
  flex: 1,
})

// ─── DataTable Component ──────────────────────────────────────────────────────

function DataTableInner<TRow = Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  sortKey: sortKeyProp,
  sortDirection: sortDirectionProp,
  onSort,
  selectable = false,
  selectedKeys: selectedKeysProp,
  onSelectionChange,
  onRowPress,
  stickyHeader = false,
  loading = false,
  emptyLabel = 'No data available.',
  testID,
}: DataTableProps<TRow>) {
  // Uncontrolled sort state
  const [internalSortKey, setInternalSortKey] = useState<string | undefined>(undefined)
  const [internalSortDir, setInternalSortDir] = useState<SortDirection>('none')
  const [internalSelected, setInternalSelected] = useState<string[]>([])

  const isSortControlled = sortKeyProp !== undefined
  const isSelectionControlled = selectedKeysProp !== undefined

  const activeSortKey = isSortControlled ? sortKeyProp : internalSortKey
  const activeSortDir = isSortControlled ? (sortDirectionProp ?? 'none') : internalSortDir
  const activeSelected = isSelectionControlled ? (selectedKeysProp ?? []) : internalSelected

  const handleHeaderPress = useCallback(
    (key: string) => {
      const col = columns.find((c) => c.key === key)
      if (!col?.sortable) return
      let nextDir: SortDirection = 'asc'
      if (activeSortKey === key) {
        nextDir = activeSortDir === 'asc' ? 'desc' : activeSortDir === 'desc' ? 'none' : 'asc'
      }
      if (!isSortControlled) {
        setInternalSortKey(key)
        setInternalSortDir(nextDir)
      }
      onSort?.(key, nextDir)
    },
    [columns, activeSortKey, activeSortDir, isSortControlled, onSort],
  )

  const handleRowSelect = useCallback(
    (rowKey: string) => {
      const next = activeSelected.includes(rowKey)
        ? activeSelected.filter((k) => k !== rowKey)
        : [...activeSelected, rowKey]
      if (!isSelectionControlled) setInternalSelected(next)
      onSelectionChange?.(next)
    },
    [activeSelected, isSelectionControlled, onSelectionChange],
  )

  const ariaSortMap: Record<SortDirection, 'ascending' | 'descending' | 'none'> = {
    asc: 'ascending',
    desc: 'descending',
    none: 'none',
  }

  return (
    <YStack testID={testID} overflow="hidden">
      {/* Header row */}
      <RowContainer
        header
        role="row"
        position={stickyHeader ? 'sticky' : undefined}
        top={stickyHeader ? 0 : undefined}
        zIndex={stickyHeader ? 1 : undefined}
      >
        {selectable && (
          <CellContainer width={40}>
            <input
              type="checkbox"
              aria-label="Select all rows"
              checked={activeSelected.length === data.length && data.length > 0}
              onChange={(e) => {
                const next = e.target.checked ? data.map(keyExtractor) : []
                if (!isSelectionControlled) setInternalSelected(next)
                onSelectionChange?.(next)
              }}
            />
          </CellContainer>
        )}
        {columns.map((col) => (
          <CellContainer key={col.key} width={col.width} flex={col.width ? 0 : 1}>
            <XStack
              role="columnheader"
              aria-sort={
                col.sortable
                  ? activeSortKey === col.key
                    ? ariaSortMap[activeSortDir]
                    : 'none'
                  : undefined
              }
              scope="col"
              alignItems="center"
              gap="$1"
              onPress={() => handleHeaderPress(col.key)}
              cursor={col.sortable ? 'pointer' : 'default'}
              flex={1}
            >
              <Text fontSize="$2" fontWeight="600" color="$color">
                {col.header}
              </Text>
              {col.sortable && activeSortKey === col.key && (
                <Text fontSize="$1" aria-hidden="true">
                  {activeSortDir === 'asc' ? '↑' : activeSortDir === 'desc' ? '↓' : ''}
                </Text>
              )}
            </XStack>
          </CellContainer>
        ))}
      </RowContainer>

      {/* Body */}
      {loading ? (
        <YStack padding="$4" alignItems="center">
          <Text color="$colorSubtitle">Loading...</Text>
        </YStack>
      ) : data.length === 0 ? (
        <YStack padding="$4" alignItems="center" testID="datatable-empty">
          <Text color="$colorSubtitle">{emptyLabel}</Text>
        </YStack>
      ) : (
        data.map((row) => {
          const key = keyExtractor(row)
          const isSelected = activeSelected.includes(key)
          return (
            <RowContainer
              key={key}
              selected={isSelected}
              role="row"
              aria-selected={selectable ? isSelected : undefined}
              onPress={() => onRowPress?.(row)}
              cursor={onRowPress ? 'pointer' : 'default'}
              testID={`row-${key}`}
            >
              {selectable && (
                <CellContainer width={40}>
                  <input
                    type="checkbox"
                    aria-label={`Select row ${key}`}
                    checked={isSelected}
                    onChange={() => handleRowSelect(key)}
                  />
                </CellContainer>
              )}
              {columns.map((col) => {
                const value = (row as Record<string, unknown>)[col.key]
                return (
                  <CellContainer key={col.key} role="cell" width={col.width} flex={col.width ? 0 : 1}>
                    {col.render ? (
                      col.render(value, row)
                    ) : (
                      <Text fontSize="$3" color="$color">
                        {String(value ?? '')}
                      </Text>
                    )}
                  </CellContainer>
                )
              })}
            </RowContainer>
          )
        })
      )}
    </YStack>
  )
}

export const DataTable = memo(DataTableInner) as typeof DataTableInner
