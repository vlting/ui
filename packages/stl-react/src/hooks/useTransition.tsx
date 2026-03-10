import type { CSSProperties } from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'

interface TransitionOptions {
  enter?: number
  exit?: number
}

interface TransitionResult {
  active: boolean
  mounted: boolean
  style: CSSProperties
}

export function useTransition(
  visible: boolean,
  options?: TransitionOptions,
): TransitionResult {
  const { enter = 300, exit = 300 } = options ?? {}
  const [mounted, setMounted] = useState(visible)
  const [active, setActive] = useState(visible)
  const exitTimer = useRef<ReturnType<typeof setTimeout>>()
  const enterFrame = useRef<number>()

  useEffect(() => {
    if (visible) {
      // Mount at opacity 0, then double-rAF to ensure the browser
      // paints the initial state before transitioning to opacity 1
      setMounted(true)
      enterFrame.current = requestAnimationFrame(() => {
        enterFrame.current = requestAnimationFrame(() => {
          setActive(true)
        })
      })
    } else {
      setActive(false)
      exitTimer.current = setTimeout(() => {
        setMounted(false)
      }, exit)
    }

    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current)
      if (enterFrame.current) cancelAnimationFrame(enterFrame.current)
    }
  }, [visible, exit])

  const getStyle = useCallback((): CSSProperties => {
    const duration = active ? enter : exit
    return {
      opacity: active ? 1 : 0,
      transition: `opacity ${duration}ms ease`,
    }
  }, [active, enter, exit])

  return {
    active,
    mounted,
    style: getStyle(),
  }
}
