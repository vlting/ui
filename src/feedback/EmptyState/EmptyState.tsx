import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const EmptyStateFrame = styled(YStack, {})

export type EmptyStateProps = GetProps<typeof EmptyStateFrame>

export const EmptyState = EmptyStateFrame
