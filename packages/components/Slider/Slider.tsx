import React, { useCallback, useRef } from 'react'
import { View, XStack, styled } from 'tamagui'

const BIG_STEP_FACTOR = 10

// @ts-expect-error Tamagui v2 RC
const SliderTrack = styled(XStack, {
  backgroundColor: '$color4',
  borderRadius: '$6',
  position: 'relative',
  alignItems: 'center',
  cursor: 'pointer',

  hoverStyle: {
    backgroundColor: '$color5',
  },

  variants: {
    size: {
      sm: { height: 4 },
      md: { height: 6 },
      lg: { height: 8 },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const SliderRange = styled(View, {
  backgroundColor: '$color10',
  borderRadius: '$6',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
})

// @ts-expect-error Tamagui v2 RC
const SliderThumb = styled(View, {
  backgroundColor: '$background',
  borderWidth: 2,
  borderColor: '$color10',
  borderRadius: 1000,
  position: 'absolute',
  top: '50%',
  cursor: 'grab',

  focusStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },

  variants: {
    size: {
      sm: { width: 14, height: 14, marginTop: -7 },
      md: { width: 18, height: 18, marginTop: -9 },
      lg: { width: 22, height: 22, marginTop: -11 },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

export interface SliderProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number) => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  'aria-label'?: string
}

export function Slider({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  size = 'md',
  disabled,
  'aria-label': ariaLabel,
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const value = controlledValue ?? internalValue
  const trackRef = useRef<HTMLDivElement>(null)

  const percentage = ((value - min) / (max - min)) * 100
  const thumbSizes = { sm: 14, md: 18, lg: 22 }
  const thumbSize = thumbSizes[size]

  const updateValue = useCallback(
    (clientX: number) => {
      const track = trackRef.current
      if (!track || disabled) return
      const rect = track.getBoundingClientRect()
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      const raw = min + ratio * (max - min)
      const stepped = Math.round(raw / step) * step
      const clamped = Math.max(min, Math.min(max, stepped))
      setInternalValue(clamped)
      onValueChange?.(clamped)
    },
    [disabled, min, max, step, onValueChange],
  )

  const clamp = (v: number) => Math.max(min, Math.min(max, v))

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return
    updateValue(e.clientX)
    const handleMove = (ev: PointerEvent) => updateValue(ev.clientX)
    const handleUp = () => {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerup', handleUp)
    }
    document.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerup', handleUp)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    let next: number | null = null
    const bigStep = step * BIG_STEP_FACTOR
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = clamp(value + step)
        break
      case 'ArrowLeft':
      case 'ArrowDown':
        next = clamp(value - step)
        break
      case 'PageUp':
        next = clamp(value + bigStep)
        break
      case 'PageDown':
        next = clamp(value - bigStep)
        break
      case 'Home':
        next = min
        break
      case 'End':
        next = max
        break
      default:
        return
    }
    e.preventDefault()
    setInternalValue(next)
    onValueChange?.(next)
  }

  return (
    // @ts-expect-error Tamagui v2 RC
    <SliderTrack
      ref={trackRef}
      size={size}
      disabled={disabled}
      onPointerDown={handlePointerDown}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <SliderRange width={`${percentage}%`} />
      {/* @ts-expect-error Tamagui v2 RC */}
      <SliderThumb
        size={size}
        left={`${percentage}%`}
        marginLeft={-(thumbSize / 2)}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-disabled={disabled || undefined}
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
      />
    </SliderTrack>
  )
}
