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
  getListProps: () => {
    role: 'listbox'
    onKeyDown: (e: React.KeyboardEvent) => void
  }
  getItemProps: (index: number) => {
    role: 'option'
    'aria-selected': boolean
    onHoverIn: () => void
    onPress: () => void
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
      role: 'option' as const,
      'aria-selected': index === highlightIndex,
      onHoverIn: () => setHighlightIndex(index),
      onPress: () => {
        const item = items[index]
        if (item !== undefined) {
          onSelect?.(item, index)
        }
      },
    }),
    [highlightIndex, items, onSelect],
  )

  const getListProps = useCallback(
    () => ({
      role: 'listbox' as const,
      onKeyDown,
    }),
    [onKeyDown],
  )

  return {
    highlightIndex,
    highlightedItem,
    setHighlightIndex,
    getListProps,
    getItemProps,
    onKeyDown,
  }
}
