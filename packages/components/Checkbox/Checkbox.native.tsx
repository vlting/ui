import React, { forwardRef, useCallback, useState } from 'react'
import { View, Text as RNText, Pressable } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config/styled'

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const CheckboxBox = styled(
  View,
  {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: '$2',
  },
  {
    size: {
      sm: { width: 16, height: 16 },
      md: { width: 20, height: 20 },
      lg: { width: 24, height: 24 },
    },
  },
  'CheckboxBox',
)

const ICON_SIZE_MAP: Record<string, number> = { sm: 10, md: 12, lg: 16 }

// ---------------------------------------------------------------------------
// Checkmark / Indeterminate visuals (simple View-based)
// ---------------------------------------------------------------------------

function CheckmarkIcon({ size, color }: { size: number; color: string }) {
  // Simple "L" shape checkmark using Views
  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <RNText style={{ fontSize: size, lineHeight: size + 2, color, fontWeight: '700' }}>
        {'✓'}
      </RNText>
    </View>
  )
}

function MinusIcon({ size, color }: { size: number; color: string }) {
  return (
    <View
      style={{
        width: size * 0.7,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
  )
}

// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------

export interface CheckboxRootProps {
  children?: React.ReactNode
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  style?: ViewStyle
}

function Root({
  children,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = 'md',
  style,
}: CheckboxRootProps) {
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked)
  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked === true : internalChecked
  const isIndeterminate = checked === 'indeterminate'
  const isActive = isChecked || isIndeterminate

  const handlePress = useCallback(() => {
    if (disabled) return
    if (isIndeterminate) {
      onCheckedChange?.(true)
    } else {
      const next = isControlled ? !checked : !internalChecked
      if (!isControlled) setInternalChecked(next as boolean)
      onCheckedChange?.(next as boolean)
    }
  }, [disabled, isIndeterminate, isControlled, checked, internalChecked, onCheckedChange])

  const iconSize = ICON_SIZE_MAP[size]

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{
        checked: isIndeterminate ? 'mixed' : isChecked,
        disabled,
      }}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <CheckboxBox
        size={size}
        style={{
          borderColor: isActive ? '#007AFF' : '#999',
          backgroundColor: isActive ? '#007AFF' : 'transparent',
        }}
      >
        {isActive &&
          (isIndeterminate ? (
            <MinusIcon size={iconSize} color="#fff" />
          ) : (
            <CheckmarkIcon size={iconSize} color="#fff" />
          ))}
      </CheckboxBox>
      {children}
    </Pressable>
  )
}

function Indicator({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

export const Checkbox = { Root, Indicator }
