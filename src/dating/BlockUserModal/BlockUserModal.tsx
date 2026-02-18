import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const BlockUserModalFrame = styled(YStack, {})

export type BlockUserModalProps = GetProps<typeof BlockUserModalFrame>

export const BlockUserModal = BlockUserModalFrame
