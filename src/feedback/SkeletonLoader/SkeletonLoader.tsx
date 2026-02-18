import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SkeletonLoaderFrame = styled(YStack, {})

export type SkeletonLoaderProps = GetProps<typeof SkeletonLoaderFrame>

export const SkeletonLoader = SkeletonLoaderFrame
