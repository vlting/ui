import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const UploadProgressItemFrame = styled(YStack, {})

export type UploadProgressItemProps = GetProps<typeof UploadProgressItemFrame>

export const UploadProgressItem = UploadProgressItemFrame
