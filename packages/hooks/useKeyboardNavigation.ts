import { useCallback } from 'react'

interface UseKeyboardNavigationOptions {
  orientation?: 'horizontal' | 'vertical' | 'both'
  loop?: boolean
  onSelect?: (index: number) => void
}

/**
 * Keyboard navigation handler for lists/grids.
 * Returns a keyDown handler to attach to the container.
 */
export function useKeyboardNavigation(
  items: number,
  activeIndex: number,
  setActiveIndex: (index: number) => void,
  options: UseKeyboardNavigationOptions = {},
) {
  const { orientation = 'vertical', loop = true, onSelect } = options

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let nextIndex = activeIndex

      const isPrev =
        ((orientation === 'vertical' || orientation === 'both') && e.key === 'ArrowUp') ||
        ((orientation === 'horizontal' || orientation === 'both') && e.key === 'ArrowLeft')

      const isNext =
        ((orientation === 'vertical' || orientation === 'both') && e.key === 'ArrowDown') ||
        ((orientation === 'horizontal' || orientation === 'both') && e.key === 'ArrowRight')

      if (isPrev) {
        e.preventDefault()
        nextIndex = activeIndex - 1
        if (nextIndex < 0) nextIndex = loop ? items - 1 : 0
      } else if (isNext) {
        e.preventDefault()
        nextIndex = activeIndex + 1
        if (nextIndex >= items) nextIndex = loop ? 0 : items - 1
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextIndex = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        nextIndex = items - 1
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect?.(activeIndex)
        return
      } else {
        return
      }

      setActiveIndex(nextIndex)
    },
    [activeIndex, items, loop, onSelect, orientation, setActiveIndex],
  )

  return handleKeyDown
}
