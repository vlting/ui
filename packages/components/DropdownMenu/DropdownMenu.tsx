import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

const TriggerBtn = styledHtml('button', {
  display: 'inline-flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  cursor: 'pointer',
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const TriggerBtnJsx = TriggerBtn as AnyFC

const MenuItemBtn = styledHtml('button', {
  display: 'flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'inherit',
  width: '100%',
  textAlign: 'left',
  focusVisibleStyle: {
    backgroundColor: '$color2',
    outlineWidth: 2,
    outlineOffset: -2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
} as any)
const MenuItemBtnJsx = MenuItemBtn as AnyFC

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
    // Return focus to trigger when closing
    triggerRef.current?.focus()
  }, [setOpen])

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, close, triggerRef }}>
      <ViewJsx position="relative" display="inline-flex">
        {children}
      </ViewJsx>
      {open && modal !== false && (
        <ViewJsx
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={49}
          onPress={close}
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
    <TriggerBtnJsx
      ref={triggerRef}
      type="button"
      onClick={() => setOpen(!open)}
      aria-haspopup="menu"
      aria-expanded={open}
      onKeyDown={handleKeyDown}
    >
      {children}
    </TriggerBtnJsx>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  const { open, close } = React.useContext(DropdownMenuContext)
  const contentRef = useRef<HTMLDivElement>(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  // Focus first item when menu opens
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
      // Enter/Space handled on individual items via onPress
    },
    [close, focusedIndex],
  )

  if (!open) return null

  return (
    <ViewJsx
      ref={contentRef}
      position="absolute"
      top="100%"
      left={0}
      marginTop="$0.5"
      zIndex={50}
      backgroundColor="$background"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$4"
      padding="$0.5"
      minWidth={192}
      style={{ boxShadow: 'var(--shadowMd)' }}
      role="menu"
      onKeyDown={handleKeyDown}
    >
      {children}
    </ViewJsx>
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
    <MenuItemBtnJsx
      type="button"
      alignItems="center"
      justifyContent="space-between"
      height="$2.5"
      paddingLeft="$0.75"
      paddingRight="$0.75"
      borderRadius="$2"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      hoverStyle={disabled ? undefined : { backgroundColor: '$color2' }}
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
      aria-disabled={disabled}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <TextJsx fontSize="$4" fontFamily="$body" color="$color">
        {children}
      </TextJsx>
      {shortcut && (
        <TextJsx
          fontSize="$2"
          fontFamily="$mono"
          color="$colorSubtitle"
          marginLeft="$3.5"
        >
          {shortcut}
        </TextJsx>
      )}
    </MenuItemBtnJsx>
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
    <MenuItemBtnJsx
      type="button"
      alignItems="center"
      height="$2.5"
      paddingLeft="$0.75"
      paddingRight="$0.75"
      borderRadius="$2"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      hoverStyle={disabled ? undefined : { backgroundColor: '$color2' }}
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
    >
      <ViewJsx width={16} alignItems="center">
        {checked && (
          <TextJsx fontSize="$2" color="$color">
            {'\u2713'}
          </TextJsx>
        )}
      </ViewJsx>
      <TextJsx fontSize="$4" fontFamily="$body" color="$color">
        {children}
      </TextJsx>
    </MenuItemBtnJsx>
  )
}

function Separator() {
  return (
    <ViewJsx
      height={1}
      backgroundColor="$borderColor"
      marginTop="$0.5"
      marginBottom="$0.5"
      marginLeft={-4}
      marginRight={-4}
    />
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <ViewJsx
      paddingLeft="$0.75"
      paddingRight="$0.75"
      paddingTop={6}
      paddingBottom="$0.25"
    >
      <TextJsx fontSize="$2" fontWeight="600" color="$colorSubtitle" fontFamily="$body">
        {children}
      </TextJsx>
    </ViewJsx>
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
