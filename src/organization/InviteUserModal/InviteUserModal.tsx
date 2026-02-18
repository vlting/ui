import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const InviteUserModalFrame = styled(YStack, {})

export type InviteUserModalProps = GetProps<typeof InviteUserModalFrame>

export const InviteUserModal = InviteUserModalFrame
