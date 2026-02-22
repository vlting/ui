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

      const prev = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
      const next = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'

      switch (e.key) {
        case prev:
        case (orientation === 'both' ? 'ArrowUp' : ''):
        case (orientation === 'both' ? 'ArrowLeft' : ''):
          e.preventDefault()
          nextIndex = activeIndex - 1
          if (nextIndex < 0) nextIndex = loop ? items - 1 : 0
          break
        case next:
        case (orientation === 'both' ? 'ArrowDown' : ''):
        case (orientation === 'both' ? 'ArrowRight' : ''):
          e.preventDefault()
          nextIndex = activeIndex + 1
          if (nextIndex >= items) nextIndex = loop ? 0 : items - 1
          break
        case 'Home':
          e.preventDefault()
          nextIndex = 0
          break
        case 'End':
          e.preventDefault()
          nextIndex = items - 1
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          onSelect?.(activeIndex)
          return
        default:
          return
      }

      setActiveIndex(nextIndex)
    },
    [activeIndex, items, loop, onSelect, orientation, setActiveIndex],
  )

  return handleKeyDown
}
