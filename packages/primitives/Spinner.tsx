import type { CSSProperties } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const SIZE_MAP = { sm: 20, md: 20, lg: 28 } as const
const DOT_SIZE_MAP = { sm: 4, md: 4, lg: 8 } as const

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export function Spinner({ size = 'md', color }: SpinnerProps) {
  const reducedMotion = useReducedMotion()
  const dimension = SIZE_MAP[size]
  const dotSize = DOT_SIZE_MAP[size]
  const r = dimension / 2

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: dimension,
    height: dimension,
    ...(reducedMotion ? {} : { animation: 'vlting-spinner 1s linear infinite' }),
  }

  return (
    <div role="status" aria-label="Loading" style={containerStyle}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i * 360) / 8
        const rad = (angle * Math.PI) / 180
        const x = r + (r - dotSize / 2) * Math.sin(rad) - dotSize / 2
        const y = r - (r - dotSize / 2) * Math.cos(rad) - dotSize / 2

        const dotStyle: CSSProperties = {
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: color ?? 'currentColor',
          opacity: 0.15 + (i / 8) * 0.85,
          width: dotSize,
          height: dotSize,
          left: x,
          top: y,
        }

        return <div key={i} style={dotStyle} />
      })}
      <style
        dangerouslySetInnerHTML={{
          __html:
            '@keyframes vlting-spinner { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
        }}
      />
    </div>
  )
}
