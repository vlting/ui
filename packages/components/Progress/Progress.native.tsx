import { forwardRef } from 'react'
import { View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Internal ───────────────────────────────────────────────────────────────

const ProgressIndicator = styled(View, {
  height: '100%',
  borderRadius: 4,
}, {
  theme: {
    primary: { backgroundColor: '$primary9' },
    secondary: { backgroundColor: '$secondary9' },
    neutral: { backgroundColor: '$neutral9' },
  },
}, 'ProgressIndicator')

// ─── Progress ───────────────────────────────────────────────────────────────

const ProgressTrack = styled(View, {
  width: '100%',
  backgroundColor: '$maxAlpha4',
  borderRadius: 4,
  overflow: 'hidden',
}, {
  size: {
    sm: { height: 4 },
    md: { height: 8 },
    lg: { height: 12 },
  },
  theme: {
    primary: {},
    secondary: {},
    neutral: {},
  },
}, 'Progress')

// ─── Export ─────────────────────────────────────────────────────────────────

export interface ProgressProps {
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  theme?: 'primary' | 'secondary' | 'neutral'
  style?: ViewStyle
}

export const Progress = forwardRef<View, ProgressProps>(
  ({ value = 0, max = 100, theme = 'primary', size = 'md', ...rest }, ref) => {
    const pct = Math.min(100, (value / max) * 100)
    return (
      <ProgressTrack
        ref={ref}
        theme={theme}
        size={size}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max, now: value }}
        accessibilityLabel={rest['aria-label'] ?? 'Progress'}
        {...rest}
      >
        <ProgressIndicator
          theme={theme}
          style={{ width: `${pct}%` as any }}
        />
      </ProgressTrack>
    )
  },
)
Progress.displayName = 'Progress'

export type ProgressSize = 'sm' | 'md' | 'lg'
export type ProgressTheme = 'primary' | 'secondary' | 'neutral'
