import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const AvatarUploaderFrame = styled(YStack, {})

export type AvatarUploaderProps = GetProps<typeof AvatarUploaderFrame>

export const AvatarUploader = AvatarUploaderFrame
