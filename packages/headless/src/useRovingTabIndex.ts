import { useCallback, useRef } from 'react'

export interface UseRovingTabIndexProps {
  /** Number of items */
  count: number
  /** Currently active/focused index */
  activeIndex: number
  /** Callback when active index changes */
  onActiveIndexChange: (index: number) => void
  /** Navigation axis */
  orientation?: 'horizontal' | 'vertical' | 'both'
  /** Wrap around at boundaries */
  loop?: boolean
  /** Indices of disabled items to skip during navigation */
  disabledIndices?: Set<number>
}

export interface UseRovingTabIndexReturn {
  getContainerProps: () => {
    ref: React.RefObject<HTMLElement | null>
    onKeyDown: (e: React.KeyboardEvent) => void
  }
  getItemProps: (index: number) => {
    tabIndex: 0 | -1
    onFocus: () => void
    'data-roving-item': ''
  }
}

export function useRovingTabIndex(props: UseRovingTabIndexProps): UseRovingTabIndexReturn {
  const { count, activeIndex, onActiveIndexChange, orientation = 'vertical', loop = true, disabledIndices } = props
  const containerRef = useRef<HTMLElement>(null)

  const focusItem = useCallback(
    (index: number) => {
      if (!containerRef.current) return
      const items = containerRef.current.querySelectorAll<HTMLElement>('[data-roving-item]')
      items[index]?.focus()
    },
    [],
  )

  const moveTo = useCallback(
    (index: number) => {
      onActiveIndexChange(index)
      focusItem(index)
    },
    [onActiveIndexChange, focusItem],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!containerRef.current) return
      const isVertical = orientation === 'vertical' || orientation === 'both'
      const isHorizontal = orientation === 'horizontal' || orientation === 'both'

      // Derive current index from DOM to avoid stale closure state
      const items = containerRef.current.querySelectorAll<HTMLElement>('[data-roving-item]')
      const itemCount = items.length
      let currentIndex = activeIndex
      for (let i = 0; i < itemCount; i++) {
        if (items[i] === document.activeElement) { currentIndex = i; break }
      }

      const disabled = disabledIndices ?? new Set<number>()

      const findNext = (start: number, dir: 1 | -1): number | null => {
        let candidate = start
        for (let i = 0; i < itemCount; i++) {
          candidate += dir
          if (loop) {
            candidate = ((candidate % itemCount) + itemCount) % itemCount
          } else if (candidate < 0 || candidate >= itemCount) {
            return null
          }
          if (!disabled.has(candidate)) return candidate
        }
        return null
      }

      const findFirst = (): number | null => {
        for (let i = 0; i < itemCount; i++) {
          if (!disabled.has(i)) return i
        }
        return null
      }

      const findLast = (): number | null => {
        for (let i = itemCount - 1; i >= 0; i--) {
          if (!disabled.has(i)) return i
        }
        return null
      }

      let nextIndex: number | null = null

      if ((e.key === 'ArrowDown' && isVertical) || (e.key === 'ArrowRight' && isHorizontal)) {
        e.preventDefault()
        nextIndex = findNext(currentIndex, 1)
      } else if ((e.key === 'ArrowUp' && isVertical) || (e.key === 'ArrowLeft' && isHorizontal)) {
        e.preventDefault()
        nextIndex = findNext(currentIndex, -1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextIndex = findFirst()
      } else if (e.key === 'End') {
        e.preventDefault()
        nextIndex = findLast()
      }

      if (nextIndex !== null) {
        moveTo(nextIndex)
      }
    },
    [activeIndex, orientation, loop, disabledIndices, moveTo],
  )

  const getContainerProps = useCallback(
    () => ({
      ref: containerRef,
      onKeyDown: handleKeyDown,
    }),
    [handleKeyDown],
  )

  const getItemProps = useCallback(
    (index: number) => ({
      tabIndex: (index === activeIndex ? 0 : -1) as 0 | -1,
      onFocus: () => onActiveIndexChange(index),
      'data-roving-item': '' as const,
    }),
    [activeIndex, onActiveIndexChange],
  )

  return { getContainerProps, getItemProps }
}
