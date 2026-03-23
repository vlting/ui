import { useCallback } from 'react'

export type { UseRovingTabIndexProps } from './useRovingTabIndex'

export interface UseRovingTabIndexNativeReturn {
  getContainerProps: () => Record<string, never>
  getItemProps: (index: number) => {
    isActive: boolean
    onPress: () => void
  }
}

export function useRovingTabIndex(props: {
  count: number
  activeIndex: number
  onActiveIndexChange: (index: number) => void
  orientation?: 'horizontal' | 'vertical' | 'both'
  loop?: boolean
  disabledIndices?: Set<number>
}): UseRovingTabIndexNativeReturn {
  const { count, activeIndex, onActiveIndexChange, loop = true, disabledIndices } = props

  const disabled = disabledIndices ?? new Set<number>()

  const findNext = useCallback(
    (start: number, dir: 1 | -1): number | null => {
      let candidate = start
      for (let i = 0; i < count; i++) {
        candidate += dir
        if (loop) {
          candidate = ((candidate % count) + count) % count
        } else if (candidate < 0 || candidate >= count) {
          return null
        }
        if (!disabled.has(candidate)) return candidate
      }
      return null
    },
    [count, loop, disabled],
  )

  const getContainerProps = useCallback(() => ({}) as Record<string, never>, [])

  const getItemProps = useCallback(
    (index: number) => ({
      isActive: index === activeIndex,
      onPress: () => {
        if (!disabled.has(index)) {
          onActiveIndexChange(index)
        }
      },
    }),
    [activeIndex, onActiveIndexChange, disabled],
  )

  return { getContainerProps, getItemProps }
}
