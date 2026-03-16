import { useCallback, useEffect } from 'react'
import { announce as ariaAnnounce, clearAnnouncer } from './_adapters/react-aria'

export interface UseLiveRegionProps {
  /** Politeness level for screen reader */
  politeness?: 'polite' | 'assertive'
}

export interface UseLiveRegionReturn {
  /** Announce a message to screen readers */
  announce: (message: string, politeness?: 'polite' | 'assertive') => void
  /** Props for an explicit live region container (alternative to announce()) */
  getLiveRegionProps: () => {
    role: 'status' | 'alert'
    'aria-live': 'polite' | 'assertive'
    'aria-atomic': true
  }
}

export function useLiveRegion(props: UseLiveRegionProps = {}): UseLiveRegionReturn {
  const { politeness = 'polite' } = props

  useEffect(() => {
    return () => clearAnnouncer('polite')
  }, [])

  const announce = useCallback(
    (message: string, level?: 'polite' | 'assertive') => {
      ariaAnnounce(message, level ?? politeness)
    },
    [politeness],
  )

  const getLiveRegionProps = useCallback(
    () => ({
      role: (politeness === 'assertive' ? 'alert' : 'status') as 'status' | 'alert',
      'aria-live': politeness,
      'aria-atomic': true as const,
    }),
    [politeness],
  )

  return { announce, getLiveRegionProps }
}
