import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ShareModalFrame = styled(YStack, {})

export type ShareModalProps = GetProps<typeof ShareModalFrame>

export const ShareModal = ShareModalFrame
