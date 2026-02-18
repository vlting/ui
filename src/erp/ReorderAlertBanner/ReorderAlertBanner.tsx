import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ReorderAlertBannerFrame = styled(YStack, {})

export type ReorderAlertBannerProps = GetProps<typeof ReorderAlertBannerFrame>

export const ReorderAlertBanner = ReorderAlertBannerFrame
