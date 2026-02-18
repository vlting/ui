import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const OfflineIndicatorFrame = styled(YStack, {})

export type OfflineIndicatorProps = GetProps<typeof OfflineIndicatorFrame>

export const OfflineIndicator = OfflineIndicatorFrame
