import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ConversationListFrame = styled(YStack, {})

export type ConversationListProps = GetProps<typeof ConversationListFrame>

export const ConversationList = ConversationListFrame
