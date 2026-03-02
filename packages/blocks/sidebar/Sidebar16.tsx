import { styledHtml } from '@tamagui/web'
import type { ComponentType, ReactNode } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Sidebar } from '../../components/Sidebar'
import type { SidebarBlockProps } from './_shared'
import { SidebarNavGroup } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

const Header = styledHtml('header', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',
  backgroundColor: '$background',
  position: 'sticky' as any,
  top: 0,
  zIndex: 10,
} as any)
const HeaderJsx = Header as AnyFC

export interface Sidebar16Props extends SidebarBlockProps {
  siteTitle?: string
  siteLogo?: ReactNode
  headerActions?: ReactNode
  children?: ReactNode
}

export function Sidebar16({
  groups,
  header,
  footer,
  siteTitle,
  siteLogo,
  headerActions,
  children,
  collapsible = 'offcanvas',
  side = 'left',
  variant = 'sidebar',
  defaultOpen = true,
  open,
  onOpenChange,
  width,
  collapsedWidth,
}: Sidebar16Props) {
  return (
    <ViewJsx flex={1} flexDirection="column">
      <HeaderJsx>
        <ViewJsx flexDirection="row" alignItems="center" gap="$2">
          {siteLogo}
          {siteTitle && (
            <TextJsx fontSize="$5" fontWeight="$4" fontFamily="$heading" color="$color">
              {siteTitle}
            </TextJsx>
          )}
        </ViewJsx>
        {headerActions && <ViewJsx>{headerActions}</ViewJsx>}
      </HeaderJsx>

      <ViewJsx flexDirection="row" flex={1}>
        <Sidebar.Root
          collapsible={collapsible}
          side={side}
          variant={variant}
          defaultOpen={defaultOpen}
          open={open}
          onOpenChange={onOpenChange}
          width={width}
          collapsedWidth={collapsedWidth}
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
    </ViewJsx>
  )
}
