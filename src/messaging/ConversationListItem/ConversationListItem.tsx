import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ConversationListItemFrame = styled(YStack, {})

export type ConversationListItemProps = GetProps<typeof ConversationListItemFrame>

export const ConversationListItem = ConversationListItemFrame
