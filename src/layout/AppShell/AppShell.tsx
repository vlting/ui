import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const AppShellFrame = styled(YStack, {})

const AppShellHeader = styled(YStack, {})

const AppShellSidebar = styled(YStack, {})

const AppShellContent = styled(YStack, {})

const AppShellFooter = styled(YStack, {})

export const AppShell = withStaticProperties(AppShellFrame, {
  Header: AppShellHeader,
  Sidebar: AppShellSidebar,
  Content: AppShellContent,
  Footer: AppShellFooter,
})

export type AppShellProps = GetProps<typeof AppShellFrame>
