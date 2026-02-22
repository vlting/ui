import { View, styled } from 'tamagui'
import type { GetProps } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
export const Skeleton = styled(View, {
  backgroundColor: '$color4',
  borderRadius: '$2',
  overflow: 'hidden',
  animation: 'lazy',
  opacity: 0.5,
  enterStyle: { opacity: 0.3 },

  variants: {
    circle: {
      true: {
        borderRadius: 1000,
      },
    },
  } as const,
})

export type SkeletonProps = GetProps<typeof Skeleton>
