import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const FileUploaderFrame = styled(YStack, {})

export type FileUploaderProps = GetProps<typeof FileUploaderFrame>

export const FileUploader = FileUploaderFrame
