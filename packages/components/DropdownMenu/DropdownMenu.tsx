import type { ComponentType } from 'react'
import React, { useCallback, useState } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

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
}>({ open: false, setOpen: () => {}, close: () => {} })

function Root({ children, open: controlledOpen, onOpenChange, modal }: DropdownMenuRootProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen

  const setOpen = useCallback(
    (v: boolean) => {
      setInternalOpen(v)
      onOpenChange?.(v)
    },
    [onOpenChange],
  )

  const close = useCallback(() => setOpen(false), [setOpen])

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, close }}>
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
  const { open, setOpen } = React.useContext(DropdownMenuContext)
  return (
    <ViewJsx
      onPress={() => setOpen(!open)}
      display="inline-flex"
      cursor="pointer"
      aria-haspopup="menu"
      aria-expanded={open}
    >
      {children}
    </ViewJsx>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  const { open } = React.useContext(DropdownMenuContext)

  if (!open) return null

  return (
    <ViewJsx
      position="absolute"
      top="100%"
      left={0}
      marginTop={4}
      zIndex={50}
      backgroundColor="$background"
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$4"
      padding={4}
      minWidth={192}
      style={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
      role="menu"
    >
      {children}
    </ViewJsx>
  )
}

function Item({ children, onSelect, disabled, shortcut }: DropdownMenuItemProps) {
  const { close } = React.useContext(DropdownMenuContext)

  return (
    <ViewJsx
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      height={32}
      paddingLeft={8}
      paddingRight={8}
      borderRadius="$2"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      hoverStyle={disabled ? undefined : { backgroundColor: '$color2' }}
      onPress={
        disabled
          ? undefined
          : () => {
              onSelect?.()
              close()
            }
      }
      role="menuitem"
      aria-disabled={disabled}
    >
      <TextJsx fontSize={14} fontFamily="$body" color="$color">
        {children}
      </TextJsx>
      {shortcut && (
        <TextJsx fontSize={12} fontFamily="$mono" color="$colorSubtitle" marginLeft={24}>
          {shortcut}
        </TextJsx>
      )}
    </ViewJsx>
  )
}

function CheckboxItem({ children, checked, onCheckedChange, disabled }: DropdownMenuCheckboxItemProps) {
  const { close } = React.useContext(DropdownMenuContext)

  return (
    <ViewJsx
      flexDirection="row"
      alignItems="center"
      height={32}
      paddingLeft={8}
      paddingRight={8}
      borderRadius="$2"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      hoverStyle={disabled ? undefined : { backgroundColor: '$color2' }}
      onPress={
        disabled
          ? undefined
          : () => {
              onCheckedChange?.(!checked)
              close()
            }
      }
      role="menuitemcheckbox"
      aria-checked={checked}
    >
      <ViewJsx width={16} alignItems="center">
        {checked && <TextJsx fontSize={12} color="$color">{'\u2713'}</TextJsx>}
      </ViewJsx>
      <TextJsx fontSize={14} fontFamily="$body" color="$color">
        {children}
      </TextJsx>
    </ViewJsx>
  )
}

function Separator() {
  return <ViewJsx height={1} backgroundColor="$borderColor" marginTop={4} marginBottom={4} marginLeft={-4} marginRight={-4} />
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <ViewJsx paddingLeft={8} paddingRight={8} paddingTop={6} paddingBottom={2}>
      <TextJsx fontSize={12} fontWeight="600" color="$colorSubtitle" fontFamily="$body">
        {children}
      </TextJsx>
    </ViewJsx>
  )
}

export const DropdownMenu = { Root, Trigger, Content, Item, CheckboxItem, Separator, Label }
