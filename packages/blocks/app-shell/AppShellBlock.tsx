import { styledHtml } from '@tamagui/web'
import type { ComponentType, ReactNode } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Button } from '../../components/Button'
import { Separator } from '../../primitives/Separator'
import { Sheet } from '../../components/Sheet'
import { Sidebar } from '../../components/Sidebar'
import { Tabs } from '../../components/Tabs'
import type { NavGroup } from '../sidebar/_shared'
import { SidebarNavGroup } from '../sidebar/_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC
const ButtonJsx = Button as AnyFC
const SeparatorJsx = Separator as AnyFC

const Nav = styledHtml('nav', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
} as any)
const NavJsx = Nav as AnyFC

// -- Types --

export type AppShellBlockVariant = 'sidebar-layout' | 'tab-layout' | 'split-pane'

export interface TabItem {
  value: string
  label: string
  icon?: ReactNode
  content: ReactNode
}

export interface AppShellBlockProps {
  variant: AppShellBlockVariant
  sidebarGroups?: NavGroup[]
  sidebarHeader?: ReactNode
  sidebarFooter?: ReactNode
  tabs?: TabItem[]
  activeTab?: string
  onTabChange?: (tab: string) => void
  masterContent?: ReactNode
  detailContent?: ReactNode
  masterWidth?: number | string
  showDetail?: boolean
  onBack?: () => void
  masterHeader?: ReactNode
  detailHeader?: ReactNode
  sheetOpen?: boolean
  onSheetOpenChange?: (open: boolean) => void
  children?: ReactNode
}

// -- Main component --

export function AppShellBlock(props: AppShellBlockProps) {
  switch (props.variant) {
    case 'sidebar-layout':
      return <SidebarLayout {...props} />
    case 'tab-layout':
      return <TabLayout {...props} />
    case 'split-pane':
      return <SplitPane {...props} />
  }
}

// -- sidebar-layout: Full app shell with sidebar navigation --

function SidebarLayout({
  sidebarGroups = [],
  sidebarHeader,
  sidebarFooter,
  sheetOpen,
  onSheetOpenChange,
  children,
}: AppShellBlockProps) {
  return (
    <ViewJsx flexDirection="row" flex={1} minHeight="100vh">
      <Sidebar.Root collapsible="offcanvas" side="left" variant="sidebar" defaultOpen>
        {sidebarHeader && <Sidebar.Header>{sidebarHeader}</Sidebar.Header>}
        <Sidebar.Content>
          <NavJsx>
            {sidebarGroups.map((group, i) => (
              <React.Fragment key={`group-${group.label ?? i}`}>
                {i > 0 && <Sidebar.Separator />}
                <SidebarNavGroup group={group} />
              </React.Fragment>
            ))}
          </NavJsx>
        </Sidebar.Content>
        {sidebarFooter && <Sidebar.Footer>{sidebarFooter}</Sidebar.Footer>}
      </Sidebar.Root>

      <ViewJsx flex={1} padding="$4">
        {children}
      </ViewJsx>

      {onSheetOpenChange && (
        <Sheet.Root open={sheetOpen} onOpenChange={onSheetOpenChange}>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            <NavJsx>
              {sidebarGroups.map((group, i) => (
                <React.Fragment key={`sheet-group-${group.label ?? i}`}>
                  {i > 0 && <SeparatorJsx />}
                  <SidebarNavGroup group={group} />
                </React.Fragment>
              ))}
            </NavJsx>
          </Sheet.Frame>
        </Sheet.Root>
      )}
    </ViewJsx>
  )
}

// -- tab-layout: Bottom tab navigation --

function TabLayout({
  tabs = [],
  activeTab,
  onTabChange,
  children,
}: AppShellBlockProps) {
  const defaultTab = activeTab ?? tabs[0]?.value

  return (
    <ViewJsx flex={1} minHeight="100vh" flexDirection="column">
      <Tabs.Root
        defaultValue={defaultTab}
        value={activeTab}
        onValueChange={onTabChange}
      >
        <ViewJsx flex={1}>
          {tabs.map((tab) => (
            <Tabs.Content key={tab.value} value={tab.value}>
              <ViewJsx flex={1} padding="$4">
                {tab.content}
              </ViewJsx>
            </Tabs.Content>
          ))}
          {children}
        </ViewJsx>

        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Trigger key={tab.value} value={tab.value}>
              <ViewJsx alignItems="center" gap="$0.5">
                {tab.icon}
                <TextJsx fontSize="$2" fontFamily="$body" color="$color">
                  {tab.label}
                </TextJsx>
              </ViewJsx>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </ViewJsx>
  )
}

// -- split-pane: Master-detail split view --

function SplitPane({
  masterContent,
  detailContent,
  masterWidth = 320,
  showDetail = false,
  onBack,
  masterHeader,
  detailHeader,
}: AppShellBlockProps) {
  return (
    <ViewJsx flexDirection="row" flex={1} minHeight="100vh">
      {/* Master pane */}
      <ViewJsx
        width={masterWidth}
        borderRightWidth={1}
        borderColor="$borderColor"
        flexDirection="column"
        display={showDetail ? 'none' : 'flex'}
        $md={{ width: '100%', borderRightWidth: 0, display: 'flex' }}
      >
        {masterHeader && (
          <ViewJsx
            padding="$3"
            borderBottomWidth={1}
            borderColor="$borderColor"
          >
            {masterHeader}
          </ViewJsx>
        )}
        <ViewJsx flex={1} overflow="hidden">
          {masterContent}
        </ViewJsx>
      </ViewJsx>

      {/* Detail pane */}
      <ViewJsx
        flex={1}
        flexDirection="column"
        display={showDetail ? 'flex' : 'none'}
        $md={{ display: showDetail ? 'flex' : 'none' }}
      >
        {(detailHeader || onBack) && (
          <ViewJsx
            padding="$3"
            borderBottomWidth={1}
            borderColor="$borderColor"
            flexDirection="row"
            alignItems="center"
            gap="$2"
          >
            {onBack && (
              <ButtonJsx variant="ghost" size="sm" onPress={onBack}>
                <TextJsx fontSize="$3" fontFamily="$body" color="$color">
                  &larr; Back
                </TextJsx>
              </ButtonJsx>
            )}
            {detailHeader}
          </ViewJsx>
        )}
        <ViewJsx flex={1} overflow="hidden">
          {detailContent}
        </ViewJsx>
      </ViewJsx>
    </ViewJsx>
  )
}
