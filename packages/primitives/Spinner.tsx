import type { ComponentType } from 'react'
import { View } from 'tamagui'
import { useReducedMotion } from '../hooks/useReducedMotion'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC

const SIZE_MAP = {
  sm: 20,
  md: 20,
  lg: 28,
} as const

const SIZE_TOKEN: Record<string, number | string> = {
  sm: '$1',
  md: '$1',
  lg: '$2',
}

const DOT_SIZE_MAP = {
  sm: 4,
  md: 4,
  lg: 8,
} as const

const DOT_SIZE_TOKEN: Record<string, number | string> = {
  sm: '$0.5',
  md: '$0.5',
  lg: '$0.75',
}

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export function Spinner({ size = 'md', color }: SpinnerProps) {
  const reducedMotion = useReducedMotion()
  const dimension = SIZE_MAP[size]
  const dotSize = DOT_SIZE_MAP[size]
  const r = dimension / 2

  return (
    <ViewJsx
      role="status"
      aria-label="Loading"
      width={SIZE_TOKEN[size]}
      height={SIZE_TOKEN[size]}
      position="relative"
      style={
        reducedMotion ? undefined : { animation: 'vlting-spinner 1s linear infinite' }
      }
    >
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i * 360) / 8
        const rad = (angle * Math.PI) / 180
        const x = r + (r - dotSize / 2) * Math.sin(rad) - dotSize / 2
        const y = r - (r - dotSize / 2) * Math.cos(rad) - dotSize / 2

        return (
          <ViewJsx
            key={i}
            position="absolute"
            borderRadius="$full"
            backgroundColor={color ?? '$color'}
            opacity={0.15 + (i / 8) * 0.85}
            width={DOT_SIZE_TOKEN[size]}
            height={DOT_SIZE_TOKEN[size]}
            style={{ left: x, top: y }}
          />
        )
      })}
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes vlting-spinner { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`,
        }}
      />
    </ViewJsx>
  )
}
