import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { styled } from '../../stl-react/src/config'

const MenuContentFrame = styled(
  "div",
  {
    backgroundColor: "$surface1",
    borderRadius: "$4",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "$borderColor",
    padding: "$2",
    minWidth: "180px",
    boxShadow: "var(--shadowMd)",
  },
  "MenuContent"
)

const MenuItemFrame = styled(
  "div",
  {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "$3",
    paddingRight: "$3",
    paddingTop: "$2",
    paddingBottom: "$2",
    borderRadius: "$2",
    cursor: "pointer",
    fontFamily: "$body",
    fontSize: "$14",
    color: "$color",
  },
  "MenuItem"
)

const MenuLabelFrame = styled(
  "div",
  {
    paddingLeft: "$3",
    paddingRight: "$3",
    paddingTop: "$1",
    paddingBottom: "$1",
    color: "$secondaryText12",
    fontSize: "$12",
    fontFamily: "$body",
  },
  "MenuLabel"
)

const MenuSeparatorFrame = styled(
  "div",
  {
    height: "1px",
    backgroundColor: "$borderColor",
    marginTop: "$1",
    marginBottom: "$1",
  },
  "MenuSeparator"
)

const MenuItemTitleText = styled(
  "span",
  { fontFamily: "$body", fontSize: "$14", color: "$color" },
  "MenuItemTitle"
)

const MenuItemSubtitleText = styled(
  "span",
  { fontFamily: "$body", fontSize: "$12", color: "$secondaryText12" },
  "MenuItemSubtitle"
)

const MenuContext = React.createContext<{
  open: boolean
  setOpen: (v: boolean) => void
  close: () => void
  triggerRef: React.RefObject<HTMLElement | null>
}>({ open: false, setOpen: () => {}, close: () => {}, triggerRef: { current: null } })

export interface MenuRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Root({ children, open: controlledOpen, defaultOpen, onOpenChange }: MenuRootProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false)
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
    <MenuContext.Provider value={{ open, setOpen, close, triggerRef }}>
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        {children}
      </div>
    </MenuContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { open, setOpen, close, triggerRef } = React.useContext(MenuContext)

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

function Portal({ children }: { children: React.ReactNode }) {
  if (typeof document === 'undefined') return null
  return createPortal(children, document.body)
}

interface MenuContentProps {
  children: React.ReactNode
}

