import type React from 'react'

export interface AspectRatioProps {
  ratio?: number
  children: React.ReactNode
  style?: React.CSSProperties
}

export function AspectRatio({ ratio = 1, children, style }: AspectRatioProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${100 / ratio}%`,
        ...style,
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {children}
      </div>
    </div>
  )
}
