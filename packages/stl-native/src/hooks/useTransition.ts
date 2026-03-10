import { useState, useEffect, useRef } from 'react'
import { Animated } from 'react-native'

interface TransitionResult {
  active: boolean
  mounted: boolean
  style: { opacity: Animated.Value }
}

interface TransitionOptions {
  enter?: number
  exit?: number
}

export function useTransition(
  visible: boolean,
  options?: TransitionOptions,
): TransitionResult {
  const [mounted, setMounted] = useState(visible)
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current
  const enterDuration = options?.enter ?? 200
  const exitDuration = options?.exit ?? 200

  useEffect(() => {
    if (visible) {
      setMounted(true)
      Animated.timing(opacity, {
        toValue: 1,
        duration: enterDuration,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: exitDuration,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setMounted(false)
      })
    }
  }, [visible, enterDuration, exitDuration])

  return {
    active: visible,
    mounted,
    style: { opacity },
  }
}
