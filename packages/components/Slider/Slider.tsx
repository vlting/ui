import React, { useCallback, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const SliderRoot = styled(
  'div',
  {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    touchAction: 'none',
    userSelect: 'none',
  },
  {
    size: {
      sm: { height: '20px' },
      md: { height: '24px' },
      lg: { height: '28px' },
    },
    disabled: {
      true: { opacity: '0.5', pointerEvents: 'none' },
    },
  },
  'Slider',
)

const SliderTrack = styled(
  'div',
  {
    position: 'relative',
    width: '100%',
    borderRadius: '9999px',
    backgroundColor: 'var(--color4)',
    overflow: 'hidden',
  },
  {
    size: {
      sm: { height: '4px' },
      md: { height: '6px' },
      lg: { height: '8px' },
    },
  },
  'SliderTrack',
)

const SliderRange = styled(
  'div',
  {
    position: 'absolute',
    height: '100%',
    backgroundColor: 'var(--color10)',
    borderRadius: '9999px',
  },
  'SliderRange',
)

const SliderThumb = styled(
  'div',
  {
    position: 'absolute',
    top: '50%',
    borderRadius: '9999px',
    backgroundColor: 'var(--background, #fff)',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'var(--color10)',
    cursor: 'pointer',
    transform: 'translate(-50%, -50%)',
  },
  {
    size: {
      sm: { width: '16px', height: '16px' },
      md: { width: '20px', height: '20px' },
      lg: { width: '24px', height: '24px' },
    },
  },
  'SliderThumb',
)

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
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const percentage = ((currentValue - min) / (max - min)) * 100

  const updateValue = useCallback(
    (clientX: number) => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      const raw = min + ratio * (max - min)
      const stepped = Math.round(raw / step) * step
      const clamped = Math.max(min, Math.min(max, stepped))
      if (!isControlled) setInternalValue(clamped)
      onValueChange?.(clamped)
    },
    [min, max, step, isControlled, onValueChange],
  )

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return
    dragging.current = true
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    updateValue(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    updateValue(e.clientX)
  }

  const handlePointerUp = () => {
    dragging.current = false
  }

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return
      let newValue = currentValue
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault()
          newValue = Math.min(max, currentValue + step)
          break
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault()
          newValue = Math.max(min, currentValue - step)
          break
        case 'Home':
          e.preventDefault()
          newValue = min
          break
        case 'End':
          e.preventDefault()
          newValue = max
          break
        default:
          return
      }
      if (!isControlled) setInternalValue(newValue)
      onValueChange?.(newValue)
    },
    [disabled, currentValue, min, max, step, isControlled, onValueChange],
  )

  return (
    <SliderRoot
      size={size}
      disabled={disabled ? true : undefined}
      role="slider"
      aria-valuenow={currentValue}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={ariaLabel}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      <SliderTrack ref={trackRef} size={size}>
        <SliderRange style={{ width: `${percentage}%` }} />
      </SliderTrack>
      <SliderThumb size={size} style={{ left: `${percentage}%` }} />
    </SliderRoot>
  )
}
