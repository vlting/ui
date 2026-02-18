import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SessionExpiredModalFrame = styled(YStack, {})

export type SessionExpiredModalProps = GetProps<typeof SessionExpiredModalFrame>

export const SessionExpiredModal = SessionExpiredModalFrame
