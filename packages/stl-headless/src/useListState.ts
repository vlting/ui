import type React from 'react'
import { useCallback, useState } from 'react'

export interface UseListStateProps<T> {
  items: T[]
  defaultHighlightIndex?: number
  onSelect?: (item: T, index: number) => void
  loop?: boolean
}

export interface UseListStateReturn<T> {
  highlightIndex: number
  highlightedItem: T | undefined
  setHighlightIndex: (index: number) => void
  getItemProps: (index: number) => {
    'aria-selected': boolean
    onMouseEnter: () => void
    onClick: () => void
  }
  onKeyDown: (e: React.KeyboardEvent) => void
}

export function useListState<T>(props: UseListStateProps<T>): UseListStateReturn<T> {
  const { items, defaultHighlightIndex = 0, onSelect, loop = false } = props
  const [highlightIndex, setHighlightIndex] = useState(defaultHighlightIndex)

  const highlightedItem = items[highlightIndex]

  const moveHighlight = useCallback(
    (delta: number) => {
      setHighlightIndex((prev) => {
        const next = prev + delta
        if (loop) {
          if (next < 0) return items.length - 1
          if (next >= items.length) return 0
          return next
        }
        return Math.max(0, Math.min(items.length - 1, next))
      })
    },
    [items.length, loop],
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          moveHighlight(1)
          break
        case 'ArrowUp':
          e.preventDefault()
          moveHighlight(-1)
          break
        case 'Home':
          e.preventDefault()
          setHighlightIndex(0)
          break
        case 'End':
          e.preventDefault()
          setHighlightIndex(items.length - 1)
          break
        case 'Enter': {
          e.preventDefault()
          const item = items[highlightIndex]
          if (item !== undefined) {
            onSelect?.(item, highlightIndex)
          }
          break
        }
      }
    },
    [moveHighlight, items, highlightIndex, onSelect],
  )

  const getItemProps = useCallback(
    (index: number) => ({
      'aria-selected': index === highlightIndex,
      onMouseEnter: () => setHighlightIndex(index),
      onClick: () => {
        const item = items[index]
        if (item !== undefined) {
          onSelect?.(item, index)
        }
      },
    }),
    [highlightIndex, items, onSelect],
  )

  return {
    highlightIndex,
    highlightedItem,
    setHighlightIndex,
    getItemProps,
    onKeyDown,
  }
}
