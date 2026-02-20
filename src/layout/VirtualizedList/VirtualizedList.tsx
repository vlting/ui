import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Text, YStack, styled } from 'tamagui'

// ─── Types ────────────────────────────────────────────────────────────────────

export type VirtualizedListProps<TItem = unknown> = {
  /** Data array to render */
  data: TItem[]
  /** Render function for each item */
  renderItem: (item: TItem, index: number) => React.ReactNode
  /** Unique key extractor */
  keyExtractor: (item: TItem, index: number) => string
  /** Estimated height per item for virtualization calculation */
  estimatedItemHeight?: number
  /** Number of items to render outside the visible area */
  overscan?: number
  /** Callback when user scrolls near the end */
  onEndReached?: () => void
  /** Distance from bottom to trigger onEndReached (0–1) */
  onEndReachedThreshold?: number
  /** Whether more items are being loaded */
  loading?: boolean
  /** Accessible label for the list container */
  accessibilityLabel?: string
  /** Empty state content */
  emptyContent?: React.ReactNode
  /** Container height in px */
  height?: number
  testID?: string
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const ListContainer = styled(YStack, {
  overflow: 'hidden',
  flex: 1,
})

const ItemWrapper = styled(YStack, {
  width: '100%',
})

// ─── Component ────────────────────────────────────────────────────────────────

function VirtualizedListInner<TItem = unknown>({
  data,
  renderItem,
  keyExtractor,
  estimatedItemHeight = 50,
  overscan = 5,
  onEndReached,
  onEndReachedThreshold = 0.8,
  loading = false,
  accessibilityLabel = 'List',
  emptyContent,
  height = 400,
  testID,
}: VirtualizedListProps<TItem>) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const endReachedRef = useRef(false)

  // Calculate visible window
  const visibleCount = Math.ceil(height / estimatedItemHeight)
  const startIndex = Math.max(0, Math.floor(scrollTop / estimatedItemHeight) - overscan)
  const endIndex = Math.min(data.length - 1, startIndex + visibleCount + overscan * 2)
  const totalHeight = data.length * estimatedItemHeight
  const offsetTop = startIndex * estimatedItemHeight

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement
      setScrollTop(target.scrollTop)

      // onEndReached
      const scrolledFraction = (target.scrollTop + target.clientHeight) / target.scrollHeight
      if (scrolledFraction >= onEndReachedThreshold && !endReachedRef.current) {
        endReachedRef.current = true
        onEndReached?.()
      } else if (scrolledFraction < onEndReachedThreshold) {
        endReachedRef.current = false
      }
    },
    [onEndReached, onEndReachedThreshold],
  )

  if (data.length === 0 && !loading) {
    return (
      <ListContainer
        accessible
        role="list"
        aria-label={accessibilityLabel}
        testID={testID}
      >
        {emptyContent ?? (
          <Text padding="$4" color="$colorSubtitle">No items</Text>
        )}
      </ListContainer>
    )
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height, overflow: 'auto', position: 'relative' }}
      role="list"
      aria-label={accessibilityLabel}
      data-testid={testID}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: offsetTop, left: 0, right: 0 }}>
          {data.slice(startIndex, endIndex + 1).map((item, localIndex) => {
            const absoluteIndex = startIndex + localIndex
            const key = keyExtractor(item, absoluteIndex)
            return (
              <div key={key} role="listitem" data-testid={`listitem-${key}`}>
                {renderItem(item, absoluteIndex)}
              </div>
            )
          })}
        </div>
      </div>

      {loading && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Loading more items"
          style={{ padding: 16, textAlign: 'center' }}
        >
          Loading...
        </div>
      )}
    </div>
  )
}

export const VirtualizedList = memo(VirtualizedListInner) as typeof VirtualizedListInner
