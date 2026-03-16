import { useCallback, useRef } from 'react'

export interface UseTypeaheadProps {
  /** Items to search through */
  items: string[]
  /** Called when a match is found */
  onMatch: (index: number) => void
  /** Timeout before buffer clears (ms) */
  timeout?: number
}

export interface UseTypeaheadReturn {
  getTypeaheadProps: () => {
    onKeyDown: (e: React.KeyboardEvent) => void
  }
  /** Imperatively clear the buffer */
  clearBuffer: () => void
}

export function useTypeahead(props: UseTypeaheadProps): UseTypeaheadReturn {
  const { items, onMatch, timeout = 500 } = props
  const bufferRef = useRef('')
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const onMatchRef = useRef(onMatch)
  onMatchRef.current = onMatch

  const clearBuffer = useCallback(() => {
    bufferRef.current = ''
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return

      // Clear previous timer
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      bufferRef.current += e.key
      const search = bufferRef.current.toLowerCase()
      const matchIndex = items.findIndex((item) => item.toLowerCase().startsWith(search))

      if (matchIndex !== -1) {
        onMatchRef.current(matchIndex)
      }

      // Reset timer
      timerRef.current = setTimeout(() => {
        bufferRef.current = ''
        timerRef.current = undefined
      }, timeout)
    },
    [items, timeout],
  )

  const getTypeaheadProps = useCallback(
    () => ({
      onKeyDown: handleKeyDown,
    }),
    [handleKeyDown],
  )

  return { getTypeaheadProps, clearBuffer }
}
