import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import { Text, XStack, YStack, styled } from 'tamagui'

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc' | 'none'

export type DataGridColumn<TRow = Record<string, unknown>> = {
  key: string
  header: string
  render?: (value: unknown, row: TRow) => React.ReactNode
  sortable?: boolean
  width?: number | string
  minWidth?: number
}

export type DataGridProps<TRow = Record<string, unknown>> = {
  /** Column definitions */
  columns: DataGridColumn<TRow>[]
  /** Row data */
  data: TRow[]
  /** Unique key extractor */
  keyExtractor: (row: TRow) => string
  /** Controlled sort key */
  sortKey?: string
  /** Controlled sort direction */
  sortDirection?: SortDirection
  /** Callback when sort changes */
  onSort?: (key: string, direction: SortDirection) => void
  /** Whether rows are selectable */
  selectable?: boolean
  /** Selected row keys (controlled) */
  selectedKeys?: string[]
  /** Callback when selection changes */
  onSelectionChange?: (keys: string[]) => void
  /** Whether to enable virtualized rendering */
  virtualized?: boolean
  /** Estimated item height for virtualization */
  estimatedRowHeight?: number
  /** Whether data is loading */
  loading?: boolean
  /** Empty state label */
  emptyLabel?: string
  testID?: string
}

// ─── Virtualized visible range ─────────────────────────────────────────────────

