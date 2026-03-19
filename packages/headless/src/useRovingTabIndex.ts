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

  const findNextEnabled = useCallback(
    (start: number, direction: 1 | -1): number | null => {
      const disabled = disabledIndices ?? new Set<number>()
      let candidate = start
      for (let i = 0; i < count; i++) {
        candidate += direction
        if (loop) {
          candidate = ((candidate % count) + count) % count
        } else if (candidate < 0 || candidate >= count) {
          return null
        }
        if (!disabled.has(candidate)) return candidate
      }
      return null
    },
    [count, loop, disabledIndices],
  )

  const findFirstEnabled = useCallback((): number | null => {
    const disabled = disabledIndices ?? new Set<number>()
    for (let i = 0; i < count; i++) {
      if (!disabled.has(i)) return i
    }
    return null
  }, [count, disabledIndices])

  const findLastEnabled = useCallback((): number | null => {
    const disabled = disabledIndices ?? new Set<number>()
    for (let i = count - 1; i >= 0; i--) {
      if (!disabled.has(i)) return i
    }
    return null
  }, [count, disabledIndices])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const isVertical = orientation === 'vertical' || orientation === 'both'
      const isHorizontal = orientation === 'horizontal' || orientation === 'both'

      let nextIndex: number | null = null

      if ((e.key === 'ArrowDown' && isVertical) || (e.key === 'ArrowRight' && isHorizontal)) {
        e.preventDefault()
        nextIndex = findNextEnabled(activeIndex, 1)
      } else if ((e.key === 'ArrowUp' && isVertical) || (e.key === 'ArrowLeft' && isHorizontal)) {
        e.preventDefault()
        nextIndex = findNextEnabled(activeIndex, -1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextIndex = findFirstEnabled()
      } else if (e.key === 'End') {
        e.preventDefault()
        nextIndex = findLastEnabled()
      }

      if (nextIndex !== null) {
        moveTo(nextIndex)
      }
    },
    [activeIndex, orientation, moveTo, findNextEnabled, findFirstEnabled, findLastEnabled],
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
