import { useEffect, useState } from 'react'

/**
 * Debounce a value by a given delay.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default 300)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
