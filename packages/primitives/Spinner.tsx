import type { ComponentType } from 'react'
import { View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC

const SIZE_MAP = {
  sm: 16,
  md: 20,
  lg: 28,
} as const

const SIZE_TOKEN: Record<string, number | string> = {
  sm: 16,
  md: '$1',
  lg: '$2',
}

const DOT_SIZE_MAP = {
  sm: 4,
  md: 5,
  lg: 6,
} as const

const DOT_SIZE_TOKEN: Record<string, number | string> = {
  sm: '$0.5',
  md: 5,
  lg: 6,
}

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export function Spinner({ size = 'md', color }: SpinnerProps) {
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
      style={{
        animation: 'vlting-spinner 1s linear infinite',
      }}
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
            borderRadius={9999}
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
