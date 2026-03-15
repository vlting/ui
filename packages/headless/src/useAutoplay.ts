import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseAutoplayProps {
  interval?: number
  enabled?: boolean
  onTick: () => void
}

export interface UseAutoplayReturn {
  isPlaying: boolean
  play: () => void
  pause: () => void
  toggle: () => void
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

export function useAutoplay({
  interval = 5000,
  enabled = true,
  onTick,
}: UseAutoplayProps): UseAutoplayReturn {
  const reducedMotion = usePrefersReducedMotion()
  const [manualPause, setManualPause] = useState(false)
  const tickRef = useRef(onTick)
  tickRef.current = onTick

  const isPlaying = enabled && !manualPause && !reducedMotion

  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => tickRef.current(), interval)
    return () => clearInterval(id)
  }, [isPlaying, interval])

  const play = useCallback(() => setManualPause(false), [])
  const pause = useCallback(() => setManualPause(true), [])
  const toggle = useCallback(() => setManualPause((p) => !p), [])

  return { isPlaying, play, pause, toggle }
}
