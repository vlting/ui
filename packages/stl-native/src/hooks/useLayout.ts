import { useCallback } from 'react'
import type { LayoutChangeEvent } from 'react-native'

// On native, layout measurement uses onLayout — no ref needed.
// The _ref parameter is kept for API consistency with the web version
// (which uses ref + ResizeObserver). Consumers should spread { onLayout } onto their View.
export function useLayout(
  _ref: unknown,
  callback: (size: { width: number; height: number }) => void,
): { onLayout: (e: LayoutChangeEvent) => void } {
  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout
      callback({ width, height })
    },
    [callback],
  )

  return { onLayout }
}
