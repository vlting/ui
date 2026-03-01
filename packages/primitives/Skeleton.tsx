import { View, styled } from 'tamagui'
import type { GetProps } from 'tamagui'

export const Skeleton = styled(View, {
  backgroundColor: '$color4',
  borderRadius: '$2',
  overflow: 'hidden',
  animation: 'lazy',
  opacity: 0.5,
  enterStyle: { opacity: 0.3 },
  // web-only ARIA attribute
  'aria-hidden': true,

  variants: {
    circle: {
      true: {
        borderRadius: '$full',
      },
    },
  } as const,
} as any)

export type SkeletonProps = GetProps<typeof Skeleton>
