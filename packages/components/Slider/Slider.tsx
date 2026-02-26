import { Slider as TamaguiSlider } from '@tamagui/slider'
import type { ComponentType } from 'react'

// Tamagui v2 RC GetProps bug — cast for JSX usage
const SliderRoot = TamaguiSlider as ComponentType<Record<string, unknown>>
const SliderTrack = TamaguiSlider.Track as ComponentType<Record<string, unknown>>
const SliderTrackActive = TamaguiSlider.TrackActive as ComponentType<
  Record<string, unknown>
>
const SliderThumb = TamaguiSlider.Thumb as ComponentType<Record<string, unknown>>

const SIZE_MAP = { sm: '$2' as const, md: '$3' as const, lg: '$4' as const }

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
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  size = 'md',
  disabled,
  'aria-label': ariaLabel,
}: SliderProps) {
  const handleValueChange = (values: number[]) => {
    onValueChange?.(values[0])
  }

  return (
    <SliderRoot
      value={value !== undefined ? [value] : undefined}
      defaultValue={[defaultValue]}
      min={min}
      max={max}
      step={step}
      onValueChange={handleValueChange}
      disabled={disabled}
      size={SIZE_MAP[size]}
      aria-label={ariaLabel}
    >
      <SliderTrack backgroundColor="$color4" borderRadius="$6">
        <SliderTrackActive backgroundColor="$color10" borderRadius="$6" />
      </SliderTrack>
      <SliderThumb
        index={0}
        circular
        backgroundColor="$background"
        borderWidth={2}
        borderColor="$color10"
      />
    </SliderRoot>
  )
}
