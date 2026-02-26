import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import React, { useCallback, useState } from 'react'
import { Text, View } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>
const ViewJsx = View as AnyFC
const TextJsx = Text as AnyFC

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

  // Separate Trigger and Content children
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
      <ViewJsx onContextMenu={handleContextMenu} display="contents">
        {triggerContent}
      </ViewJsx>
      {open && (
        <>
          {/* Backdrop */}
          <ViewJsx
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={49}
            onPress={close}
          />
          {/* Menu */}
          <ViewJsx
            position="fixed"
            zIndex={50}
            backgroundColor="$background"
            borderWidth={1}
            borderColor="$borderColor"
            borderRadius="$4"
            padding="$0.5"
            minWidth={192}
            shadowColor="$shadowMdColor"
            shadowRadius={8}
            shadowOffset={{ width: 0, height: 4 }}
            style={{
              left: position.x,
              top: position.y,
            }}
            role="menu"
          >
            {menuContent}
          </ViewJsx>
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
}: ContextMenuCheckboxItemProps) {
  const { close } = React.useContext(ContextMenuContext)

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

export const ContextMenu = {
  Root,
  Trigger,
  Content,
  Item,
  CheckboxItem,
  Separator,
  Label,
}
