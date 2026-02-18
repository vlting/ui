import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PMCommentSidebarFrame = styled(YStack, {})

export type PMCommentSidebarProps = GetProps<typeof PMCommentSidebarFrame>

export const PMCommentSidebar = PMCommentSidebarFrame