function useVirtualizedRows<TRow>(
  data: TRow[],
  estimatedRowHeight: number,
  containerHeight: number,
  scrollTop: number,
  overscan = 5,
) {
  const visibleCount = Math.ceil(containerHeight / estimatedRowHeight)
  const startIndex = Math.max(0, Math.floor(scrollTop / estimatedRowHeight) - overscan)
  const endIndex = Math.min(data.length - 1, startIndex + visibleCount + overscan * 2)
  const visibleData = data.slice(startIndex, endIndex + 1)
  const totalHeight = data.length * estimatedRowHeight
  const offsetTop = startIndex * estimatedRowHeight

  return { visibleData, startIndex, totalHeight, offsetTop }
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const HeaderCell = styled(XStack, {
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  alignItems: 'center',
  gap: '$1',
  flex: 1,
  borderRightWidth: 1,
  borderRightColor: '$borderColor',
  backgroundColor: '$backgroundStrong',
  cursor: 'default',
})

const GridCell = styled(XStack, {
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  alignItems: 'center',
  flex: 1,
  borderRightWidth: 1,
  borderRightColor: '$borderColor',
  overflow: 'hidden',
})

const GridRow = styled(XStack, {
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  alignItems: 'stretch',

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  variants: {
    selected: {
      true: { backgroundColor: '$backgroundPress' },
    },
  } as const,
})

// ─── Component ────────────────────────────────────────────────────────────────

function DataGridInner<TRow = Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  sortKey: sortKeyProp,
  sortDirection: sortDirectionProp,
  onSort,
  selectable = false,
  selectedKeys: selectedKeysProp,
  onSelectionChange,
  virtualized = false,
  estimatedRowHeight = 40,
  loading = false,
  emptyLabel = 'No data available.',
  testID,
}: DataGridProps<TRow>) {
  const isSortControlled = sortKeyProp !== undefined
  const isSelectionControlled = selectedKeysProp !== undefined

  const [internalSortKey, setInternalSortKey] = useState<string | undefined>()
  const [internalSortDir, setInternalSortDir] = useState<SortDirection>('none')
  const [internalSelected, setInternalSelected] = useState<string[]>([])
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const containerHeight = 400 // fallback height for virtualization

  const activeSortKey = isSortControlled ? sortKeyProp : internalSortKey
  const activeSortDir = isSortControlled ? (sortDirectionProp ?? 'none') : internalSortDir
  const activeSelected = isSelectionControlled ? (selectedKeysProp ?? []) : internalSelected

  const ariaSortMap: Record<SortDirection, 'ascending' | 'descending' | 'none'> = {
    asc: 'ascending',
    desc: 'descending',
    none: 'none',
  }

  const handleHeaderPress = useCallback(
    (key: string) => {
      const col = columns.find((c) => c.key === key)
      if (!col?.sortable) return
      let nextDir: SortDirection = 'asc'
      if (activeSortKey === key) {
        nextDir = activeSortDir === 'asc' ? 'desc' : 'asc'
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

  const { visibleData, startIndex, totalHeight, offsetTop } = useVirtualizedRows(
    data,
    estimatedRowHeight,
    containerHeight,
    scrollTop,
  )

  const rowsToRender = virtualized ? visibleData : data

  return (
    <YStack
      testID={testID}
      overflow="hidden"
      role="grid"
      aria-rowcount={data.length}
      aria-colcount={columns.length + (selectable ? 1 : 0)}
    >
      {/* Header */}
      <XStack role="row" borderBottomWidth={1} borderBottomColor="$borderColor">
        {selectable && (
          <HeaderCell width={40} flex={0}>
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
          </HeaderCell>
        )}
        {columns.map((col) => (
          <HeaderCell
            key={col.key}
            role="columnheader"
            aria-sort={
              col.sortable
                ? activeSortKey === col.key
                  ? ariaSortMap[activeSortDir]
                  : 'none'
                : undefined
            }
            width={col.width}
            flex={col.width ? 0 : 1}
            onPress={() => handleHeaderPress(col.key)}
            cursor={col.sortable ? 'pointer' : 'default'}
          >
            <Text fontSize="$2" fontWeight="600" color="$color">
              {col.header}
            </Text>
            {col.sortable && activeSortKey === col.key && (
              <Text aria-hidden="true" fontSize="$1">
                {activeSortDir === 'asc' ? '↑' : '↓'}
              </Text>
            )}
          </HeaderCell>
        ))}
      </XStack>

      {/* Body */}
      {loading ? (
        <YStack padding="$4">
          <Text color="$colorSubtitle">Loading...</Text>
        </YStack>
      ) : data.length === 0 ? (
        <YStack padding="$4" testID="datagrid-empty">
          <Text color="$colorSubtitle">{emptyLabel}</Text>
        </YStack>
      ) : (
        <YStack
          position="relative"
          height={virtualized ? containerHeight : undefined}
          overflow={virtualized ? 'hidden' : undefined}
        >
          {virtualized && (
            <YStack height={totalHeight} position="relative">
              <YStack position="absolute" top={offsetTop} left={0} right={0}>
                {rowsToRender.map((row, localIndex) => {
                  const key = keyExtractor(row)
                  const absoluteIndex = startIndex + localIndex
                  const isSelected = activeSelected.includes(key)
                  return renderRow(row, key, absoluteIndex, isSelected, columns, selectable, handleRowSelect)
                })}
              </YStack>
            </YStack>
          )}
          {!virtualized &&
            rowsToRender.map((row, index) => {
              const key = keyExtractor(row)
              const isSelected = activeSelected.includes(key)
              return renderRow(row, key, index, isSelected, columns, selectable, handleRowSelect)
            })}
        </YStack>
      )}
    </YStack>
  )
}

function renderRow<TRow>(
  row: TRow,
  key: string,
  rowIndex: number,
  isSelected: boolean,
  columns: DataGridColumn<TRow>[],
  selectable: boolean,
  handleRowSelect: (key: string) => void,
) {
  return (
    <GridRow
      key={key}
      role="row"
      aria-rowindex={rowIndex + 2} // 1-based, +1 for header
      aria-selected={selectable ? isSelected : undefined}
      selected={isSelected}
      testID={`row-${key}`}
    >
      {selectable && (
        <GridCell width={40} flex={0} role="gridcell">
          <input
            type="checkbox"
            aria-label={`Select row ${key}`}
            checked={isSelected}
            onChange={() => handleRowSelect(key)}
          />
        </GridCell>
      )}
      {columns.map((col) => {
        const value = (row as Record<string, unknown>)[col.key]
        return (
          <GridCell key={col.key} role="gridcell" width={col.width} flex={col.width ? 0 : 1}>
            {col.render ? (
              col.render(value, row)
            ) : (
              <Text fontSize="$3" color="$color" numberOfLines={1}>
                {String(value ?? '')}
              </Text>
            )}
          </GridCell>
        )
      })}
    </GridRow>
  )
}

export const DataGrid = memo(DataGridInner) as typeof DataGridInner
