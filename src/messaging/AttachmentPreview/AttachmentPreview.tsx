import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const AttachmentPreviewFrame = styled(YStack, {})

export type AttachmentPreviewProps = GetProps<typeof AttachmentPreviewFrame>

export const AttachmentPreview = AttachmentPreviewFrame
