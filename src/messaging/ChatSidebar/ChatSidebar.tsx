import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ChatSidebarFrame = styled(YStack, {})

export type ChatSidebarProps = GetProps<typeof ChatSidebarFrame>

export const ChatSidebar = ChatSidebarFrame
