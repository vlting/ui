import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const CollabCommentSidebarFrame = styled(YStack, {})

export type CollabCommentSidebarProps = GetProps<typeof CollabCommentSidebarFrame>

export const CollabCommentSidebar = CollabCommentSidebarFrame
