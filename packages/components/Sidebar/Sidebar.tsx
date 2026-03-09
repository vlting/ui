import React, { useCallback, useState } from 'react'
import { styled } from '../../stl-react/src/config'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const SidebarFrame = styled(
  "aside",
  {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
  },
  "Sidebar"
)

const SidebarHeaderFrame = styled(
  "div",
  {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "12px",
    paddingBottom: "12px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "var(--borderColor)",
  },
  "SidebarHeader"
)

const SidebarContentFrame = styled(
  "div",
  { flex: "1", overflow: "auto", paddingTop: "6px", paddingBottom: "6px" },
  "SidebarContent"
)

const SidebarFooterFrame = styled(
  "div",
  {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "12px",
    paddingBottom: "12px",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "var(--borderColor)",
  },
  "SidebarFooter"
)

const SidebarGroupFrame = styled("div", { paddingBottom: "6px" }, "SidebarGroup")

const SidebarGroupLabelFrame = styled(
  "div",
  { paddingLeft: "16px", paddingRight: "16px", paddingTop: "6px", paddingBottom: "4px" },
  "SidebarGroupLabel"
)

const SidebarMenuFrame = styled(
  "nav",
  { display: "flex", flexDirection: "column", gap: "1px", paddingLeft: "6px", paddingRight: "6px" },
  "SidebarMenu"
)

const SidebarSeparatorFrame = styled(
  "hr",
  {
    height: "1px",
    backgroundColor: "var(--borderColor)",
    marginTop: "6px",
    marginBottom: "6px",
    marginLeft: "16px",
    marginRight: "16px",
    border: "none",
  },
  "SidebarSeparator"
)

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
  const reducedMotion = useReducedMotion()
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

  const borderStyle: React.CSSProperties = {
    width: collapsed ? collapsedWidth : open ? width : 0,
    transition: reducedMotion ? 'none' : 'width 250ms ease-in-out',
    backgroundColor: variant === 'floating' ? 'var(--background)' : 'var(--color1)',
    ...(side === 'left' && variant === 'sidebar' ? { borderRight: '1px solid var(--borderColor)' } : {}),
    ...(side === 'right' && variant === 'sidebar' ? { borderLeft: '1px solid var(--borderColor)' } : {}),
    ...(variant === 'floating' ? {
      margin: 8,
      border: '1px solid var(--borderColor)',
      boxShadow: 'var(--shadowMd)',
      borderRadius: 10,
    } : {}),
  }

  return (
    <SidebarContext.Provider
      value={{ open, setOpen, collapsed, collapsible, side, variant, width, collapsedWidth }}
    >
      <SidebarFrame
        role="complementary"
        aria-label="Sidebar"
        style={borderStyle}
      >
        {children}
      </SidebarFrame>
    </SidebarContext.Provider>
  )
}

function Header({ children }: { children: React.ReactNode }) {
  return <SidebarHeaderFrame>{children}</SidebarHeaderFrame>
}

function SidebarContent({ children }: { children: React.ReactNode }) {
  return <SidebarContentFrame>{children}</SidebarContentFrame>
}

function Footer({ children }: { children: React.ReactNode }) {
  return <SidebarFooterFrame>{children}</SidebarFooterFrame>
}

function Group({ children }: SidebarGroupProps) {
  return <SidebarGroupFrame>{children}</SidebarGroupFrame>
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  const { collapsed } = React.useContext(SidebarContext)
  if (collapsed) return null

  return (
    <SidebarGroupLabelFrame>
      <h3 style={{
        fontSize: 'var(--fontSize-2, 12px)',
        fontWeight: '600',
        color: 'var(--colorSubtitle)',
        fontFamily: 'var(--font-body)',
        margin: 0,
      }}>
        {children}
      </h3>
    </SidebarGroupLabelFrame>
  )
}

function GroupContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <SidebarMenuFrame role="menu">{children}</SidebarMenuFrame>
}

function MenuItem({ children, active, disabled, onPress }: SidebarMenuItemProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onPress}
      disabled={disabled}
      role="menuitem"
      aria-disabled={disabled}
      aria-current={active ? 'page' : undefined}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 36,
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 6,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        backgroundColor: active ? 'var(--color2)' : 'transparent',
        border: 'none',
        width: '100%',
        textAlign: 'left',
        fontFamily: 'inherit',
        font: 'inherit',
        color: 'inherit',
        padding: 0,
        margin: 0,
        appearance: 'none' as const,
        boxSizing: 'border-box' as const,
      }}
    >
      {children}
    </button>
  )
}

function MenuButton({ children, active, disabled, onPress }: SidebarMenuItemProps) {
  return (
    <MenuItem active={active} disabled={disabled} onPress={onPress}>
      <span style={{
        fontSize: 'var(--fontSize-4, 16px)',
        fontFamily: 'var(--font-body)',
        color: 'var(--color)',
        fontWeight: active ? '500' : '400',
      }}>
        {children}
      </span>
    </MenuItem>
  )
}

function SidebarSeparator() {
  return <SidebarSeparatorFrame />
}

function Trigger({ children }: { children?: React.ReactNode }) {
  const { open, setOpen } = React.useContext(SidebarContext)

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      aria-label={open ? 'Close sidebar' : 'Open sidebar'}
      aria-expanded={open}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 4,
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      {children ?? (
        <span style={{ fontSize: 'var(--fontSize-5, 18px)', color: 'var(--color)' }}>
          {'\u2630'}
        </span>
      )}
    </button>
  )
}

function Rail() {
  const { side } = React.useContext(SidebarContext)

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 4,
        [side === 'left' ? 'right' : 'left']: 0,
        cursor: 'col-resize',
        backgroundColor: 'transparent',
      }}
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
