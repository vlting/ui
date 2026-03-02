import type { ComponentType, ReactNode } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Sidebar } from '../../components/Sidebar'
import type { NavGroup } from './_shared'
import { SidebarNavGroup } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const _TextJsx = Text as AnyFC

export interface Sidebar15Props {
  leftGroups: NavGroup[]
  rightGroups: NavGroup[]
  leftHeader?: ReactNode
  rightHeader?: ReactNode
  leftFooter?: ReactNode
  rightFooter?: ReactNode
  children?: ReactNode
  leftDefaultOpen?: boolean
  rightDefaultOpen?: boolean
  leftCollapsible?: 'offcanvas' | 'icon' | 'none'
  rightCollapsible?: 'offcanvas' | 'icon' | 'none'
  leftWidth?: number
  rightWidth?: number
}

export function Sidebar15({
  leftGroups,
  rightGroups,
  leftHeader,
  rightHeader,
  leftFooter,
  rightFooter,
  children,
  leftDefaultOpen = true,
  rightDefaultOpen = true,
  leftCollapsible = 'offcanvas',
  rightCollapsible = 'offcanvas',
  leftWidth,
  rightWidth,
}: Sidebar15Props) {
  return (
    <ViewJsx flexDirection="row" flex={1}>
      <Sidebar.Root
        collapsible={leftCollapsible}
        side="left"
        variant="sidebar"
        defaultOpen={leftDefaultOpen}
        width={leftWidth}
      >
        {leftHeader && <Sidebar.Header>{leftHeader}</Sidebar.Header>}
        <Sidebar.Content>
          {leftGroups.map((group, i) => (
            <React.Fragment key={`left-group-${group.label ?? i}`}>
              {i > 0 && <Sidebar.Separator />}
              <SidebarNavGroup group={group} />
            </React.Fragment>
          ))}
        </Sidebar.Content>
        {leftFooter && <Sidebar.Footer>{leftFooter}</Sidebar.Footer>}
      </Sidebar.Root>

      <ViewJsx flex={1}>{children}</ViewJsx>

      <Sidebar.Root
        collapsible={rightCollapsible}
        side="right"
        variant="sidebar"
        defaultOpen={rightDefaultOpen}
        width={rightWidth}
      >
        {rightHeader && <Sidebar.Header>{rightHeader}</Sidebar.Header>}
        <Sidebar.Content>
          {rightGroups.map((group, i) => (
            <React.Fragment key={`right-group-${group.label ?? i}`}>
              {i > 0 && <Sidebar.Separator />}
              <SidebarNavGroup group={group} />
            </React.Fragment>
          ))}
        </Sidebar.Content>
        {rightFooter && <Sidebar.Footer>{rightFooter}</Sidebar.Footer>}
      </Sidebar.Root>
    </ViewJsx>
  )
}
