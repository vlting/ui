import { styledHtml } from '@tamagui/web'
import type { ComponentType, ReactNode } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Button } from '../../components/Button'
import { Sheet } from '../../components/Sheet'
import { Sidebar } from '../../components/Sidebar'
import type { NavGroup } from '../sidebar/_shared'
import { SidebarNavGroup } from '../sidebar/_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const _TextJsx = Text as AnyFC
const _ButtonJsx = Button as AnyFC

const Nav = styledHtml('nav', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
} as any)
const NavJsx = Nav as AnyFC

export interface AppShellResponsiveProps {
  groups: NavGroup[]
  header?: ReactNode
  footer?: ReactNode
  children?: ReactNode
  mode?: 'sidebar' | 'sheet'
  sheetOpen?: boolean
  onSheetOpenChange?: (open: boolean) => void
  sidebarCollapsible?: 'offcanvas' | 'icon' | 'none'
  sidebarWidth?: number
}

export function AppShellResponsive({
  groups,
  header,
  footer,
  children,
  mode = 'sidebar',
  sheetOpen,
  onSheetOpenChange,
  sidebarCollapsible = 'offcanvas',
  sidebarWidth,
}: AppShellResponsiveProps) {
  if (mode === 'sheet') {
    return (
      <ViewJsx flex={1} flexDirection="column">
        <ViewJsx flex={1}>{children}</ViewJsx>
        <Sheet.Root open={sheetOpen} onOpenChange={onSheetOpenChange} modal>
          <Sheet.Overlay />
          <Sheet.Handle />
          <Sheet.Frame>
            {header && (
              <ViewJsx
                padding="$3"
                borderBottomWidth={1}
                borderBottomColor="$borderColor"
              >
                {header}
              </ViewJsx>
            )}
            <NavJsx aria-label="Navigation">
              {groups.map((group, i) => (
                <React.Fragment key={`group-${group.label ?? i}`}>
                  {i > 0 && <Sidebar.Separator />}
                  <SidebarNavGroup group={group} />
                </React.Fragment>
              ))}
            </NavJsx>
            {footer && (
              <ViewJsx padding="$3" borderTopWidth={1} borderTopColor="$borderColor">
                {footer}
              </ViewJsx>
            )}
          </Sheet.Frame>
        </Sheet.Root>
      </ViewJsx>
    )
  }

  return (
    <ViewJsx flex={1} flexDirection="row">
      <Sidebar.Root
        collapsible={sidebarCollapsible}
        side="left"
        variant="sidebar"
        defaultOpen
        width={sidebarWidth}
      >
        {header && <Sidebar.Header>{header}</Sidebar.Header>}
        <Sidebar.Content>
          {groups.map((group, i) => (
            <React.Fragment key={`group-${group.label ?? i}`}>
              {i > 0 && <Sidebar.Separator />}
              <SidebarNavGroup group={group} />
            </React.Fragment>
          ))}
        </Sidebar.Content>
        {footer && <Sidebar.Footer>{footer}</Sidebar.Footer>}
      </Sidebar.Root>
      <ViewJsx flex={1}>{children}</ViewJsx>
    </ViewJsx>
  )
}
