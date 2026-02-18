import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SidebarFrame = styled(YStack, {})

export type SidebarProps = GetProps<typeof SidebarFrame>

export const Sidebar = SidebarFrame
