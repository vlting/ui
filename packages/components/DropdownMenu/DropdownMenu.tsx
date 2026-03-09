import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const MenuContentFrame = styled(
  "div",
  {
    backgroundColor: "$surface1",
    borderRadius: "$4",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "$borderColor",
    padding: "2px",
    minWidth: "180px",
    boxShadow: "var(--shadowMd)",
  },
  "DropdownMenuContent"
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
  "DropdownMenuItem"
)

const MenuItemText = styled(
  "span",
  { fontSize: "$16", fontFamily: "$body", color: "$color" },
  "DropdownMenuItemText"
)

const ShortcutText = styled(
  "span",
  { fontSize: "$12", fontFamily: "$code", color: "$secondaryText12", marginLeft: "14px" },
  "DropdownMenuShortcut"
)

const LabelText = styled(
  "span",
  { fontSize: "$12", fontWeight: "$600", color: "$secondaryText12", fontFamily: "$body" },
  "DropdownMenuLabel"
)

const SeparatorLine = styled(
  "div",
  {
    height: "1px",
    backgroundColor: "$borderColor",
    marginTop: "2px",
    marginBottom: "2px",
    marginLeft: "-2px",
    marginRight: "-2px",
  },
  "DropdownMenuSeparator"
)

export interface DropdownMenuRootProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean
}

export interface DropdownMenuItemProps {
  children: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
  shortcut?: string
}

export interface DropdownMenuCheckboxItemProps {
  children: React.ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

const DropdownMenuContext = React.createContext<{
  open: boolean
  setOpen: (v: boolean) => void
  close: () => void
  triggerRef: React.RefObject<HTMLElement | null>
}>({ open: false, setOpen: () => {}, close: () => {}, triggerRef: { current: null } })

function Root({
  children,
  open: controlledOpen,
  onOpenChange,
  modal,
}: DropdownMenuRootProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen
  const triggerRef = useRef<HTMLElement | null>(null)

  const setOpen = useCallback(
    (v: boolean) => {
      setInternalOpen(v)
      onOpenChange?.(v)
    },
    [onOpenChange],
  )

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [setOpen])

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, close, triggerRef }}>
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        {children}
      </div>
      {open && modal !== false && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          onClick={close}
        />
      )}
    </DropdownMenuContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { open, setOpen, close, triggerRef } = React.useContext(DropdownMenuContext)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (!open) setOpen(true)
      } else if (e.key === 'Escape' && open) {
        e.preventDefault()
        close()
      }
    },
    [open, setOpen, close],
  )

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={() => setOpen(!open)}
      aria-haspopup="menu"
      aria-expanded={open}
      onKeyDown={handleKeyDown}
      style={{
        display: 'inline-flex',
        appearance: 'none',
        border: 'none',
        background: 'none',
        padding: 0,
        margin: 0,
        fontFamily: 'inherit',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  const { open, close } = React.useContext(DropdownMenuContext)
  const contentRef = useRef<HTMLDivElement>(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  useEffect(() => {
    if (open && contentRef.current) {
      setFocusedIndex(0)
      const items = contentRef.current.querySelectorAll(
        '[role="menuitem"], [role="menuitemcheckbox"]',
      )
      if (items.length > 0) {
        ;(items[0] as HTMLElement).focus()
      }
    }
    if (!open) setFocusedIndex(-1)
  }, [open])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const container = contentRef.current
      if (!container) return

      const items = Array.from(
        container.querySelectorAll(
          '[role="menuitem"]:not([aria-disabled="true"]), [role="menuitemcheckbox"]:not([aria-disabled="true"])',
        ),
      ) as HTMLElement[]
      if (items.length === 0) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = focusedIndex + 1 >= items.length ? 0 : focusedIndex + 1
        setFocusedIndex(next)
        items[next]?.focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = focusedIndex - 1 < 0 ? items.length - 1 : focusedIndex - 1
        setFocusedIndex(prev)
        items[prev]?.focus()
      } else if (e.key === 'Home') {
        e.preventDefault()
        setFocusedIndex(0)
        items[0]?.focus()
      } else if (e.key === 'End') {
        e.preventDefault()
        setFocusedIndex(items.length - 1)
        items[items.length - 1]?.focus()
      } else if (e.key === 'Escape' || e.key === 'Tab') {
        e.preventDefault()
        close()
      }
    },
    [close, focusedIndex],
  )

  if (!open) return null

  return (
    <MenuContentFrame
      ref={contentRef}
      role="menu"
      onKeyDown={handleKeyDown}
      style={{ position: 'absolute', top: '100%', left: 0, marginTop: 2, zIndex: 50 }}
    >
      {children}
    </MenuContentFrame>
  )
}

function Item({ children, onSelect, disabled, shortcut }: DropdownMenuItemProps) {
  const { close } = React.useContext(DropdownMenuContext)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
        e.preventDefault()
        onSelect?.()
        close()
      }
    },
    [disabled, onSelect, close],
  )

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
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 28,
        paddingLeft: 6,
        paddingRight: 6,
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

function CheckboxItem({
  children,
  checked,
  onCheckedChange,
  disabled,
}: DropdownMenuCheckboxItemProps) {
  const { close } = React.useContext(DropdownMenuContext)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
        e.preventDefault()
        onCheckedChange?.(!checked)
        close()
      }
    },
    [disabled, checked, onCheckedChange, close],
  )

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
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      style={{
        alignItems: 'center',
        height: 28,
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={{ width: 16, display: 'flex', alignItems: 'center' }}>
        {checked && (
          <MenuItemText>{'\u2713'}</MenuItemText>
        )}
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
    <div style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 6, paddingBottom: 2 }}>
      <LabelText>{children}</LabelText>
    </div>
  )
}

export const DropdownMenu = {
  Root,
  Trigger,
  Content,
  Item,
  CheckboxItem,
  Separator,
  Label,
}
