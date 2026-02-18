import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const AvatarFrame = styled(YStack, {})

export type AvatarProps = GetProps<typeof AvatarFrame>

export const Avatar = AvatarFrame
