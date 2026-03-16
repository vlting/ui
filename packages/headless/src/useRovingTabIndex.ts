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
  const { count, activeIndex, onActiveIndexChange, orientation = 'vertical', loop = true } = props
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
      const isVertical = orientation === 'vertical' || orientation === 'both'
      const isHorizontal = orientation === 'horizontal' || orientation === 'both'

      let nextIndex: number | null = null

      if ((e.key === 'ArrowDown' && isVertical) || (e.key === 'ArrowRight' && isHorizontal)) {
        e.preventDefault()
        if (activeIndex < count - 1) {
          nextIndex = activeIndex + 1
        } else if (loop) {
          nextIndex = 0
        }
      } else if ((e.key === 'ArrowUp' && isVertical) || (e.key === 'ArrowLeft' && isHorizontal)) {
        e.preventDefault()
        if (activeIndex > 0) {
          nextIndex = activeIndex - 1
        } else if (loop) {
          nextIndex = count - 1
        }
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextIndex = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        nextIndex = count - 1
      }

      if (nextIndex !== null) {
        moveTo(nextIndex)
      }
    },
    [activeIndex, count, orientation, loop, moveTo],
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
