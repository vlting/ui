import type { ComponentPropsWithRef } from 'react'
import { styled, props } from '../../stl-react/src/config'

// ─── Internal ───────────────────────────────────────────────────────────────

const ProgressIndicator = styled('div', {
  stl: {
    height: '100%',
    borderRadius: '$field',
    bg: '$primary9',
    transition: 'width 150ms ease',
    lowMotion: { transition: 'none' },
  },
  styleName: 'ProgressIndicator',
})

// ─── Progress ───────────────────────────────────────────────────────────────

export const Progress = styled('div', {
  stl: {
    display: 'block',
    width: '100%',
    bg: '$borderColor',
    borderRadius: '$field',
    overflow: 'hidden',
  },
  variants: {
    size: {
      sm: { height: '$4' },
      md: { height: '$8' },
      lg: { height: '$12' },
    },
  },
  defaultVariants: { size: 'md' },
  mapProps: (props) => {
    const max = props.max ?? 100
    const value = props.value ?? 0
    return {
      ...props,
      role: 'progressbar',
      'aria-valuenow': value,
      'aria-valuemin': 0,
      'aria-valuemax': max,
      'aria-label': props['aria-label'] ?? 'Progress',
    }
  },
  ...props<{ value?: number; max?: number }>('value', 'max'),
  template: ({ value, max }) => {
    const pct = Math.min(100, ((value ?? 0) / (max ?? 100)) * 100)
    return <ProgressIndicator stl={{ width: `${pct}%` }} />
  },
  styleName: 'Progress',
})

export type ProgressProps = ComponentPropsWithRef<typeof Progress>
export type ProgressSize = NonNullable<ProgressProps['size']>
