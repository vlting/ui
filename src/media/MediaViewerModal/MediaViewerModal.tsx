import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MediaViewerModalFrame = styled(YStack, {})

export type MediaViewerModalProps = GetProps<typeof MediaViewerModalFrame>

export const MediaViewerModal = MediaViewerModalFrame
