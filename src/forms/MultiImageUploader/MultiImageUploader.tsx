import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MultiImageUploaderFrame = styled(YStack, {})

export type MultiImageUploaderProps = GetProps<typeof MultiImageUploaderFrame>

export const MultiImageUploader = MultiImageUploaderFrame
