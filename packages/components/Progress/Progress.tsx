import type React from 'react'
import { styled } from '../../stl-react/src/config'

const ProgressTrack = styled(
  "div",
  {
    position: "relative",
    overflow: "hidden",
    borderRadius: "9999px",
    backgroundColor: "var(--color4)",
    width: "100%",
  },
  {
    size: {
      sm: { height: "4px" },
      md: { height: "6px" },
      lg: { height: "8px" },
    },
  },
  "Progress"
)

const ProgressIndicator = styled(
  "div",
  {
    height: "100%",
    backgroundColor: "var(--color10)",
    borderRadius: "9999px",
    transition: "width 200ms ease",
  },
  "ProgressIndicator"
)

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
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <ProgressTrack
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      size={size}
    >
      <ProgressIndicator style={{ width: `${percentage}%` }} />
    </ProgressTrack>
  )
}
