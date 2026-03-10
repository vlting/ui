import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react'
import { View, Pressable, Animated } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config/styled'

// ---------------------------------------------------------------------------
// Size constants
// ---------------------------------------------------------------------------

const TRACK_SIZES = {
  sm: { width: 36, height: 20, padding: 2, thumbSize: 16 },
  md: { width: 44, height: 24, padding: 2, thumbSize: 20 },
  lg: { width: 52, height: 28, padding: 2, thumbSize: 24 },
} as const

// ---------------------------------------------------------------------------
// Switch
// ---------------------------------------------------------------------------

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  style?: ViewStyle
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = 'md',
  style,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isControlled = controlledChecked !== undefined
  const isChecked = isControlled ? controlledChecked : internalChecked

  const dims = TRACK_SIZES[size]
  const translateEnd = dims.width - dims.thumbSize - dims.padding * 2

  const translateX = useRef(new Animated.Value(isChecked ? translateEnd : 0)).current

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isChecked ? translateEnd : 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [isChecked, translateEnd, translateX])

  const handlePress = useCallback(() => {
    if (disabled) return
    const next = !isChecked
    if (!isControlled) setInternalChecked(next)
    onCheckedChange?.(next)
  }, [disabled, isChecked, isControlled, onCheckedChange])

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: isChecked, disabled }}
      style={[
        {
          width: dims.width,
          height: dims.height,
          borderRadius: dims.height / 2,
          padding: dims.padding,
          backgroundColor: isChecked ? '#007AFF' : '#999',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          width: dims.thumbSize,
          height: dims.thumbSize,
          borderRadius: dims.thumbSize / 2,
          backgroundColor: '#fff',
          transform: [{ translateX }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.18,
          shadowRadius: 1,
          elevation: 1,
        }}
      />
    </Pressable>
  )
}
