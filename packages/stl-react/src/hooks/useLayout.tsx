import type { RefObject } from 'react'
import { useCallback, useEffect, useMemo } from 'react'
import { getRefElement, isSSR } from '../shared/utils'

export function useLayout(
  ref: RefObject<any> | Element | null,
  callback: (size: { width: number; height: number }) => void,
): void {
  const stableCallback = useCallback(callback, [callback])

  const observer = useMemo(
    () =>
      !isSSR
        ? new ResizeObserver((entries) => {
            for (const entry of entries) {
              stableCallback({
                width: entry.contentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width,
                height: entry.contentBoxSize?.[0]?.blockSize ?? entry.contentRect.height,
              })
            }
          })
        : null,
    [stableCallback],
  )

  useEffect(() => {
    const element = getRefElement(ref)
    if (observer && element) {
      try {
        observer.observe(element, { box: 'content-box' })
      } catch (_error) {
        return () => undefined
      }
      return () => observer.disconnect()
    }
    return undefined
  }, [ref, observer])
}
