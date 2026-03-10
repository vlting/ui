import { type CSSProperties, forwardRef, type ReactNode } from 'react'

export interface AspectRatioProps {
  ratio?: number
  children?: ReactNode
  style?: CSSProperties
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, children, style }, ref) => (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${100 / ratio}%`,
        ...style,
      }}
    >
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
        {children}
      </div>
    </div>
  ),
)
AspectRatio.displayName = 'AspectRatio'
