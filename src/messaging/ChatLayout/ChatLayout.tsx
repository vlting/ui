import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const ChatLayoutFrame = styled(YStack, {})

const ChatLayoutSidebar = styled(YStack, {})

const ChatLayoutThread = styled(YStack, {})

const ChatLayoutInput = styled(YStack, {})

export const ChatLayout = withStaticProperties(ChatLayoutFrame, {
  Sidebar: ChatLayoutSidebar,
  Thread: ChatLayoutThread,
  Input: ChatLayoutInput,
})

export type ChatLayoutProps = GetProps<typeof ChatLayoutFrame>
