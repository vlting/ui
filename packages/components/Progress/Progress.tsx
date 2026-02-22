import { View, XStack, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const ProgressTrack = styled(XStack, {
  backgroundColor: '$color4',
  borderRadius: '$10',
  overflow: 'hidden',
  width: '100%',

  variants: {
    size: {
      sm: { height: 4 },
      md: { height: 8 },
      lg: { height: 12 },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const ProgressIndicator = styled(View, {
  backgroundColor: '$color10',
  borderRadius: '$10',
  height: '100%',
  animation: 'fast',
})

export interface ProgressProps {
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
}

export function Progress({ value = 0, max = 100, size = 'md' }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    // @ts-expect-error Tamagui v2 RC
    <ProgressTrack
      size={size}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <ProgressIndicator width={`${percentage}%`} />
    </ProgressTrack>
  )
}
