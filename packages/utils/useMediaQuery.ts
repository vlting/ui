import { useEffect, useState } from 'react'

/**
 * Subscribe to a CSS media query and re-render when it changes.
 *
 * @param query - A valid CSS media query string, e.g. `(min-width: 768px)`
 * @returns `true` when the query matches, `false` otherwise
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}
