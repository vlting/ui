import { type ComponentPropsWithRef, forwardRef } from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Internal ───────────────────────────────────────────────────────────────

const ProgressIndicator = styled('div', {
  height: '100%',
  borderRadius: '$field',
  bg: '$primary9',
  transition: 'width 150ms linear',
  lowMotion: { transition: 'none' },
}, { name: 'ProgressIndicator' })

// ─── Progress ───────────────────────────────────────────────────────────────

const ProgressBase = styled('div', {
  display: 'block',
  width: '100%',
  bg: '$maxAlpha4',
  borderRadius: '$field',
  overflow: 'hidden',
}, {
  name: 'Progress',
  variants: {
    size: {
      sm: { height: '$4' },
      md: { height: '$8' },
      lg: { height: '$12' },
    },
  },
  defaultVariants: { size: 'md' },
})

export type ProgressProps = ComponentPropsWithRef<typeof ProgressBase> & {
  value?: number
  max?: number
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, max = 100, ...rest }, ref) => {
    const pct = Math.min(100, (value / max) * 100)
    return (
      <ProgressBase
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={rest['aria-label'] ?? 'Progress'}
        {...rest}
      >
        <ProgressIndicator stl={{ width: `${pct}%` }} />
      </ProgressBase>
    )
  },
)
Progress.displayName = 'Progress'

export type ProgressSize = NonNullable<ComponentPropsWithRef<typeof ProgressBase>['size']>
