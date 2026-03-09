import React, { useCallback, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const MenuContentFrame = styled(
  "div",
  {
    backgroundColor: "$surface1",
    borderRadius: "$4",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "$borderColor",
    padding: "$1",
    minWidth: "180px",
    boxShadow: "var(--shadowMd)",
  },
  "ContextMenuContent"
)

const MenuItemBtn = styled(
  "button",
  {
    display: "flex",
    flexDirection: "row",
    boxSizing: "border-box",
    appearance: "none",
    border: "none",
    background: "none",
    padding: "0px",
    margin: "0px",
    fontFamily: "inherit",
    width: "100%",
    textAlign: "left",
  },
  "ContextMenuItem"
)

const MenuItemText = styled(
  "span",
  { fontSize: "$14", fontFamily: "$body", color: "$color" },
  "ContextMenuItemText"
)

const ShortcutText = styled(
  "span",
  { fontSize: "$12", fontFamily: "$code", color: "$secondaryText12", marginLeft: "14px" },
  "ContextMenuShortcut"
)

const LabelText = styled(
  "span",
  { fontSize: "$12", fontWeight: "$600", color: "$secondaryText12", fontFamily: "$body" },
  "ContextMenuLabel"
)

const SeparatorLine = styled(
  "div",
  {
    height: "1px",
    backgroundColor: "$borderColor",
    marginTop: "2px",
    marginBottom: "2px",
  },
  "ContextMenuSeparator"
)

export interface ContextMenuRootProps {
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

export interface ContextMenuItemProps {
  children: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
  shortcut?: string
}

export interface ContextMenuCheckboxItemProps {
  children: React.ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

const ContextMenuContext = React.createContext<{
  close: () => void
}>({ close: () => {} })

function Root({ children, onOpenChange }: ContextMenuRootProps) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setPosition({ x: e.clientX, y: e.clientY })
      setOpen(true)
      onOpenChange?.(true)
    },
    [onOpenChange],
  )

  const close = useCallback(() => {
    setOpen(false)
    onOpenChange?.(false)
  }, [onOpenChange])

  let triggerContent: React.ReactNode = null
  let menuContent: React.ReactNode = null
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const props = child.props as { children?: React.ReactNode }
      if (child.type === Trigger) {
        triggerContent = props.children
      } else if (child.type === Content) {
        menuContent = props.children
      }
    }
  })

  return (
    <ContextMenuContext.Provider value={{ close }}>
      <div onContextMenu={handleContextMenu} style={{ display: 'contents' }}>
        {triggerContent}
      </div>
      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
            onClick={close}
          />
          <MenuContentFrame
            role="menu"
            style={{
              position: 'fixed',
              zIndex: 50,
              left: position.x,
              top: position.y,
            }}
          >
            {menuContent}
          </MenuContentFrame>
        </>
      )}
    </ContextMenuContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function Content({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function Item({ children, onSelect, disabled, shortcut }: ContextMenuItemProps) {
  const { close } = React.useContext(ContextMenuContext)

  return (
    <MenuItemBtn
      type="button"
      disabled={disabled}
      onClick={
        disabled
          ? undefined
          : () => {
              onSelect?.()
              close()
            }
      }
      role="menuitem"
      aria-disabled={disabled || undefined}
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 32,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <MenuItemText>{children}</MenuItemText>
      {shortcut && <ShortcutText>{shortcut}</ShortcutText>}
    </MenuItemBtn>
  )
}

function CheckSvg() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function CheckboxItem({
  children,
  checked,
  onCheckedChange,
  disabled,
}: ContextMenuCheckboxItemProps) {
  const { close } = React.useContext(ContextMenuContext)

  return (
    <MenuItemBtn
      type="button"
      disabled={disabled}
      onClick={
        disabled
          ? undefined
          : () => {
              onCheckedChange?.(!checked)
              close()
            }
      }
      role="menuitemcheckbox"
      aria-checked={checked}
      style={{
        alignItems: 'center',
        height: 32,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={{ width: 20, display: 'flex', alignItems: 'center' }}>
        {checked && <CheckSvg />}
      </span>
      <MenuItemText>{children}</MenuItemText>
    </MenuItemBtn>
  )
}

function Separator() {
  return <SeparatorLine />
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 2 }}>
      <LabelText>{children}</LabelText>
    </div>
  )
}

export const ContextMenu = {
  Root,
  Trigger,
  Content,
  Item,
  CheckboxItem,
  Separator,
  Label,
}
