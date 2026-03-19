import type { ComponentType, ReactNode } from 'react'
import React from 'react'
import { Button } from '../../components/Button'
import { Sheet } from '../../components/Sheet'
import { Sidebar } from '../../components/Sidebar'
import { Tabs } from '../../components/Tabs'
import { Separator } from '../../stl-react/src/primitives/Separator/Separator'
import { styled } from '../../stl-react/src/config'
import type { NavGroup } from '../sidebar/_shared'
import { SidebarNavGroup } from '../sidebar/_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ButtonJsx = Button as AnyFC
const SeparatorJsx = Separator as AnyFC

const NavElement = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}, { name: 'AppShellNav' })

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
    <div style={{ display: 'flex', flexDirection: 'row', flex: 1, minHeight: '100vh' }}>
      <Sidebar.Root collapsible="offcanvas" side="left" variant="sidebar" defaultOpen>
        {sidebarHeader && <Sidebar.Header>{sidebarHeader}</Sidebar.Header>}
        <Sidebar.Content>
          <NavElement aria-label="Main navigation">
            {sidebarGroups.map((group, i) => (
              <React.Fragment key={`group-${group.label ?? i}`}>
                {i > 0 && <Sidebar.Separator />}
                <SidebarNavGroup group={group} />
              </React.Fragment>
            ))}
          </NavElement>
        </Sidebar.Content>
        {sidebarFooter && <Sidebar.Footer>{sidebarFooter}</Sidebar.Footer>}
      </Sidebar.Root>

      <main style={{ flex: 1, padding: 16 }}>{children}</main>

      {onSheetOpenChange && (
        <Sheet.Root open={sheetOpen} onOpenChange={onSheetOpenChange}>
          <Sheet.Overlay />
          <Sheet.Frame>
            <Sheet.Handle />
            <NavElement>
              {sidebarGroups.map((group, i) => (
                <React.Fragment key={`sheet-group-${group.label ?? i}`}>
                  {i > 0 && <SeparatorJsx />}
                  <SidebarNavGroup group={group} />
                </React.Fragment>
              ))}
            </NavElement>
          </Sheet.Frame>
        </Sheet.Root>
      )}
    </div>
  )
}

// -- tab-layout: Bottom tab navigation --

function TabLayout({ tabs = [], activeTab, onTabChange, children }: AppShellBlockProps) {
  const defaultTab = activeTab ?? tabs[0]?.value

  return (
    <div
      style={{ flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Tabs.Root defaultValue={defaultTab} value={activeTab} onValueChange={onTabChange}>
        <main style={{ flex: 1 }}>
          {tabs.map((tab) => (
            <Tabs.Content key={tab.value} value={tab.value}>
              <div style={{ flex: 1, padding: 16 }}>{tab.content}</div>
            </Tabs.Content>
          ))}
          {children}
        </main>

        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Trigger key={tab.value} value={tab.value}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {tab.icon}
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color)',
                  }}
                >
                  {tab.label}
                </span>
              </div>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </div>
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
    <div style={{ display: 'flex', flexDirection: 'row', flex: 1, minHeight: '100vh' }}>
      {/* Master pane */}
      <aside
        style={{
          width: masterWidth,
          borderRight: '1px solid var(--borderColor)',
          display: 'flex',
          flexDirection: 'column',
        }}
        aria-label="Master pane"
      >
        {masterHeader && (
          <div style={{ padding: 12, borderBottom: '1px solid var(--borderColor)' }}>
            {masterHeader}
          </div>
        )}
        <div style={{ flex: 1, overflow: 'hidden' }}>{masterContent}</div>
      </aside>

      {/* Detail pane */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          ...(showDetail ? {} : { display: 'none' }),
        }}
      >
        {(detailHeader || onBack) && (
          <div
            style={{
              padding: 12,
              borderBottom: '1px solid var(--borderColor)',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {onBack && (
              <ButtonJsx variant="ghost" size="md" onPress={onBack}>
                <span
                  style={{
                    fontSize: 14,
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color)',
                  }}
                >
                  &larr; Back
                </span>
              </ButtonJsx>
            )}
            {detailHeader}
          </div>
        )}
        <div style={{ flex: 1, overflow: 'hidden' }}>{detailContent}</div>
      </main>
    </div>
  )
}
