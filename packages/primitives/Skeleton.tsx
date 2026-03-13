import type { ComponentProps } from 'react'
import { styled } from '../stl-react/src/config'

const SKELETON_KEYFRAMES =
  '@keyframes vlting-skeleton-pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.3; } }'
let keyframesInjected = false

const SkeletonFrame = styled(
  'div',
  {
    stl: {
      backgroundColor: '$surface3',
      borderRadius: '$2',
      overflow: 'hidden',
    },
    variants: {
      circle: {
        true: { borderRadius: '$full' },
      },
    },
    styleName: 'Skeleton',
  },
)

export interface SkeletonProps extends ComponentProps<typeof SkeletonFrame> {
  circle?: boolean
}

export function Skeleton({ circle, style, ...props }: SkeletonProps) {
  if (typeof document !== 'undefined' && !keyframesInjected) {
    const sheet = document.createElement('style')
    sheet.textContent = SKELETON_KEYFRAMES
    document.head.appendChild(sheet)
    keyframesInjected = true
  }

  return (
    <SkeletonFrame
      circle={circle}
      aria-hidden
      style={{
        animation: 'vlting-skeleton-pulse 2s ease-in-out infinite',
        ...style,
      }}
      {...props}
    />
  )
}
