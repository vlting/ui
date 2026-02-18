import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const OrgAvatarFrame = styled(YStack, {})

export type OrgAvatarProps = GetProps<typeof OrgAvatarFrame>

export const OrgAvatar = OrgAvatarFrame
