import { useCallback, useState } from 'react'

export interface UseClipboardReturn {
  copy: (text: string) => Promise<void>
  copied: boolean
}

/**
 * Copy text to the clipboard with a temporary success state.
 *
 * @param timeout - How long `copied` stays `true` (default 2000ms)
 */
export function useClipboard(timeout = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string) => {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), timeout)
    },
    [timeout],
  )

  return { copy, copied }
}
