import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const LoadingOverlayFrame = styled(YStack, {})

export type LoadingOverlayProps = GetProps<typeof LoadingOverlayFrame>

export const LoadingOverlay = LoadingOverlayFrame
