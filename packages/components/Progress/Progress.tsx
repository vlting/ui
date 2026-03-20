import { type ComponentPropsWithRef, forwardRef } from 'react'
import { styled, type STL } from '../../stl-react/src/config'

// ─── Theme map ──────────────────────────────────────────────────────────────

const themeIndicatorBg: Record<string, STL> = {
  primary: { bg: '$primary9' },
  secondary: { bg: '$secondary9' },
  neutral: { bg: '$neutral9' },
}

// ─── Internal ───────────────────────────────────────────────────────────────

const ProgressIndicator = styled('div', {
  height: '100%',
  borderRadius: '$field',
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
    theme: {
      primary: {},
      secondary: {},
      neutral: {},
    },
  },
  defaultVariants: { size: 'md', theme: 'primary' },
})

export type ProgressProps = ComponentPropsWithRef<typeof ProgressBase> & {
  value?: number
  max?: number
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, max = 100, theme = 'primary', ...rest }, ref) => {
    const pct = Math.min(100, (value / max) * 100)
    return (
      <ProgressBase
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={rest['aria-label'] ?? 'Progress'}
        theme={theme}
        {...rest}
      >
        <ProgressIndicator stl={{ width: `${pct}%`, ...themeIndicatorBg[theme] }} />
      </ProgressBase>
    )
  },
)
Progress.displayName = 'Progress'

export type ProgressSize = NonNullable<ComponentPropsWithRef<typeof ProgressBase>['size']>
export type ProgressTheme = NonNullable<ComponentPropsWithRef<typeof ProgressBase>['theme']>
