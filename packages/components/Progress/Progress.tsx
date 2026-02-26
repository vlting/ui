import { Progress as TamaguiProgress } from '@tamagui/progress'
import type { ComponentType } from 'react'

// Tamagui v2 RC GetProps bug — cast for JSX usage
const ProgressRoot = TamaguiProgress as ComponentType<Record<string, unknown>>
const ProgressIndicator = TamaguiProgress.Indicator as ComponentType<
  Record<string, unknown>
>

const SIZE_HEIGHT: Record<string, string | number> = { sm: '$0.5', md: '$0.75', lg: 12 }

export interface ProgressProps {
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  'aria-label'?: string
}

export function Progress({
  value = 0,
  max = 100,
  size = 'md',
  'aria-label': ariaLabel,
}: ProgressProps) {
  return (
    <ProgressRoot
      value={value}
      max={max}
      height={SIZE_HEIGHT[size]}
      backgroundColor="$color4"
      borderRadius="$10"
      overflow="hidden"
      width="100%"
      aria-label={ariaLabel}
    >
      <ProgressIndicator backgroundColor="$color10" borderRadius="$10" animation="fast" />
    </ProgressRoot>
  )
}
