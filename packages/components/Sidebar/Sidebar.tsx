import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import React, { useCallback, useState } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

const GroupLabelH3 = styledHtml('h3', {
  fontSize: 12,
  fontWeight: '600',
  color: '$colorSubtitle',
  fontFamily: '$body',
  margin: 0,
} as any) as AnyFC

export interface SidebarRootProps {
  children: React.ReactNode
  collapsible?: 'offcanvas' | 'icon' | 'none'
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  width?: number
  collapsedWidth?: number
}

export interface SidebarGroupProps {
  children: React.ReactNode
}

export interface SidebarMenuItemProps {
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
  onPress?: () => void
}

const SidebarContext = React.createContext<{
  open: boolean
  setOpen: (v: boolean) => void
  collapsed: boolean
  collapsible: 'offcanvas' | 'icon' | 'none'
  side: 'left' | 'right'
  variant: 'sidebar' | 'floating' | 'inset'
  width: number
  collapsedWidth: number
}>({
  open: true,
  setOpen: () => {},
  collapsed: false,
  collapsible: 'offcanvas',
  side: 'left',
  variant: 'sidebar',
  width: 256,
  collapsedWidth: 48,
})

function Root({
  children,
  collapsible = 'offcanvas',
  side = 'left',
  variant = 'sidebar',
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  width = 256,
  collapsedWidth = 48,
}: SidebarRootProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const open = controlledOpen ?? internalOpen

  const setOpen = useCallback(
    (v: boolean) => {
      setInternalOpen(v)
      onOpenChange?.(v)
    },
    [onOpenChange],
  )

  const collapsed = !open && collapsible === 'icon'

  return (
    <SidebarContext.Provider
      value={{
        open,
        setOpen,
        collapsed,
        collapsible,
        side,
        variant,
        width,
        collapsedWidth,
      }}
    >
      <ViewJsx
        flexDirection="column"
        height="100%"
        backgroundColor={variant === 'floating' ? '$background' : '$color1'}
        borderRightWidth={side === 'left' && variant === 'sidebar' ? 1 : 0}
        borderLeftWidth={side === 'right' && variant === 'sidebar' ? 1 : 0}
        borderColor="$borderColor"
        overflow="hidden"
        borderRadius={variant === 'floating' ? '$5' : undefined}
        style={{
          width: collapsed ? collapsedWidth : open ? width : 0,
          // Matches animation token: medium (250ms ease-in-out)
          transition: 'width 250ms ease-in-out',
          ...(variant === 'floating'
            ? {
                margin: 8,
                borderWidth: 1,
                borderColor: 'var(--borderColor)',
                boxShadow: 'var(--shadowMd)',
              }
            : {}),
        }}
        role="complementary"
        aria-label="Sidebar"
      >
        {children}
      </ViewJsx>
    </SidebarContext.Provider>
  )
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <ViewJsx
      paddingLeft={16}
      paddingRight={16}
      paddingTop={12}
      paddingBottom={12}
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
    >
      {children}
    </ViewJsx>
  )
}

function SidebarContent({ children }: { children: React.ReactNode }) {
  return (
    <ViewJsx flex={1} overflow="auto" paddingTop={8} paddingBottom={8}>
      {children}
    </ViewJsx>
  )
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <ViewJsx
      paddingLeft={16}
      paddingRight={16}
      paddingTop={12}
      paddingBottom={12}
      borderTopWidth={1}
      borderTopColor="$borderColor"
    >
      {children}
    </ViewJsx>
  )
}

function Group({ children }: SidebarGroupProps) {
  return <ViewJsx paddingBottom={8}>{children}</ViewJsx>
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  const { collapsed } = React.useContext(SidebarContext)
  if (collapsed) return null

  return (
    <ViewJsx paddingLeft={16} paddingRight={16} paddingTop={8} paddingBottom={4}>
      <GroupLabelH3>{children}</GroupLabelH3>
    </ViewJsx>
  )
}

function GroupContent({ children }: { children: React.ReactNode }) {
  return <ViewJsx>{children}</ViewJsx>
}

function SidebarMenu({ children }: { children: React.ReactNode }) {
  return (
    <ViewJsx role="menu" gap={1} paddingLeft={8} paddingRight={8}>
      {children}
    </ViewJsx>
  )
}

function MenuItem({ children, active, disabled, onPress }: SidebarMenuItemProps) {
  return (
    <ViewJsx
      flexDirection="row"
      alignItems="center"
      height={36}
      paddingLeft={8}
      paddingRight={8}
      borderRadius="$3"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      backgroundColor={active ? '$color2' : 'transparent'}
      hoverStyle={disabled ? undefined : { backgroundColor: '$color2' }}
      onPress={disabled ? undefined : onPress}
      role="menuitem"
      aria-disabled={disabled}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </ViewJsx>
  )
}

function MenuButton({ children, active, disabled, onPress }: SidebarMenuItemProps) {
  return (
    <MenuItem active={active} disabled={disabled} onPress={onPress}>
      <TextJsx
        fontSize={14}
        fontFamily="$body"
        color="$color"
        fontWeight={active ? '500' : '400'}
      >
        {children}
      </TextJsx>
    </MenuItem>
  )
}

function SidebarSeparator() {
  return (
    <ViewJsx
      height={1}
      backgroundColor="$borderColor"
      marginTop={8}
      marginBottom={8}
      marginLeft={16}
      marginRight={16}
    />
  )
}

function Trigger({ children }: { children?: React.ReactNode }) {
  const { open, setOpen } = React.useContext(SidebarContext)

  return (
    <ViewJsx
      width={28}
      height={28}
      borderRadius="$2"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      hoverStyle={{ backgroundColor: '$color2' }}
      onPress={() => setOpen(!open)}
      role="button"
      aria-label={open ? 'Close sidebar' : 'Open sidebar'}
      aria-expanded={open}
    >
      {children ?? (
        <TextJsx fontSize={16} color="$color">
          {open ? '\u2630' : '\u2630'}
        </TextJsx>
      )}
    </ViewJsx>
  )
}

function Rail() {
  const { side } = React.useContext(SidebarContext)

  return (
    <ViewJsx
      position="absolute"
      top={0}
      bottom={0}
      width={4}
      style={{ [side === 'left' ? 'right' : 'left']: 0 }}
      cursor="col-resize"
      backgroundColor="transparent"
      hoverStyle={{ backgroundColor: '$color3' }}
    />
  )
}

export const Sidebar = {
  Root,
  Header,
  Content: SidebarContent,
  Footer,
  Group,
  GroupLabel,
  GroupContent,
  Menu: SidebarMenu,
  MenuItem,
  MenuButton,
  Separator: SidebarSeparator,
  Trigger,
  Rail,
}