function Content({ children }: MenuContentProps) {
  const { open, close } = React.useContext(MenuContext)
  const contentRef = useRef<HTMLDivElement>(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  useEffect(() => {
    if (open && contentRef.current) {
      setFocusedIndex(0)
      const items = contentRef.current.querySelectorAll(
        '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]',
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
          '[role="menuitem"]:not([aria-disabled="true"]), [role="menuitemcheckbox"]:not([aria-disabled="true"]), [role="menuitemradio"]:not([aria-disabled="true"])',
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
      style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 50 }}
    >
      {children}
    </MenuContentFrame>
  )
}

function Group({ children }: { children: React.ReactNode }) {
  return <div role="group">{children}</div>
}

function Label({ children }: { children: React.ReactNode }) {
  return <MenuLabelFrame>{children}</MenuLabelFrame>
}

interface MenuItemProps {
  children: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
}

function Item({ children, onSelect, disabled }: MenuItemProps) {
  const { close } = React.useContext(MenuContext)

  const handleClick = useCallback(() => {
    if (disabled) return
    onSelect?.()
    close()
  }, [disabled, onSelect, close])

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
    <MenuItemFrame
      role="menuitem"
      aria-disabled={disabled || undefined}
      tabIndex={-1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {children}
    </MenuItemFrame>
  )
}

function ItemTitle({ children }: { children: React.ReactNode }) {
  return <MenuItemTitleText>{children}</MenuItemTitleText>
}

function ItemSubtitle({ children }: { children: React.ReactNode }) {
  return <MenuItemSubtitleText>{children}</MenuItemSubtitleText>
}

function ItemIcon({ children }: { children: React.ReactNode }) {
  return <span style={{ display: 'flex', alignItems: 'center', marginRight: 8 }}>{children}</span>
}

interface CheckboxItemProps {
  children: React.ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

function CheckboxItem({ children, checked, onCheckedChange, disabled }: CheckboxItemProps) {
  const { close } = React.useContext(MenuContext)

  const handleClick = useCallback(() => {
    if (disabled) return
    onCheckedChange?.(!checked)
    close()
  }, [disabled, checked, onCheckedChange, close])

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
    <MenuItemFrame
      role="menuitemcheckbox"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      tabIndex={-1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <span style={{ width: 16, display: 'flex', alignItems: 'center' }}>
        {checked && '\u2713'}
      </span>
      {children}
    </MenuItemFrame>
  )
}

const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

function RadioGroup({
  children,
  value,
  onValueChange,
}: {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="group">{children}</div>
    </RadioGroupContext.Provider>
  )
}

function RadioItem({
  children,
  value,
  disabled,
}: {
  children: React.ReactNode
  value: string
  disabled?: boolean
}) {
  const { close } = React.useContext(MenuContext)
  const { value: selectedValue, onValueChange } = React.useContext(RadioGroupContext)
  const isChecked = selectedValue === value

  const handleClick = useCallback(() => {
    if (disabled) return
    onValueChange?.(value)
    close()
  }, [disabled, value, onValueChange, close])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
        e.preventDefault()
        onValueChange?.(value)
        close()
      }
    },
    [disabled, value, onValueChange, close],
  )

  return (
    <MenuItemFrame
      role="menuitemradio"
      aria-checked={isChecked}
      aria-disabled={disabled || undefined}
      tabIndex={-1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <span style={{ width: 16, display: 'flex', alignItems: 'center' }}>
        {isChecked && '\u2022'}
      </span>
      {children}
    </MenuItemFrame>
  )
}

function ItemIndicator({ children }: { children?: React.ReactNode }) {
  return <span style={{ display: 'flex', alignItems: 'center' }}>{children}</span>
}

function Separator() {
  return <MenuSeparatorFrame />
}

function Arrow() {
  return null
}

const SubContext = React.createContext<{
  open: boolean
  setOpen: (v: boolean) => void
}>({ open: false, setOpen: () => {} })

function Sub({
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen

  const setOpen = useCallback(
    (v: boolean) => {
      setInternalOpen(v)
      onOpenChange?.(v)
    },
    [onOpenChange],
  )

  return (
    <SubContext.Provider value={{ open, setOpen }}>
      <div style={{ position: 'relative' }}>{children}</div>
    </SubContext.Provider>
  )
}

function SubTrigger({
  children,
  disabled,
}: {
  children: React.ReactNode
  disabled?: boolean
}) {
  const { open, setOpen } = React.useContext(SubContext)

  return (
    <MenuItemFrame
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-disabled={disabled || undefined}
      tabIndex={-1}
      onMouseEnter={disabled ? undefined : () => setOpen(true)}
      onMouseLeave={disabled ? undefined : () => setOpen(false)}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight' && !disabled) {
          e.preventDefault()
          setOpen(true)
        } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
          e.preventDefault()
          setOpen(false)
        }
      }}
      style={{
        justifyContent: 'space-between',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
      <span aria-hidden>&#x25B8;</span>
    </MenuItemFrame>
  )
}

function SubContent({ children }: { children: React.ReactNode }) {
  const { open } = React.useContext(SubContext)

  if (!open) return null

  return (
    <MenuContentFrame
      role="menu"
      onMouseEnter={() => {}}
      style={{ position: 'absolute', left: '100%', top: 0, marginLeft: 4, zIndex: 51 }}
    >
      {children}
    </MenuContentFrame>
  )
}

export const Menu = {
  Root,
  Trigger,
  Portal,
  Content,
  Group,
  Label,
  Item,
  ItemTitle,
  ItemSubtitle,
  ItemIcon,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  ItemIndicator,
  Separator,
  Arrow,
  Sub,
  SubTrigger,
  SubContent,
}
