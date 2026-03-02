import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import React from 'react'
import { Text, View } from 'tamagui'
import { Button } from '../../components/Button'
import { Popover } from '../../components/Popover'
import { Separator } from '../../primitives/Separator'
import type { NavGroup, NavItem, SidebarBlockProps } from './_shared'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

const NavFrame = styledHtml('nav', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
} as any)
const NavJsx = NavFrame as AnyFC

const NavButton = styledHtml('button', {
  display: 'flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  cursor: 'pointer',
  alignItems: 'center',
  width: '100%',
  gap: 8,
  paddingTop: '$1.5',
  paddingBottom: '$1.5',
  paddingLeft: '$2',
  paddingRight: '$2',
  borderRadius: '$2',
  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const NavButtonJsx = NavButton as AnyFC

export interface Sidebar10Props
  extends Omit<
    SidebarBlockProps,
    'open' | 'onOpenChange' | 'defaultOpen' | 'collapsible' | 'variant' | 'side'
  > {
  triggerLabel?: string
  placement?: 'bottom' | 'right'
  popoverOpen?: boolean
  onPopoverOpenChange?: (open: boolean) => void
}

function PopoverNavItem({ item }: { item: NavItem }) {
  return (
    <NavButtonJsx
      onClick={item.onPress}
      disabled={item.disabled}
      role="menuitem"
      aria-current={item.active ? 'page' : undefined}
      style={item.active ? { fontWeight: 600 } : undefined}
    >
      {item.icon && (
        <ViewJsx width="$1.5" height="$1.5" alignItems="center" justifyContent="center">
          {item.icon}
        </ViewJsx>
      )}
      <TextJsx
        fontSize="$4"
        fontFamily="$body"
        color={item.disabled ? '$colorSubtitle' : '$color'}
        fontWeight={item.active ? '$3' : '$2'}
        flex={1}
      >
        {item.label}
      </TextJsx>
    </NavButtonJsx>
  )
}

function PopoverNavGroup({ group }: { group: NavGroup }) {
  return (
    <ViewJsx>
      {group.label && (
        <TextJsx
          fontSize="$2"
          fontFamily="$body"
          fontWeight="$3"
          color="$colorSubtitle"
          paddingHorizontal="$2"
          paddingTop="$2"
          paddingBottom="$1"
          textTransform="uppercase"
          letterSpacing={0.5}
        >
          {group.label}
        </TextJsx>
      )}
      <ViewJsx role="menu">
        {group.items.map((item, i) => (
          <PopoverNavItem key={`${item.label}-${i}`} item={item} />
        ))}
      </ViewJsx>
    </ViewJsx>
  )
}

export function Sidebar10({
  groups,
  header,
  footer,
  triggerLabel = 'Navigation',
  placement = 'bottom',
  popoverOpen,
  onPopoverOpenChange,
}: Sidebar10Props) {
  return (
    <Popover.Root
      placement={placement}
      open={popoverOpen}
      onOpenChange={onPopoverOpenChange}
    >
      <Popover.Trigger>
        <Button variant="outline" size="md">
          <TextJsx fontSize="$4" fontFamily="$body" color="$color">
            {triggerLabel}
          </TextJsx>
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <NavJsx aria-label={triggerLabel}>
          {header && <ViewJsx paddingBottom="$2">{header}</ViewJsx>}
          {groups.map((group, i) => (
            <React.Fragment key={`popnav-group-${group.label ?? i}`}>
              {i > 0 && <Separator />}
              <PopoverNavGroup group={group} />
            </React.Fragment>
          ))}
          {footer && (
            <>
              <Separator />
              <ViewJsx paddingTop="$2">{footer}</ViewJsx>
            </>
          )}
        </NavJsx>
      </Popover.Content>
    </Popover.Root>
  )
}
