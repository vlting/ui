import { Menu as TamaguiMenu } from '@tamagui/menu'
import type React from 'react'
import type { ComponentType } from 'react'

// Tamagui v2 RC GetProps bug — cast for JSX usage
const MenuRoot = TamaguiMenu as ComponentType<Record<string, unknown>>
const MenuTrigger = TamaguiMenu.Trigger as ComponentType<Record<string, unknown>>
const MenuPortal = TamaguiMenu.Portal as ComponentType<Record<string, unknown>>
const MenuContent = TamaguiMenu.Content as ComponentType<Record<string, unknown>>
const MenuGroup = TamaguiMenu.Group as ComponentType<Record<string, unknown>>
const MenuLabel = TamaguiMenu.Label as ComponentType<Record<string, unknown>>
const MenuItem = TamaguiMenu.Item as ComponentType<Record<string, unknown>>
const MenuItemTitle = TamaguiMenu.ItemTitle as ComponentType<Record<string, unknown>>
const MenuItemSubtitle = TamaguiMenu.ItemSubtitle as ComponentType<
  Record<string, unknown>
>
const MenuItemIcon = TamaguiMenu.ItemIcon as ComponentType<Record<string, unknown>>
const MenuCheckboxItem = TamaguiMenu.CheckboxItem as ComponentType<
  Record<string, unknown>
>
const MenuRadioGroup = TamaguiMenu.RadioGroup as ComponentType<Record<string, unknown>>
const MenuRadioItem = TamaguiMenu.RadioItem as ComponentType<Record<string, unknown>>
const MenuItemIndicator = TamaguiMenu.ItemIndicator as ComponentType<
  Record<string, unknown>
>
const MenuSeparator = TamaguiMenu.Separator as ComponentType<Record<string, unknown>>
const MenuArrow = TamaguiMenu.Arrow as ComponentType<Record<string, unknown>>
const MenuSub = TamaguiMenu.Sub as ComponentType<Record<string, unknown>>
const MenuSubTrigger = TamaguiMenu.SubTrigger as ComponentType<Record<string, unknown>>
const MenuSubContent = TamaguiMenu.SubContent as ComponentType<Record<string, unknown>>

export interface MenuRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Root({ children, open, defaultOpen, onOpenChange }: MenuRootProps) {
  return (
    <MenuRoot open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </MenuRoot>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  return <MenuTrigger asChild>{children}</MenuTrigger>
}

function Portal({ children }: { children: React.ReactNode }) {
  return <MenuPortal>{children}</MenuPortal>
}

interface MenuContentProps {
  children: React.ReactNode
}

function Content({ children }: MenuContentProps) {
  return (
    <MenuContent
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$2"
      elevation="$4"
      minWidth={180}
      animation="medium"
      enterStyle={{ opacity: 0, scale: 0.95, y: -4 }}
      exitStyle={{ opacity: 0, scale: 0.95, y: -4 }}
    >
      {children}
    </MenuContent>
  )
}

function Group({ children }: { children: React.ReactNode }) {
  return <MenuGroup>{children}</MenuGroup>
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <MenuLabel
      paddingHorizontal="$3"
      paddingVertical="$1"
      color="$colorSubtitle"
      fontSize="$2"
      fontFamily="$body"
    >
      {children}
    </MenuLabel>
  )
}

interface MenuItemProps {
  children: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
}

function Item({ children, onSelect, disabled }: MenuItemProps) {
  return (
    <MenuItem
      onSelect={onSelect}
      disabled={disabled}
      paddingHorizontal="$3"
      paddingVertical="$2"
      borderRadius="$2"
      cursor="pointer"
      hoverStyle={{ backgroundColor: '$color4' }}
      focusStyle={{ backgroundColor: '$color4' }}
      opacity={disabled ? 0.5 : 1}
    >
      {children}
    </MenuItem>
  )
}

function ItemTitle({ children }: { children: React.ReactNode }) {
  return (
    <MenuItemTitle fontSize="$3" fontFamily="$body" color="$color">
      {children}
    </MenuItemTitle>
  )
}

function ItemSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <MenuItemSubtitle fontSize="$2" fontFamily="$body" color="$colorSubtitle">
      {children}
    </MenuItemSubtitle>
  )
}

function ItemIcon({ children }: { children: React.ReactNode }) {
  return <MenuItemIcon>{children}</MenuItemIcon>
}

interface CheckboxItemProps {
  children: React.ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

function CheckboxItem({
  children,
  checked,
  onCheckedChange,
  disabled,
}: CheckboxItemProps) {
  return (
    <MenuCheckboxItem
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      paddingHorizontal="$3"
      paddingVertical="$2"
      borderRadius="$2"
      cursor="pointer"
      hoverStyle={{ backgroundColor: '$color4' }}
      focusStyle={{ backgroundColor: '$color4' }}
      opacity={disabled ? 0.5 : 1}
    >
      {children}
    </MenuCheckboxItem>
  )
}

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
    <MenuRadioGroup value={value} onValueChange={onValueChange}>
      {children}
    </MenuRadioGroup>
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
  return (
    <MenuRadioItem
      value={value}
      disabled={disabled}
      paddingHorizontal="$3"
      paddingVertical="$2"
      borderRadius="$2"
      cursor="pointer"
      hoverStyle={{ backgroundColor: '$color4' }}
      focusStyle={{ backgroundColor: '$color4' }}
      opacity={disabled ? 0.5 : 1}
    >
      {children}
    </MenuRadioItem>
  )
}

function ItemIndicator({ children }: { children?: React.ReactNode }) {
  return <MenuItemIndicator>{children}</MenuItemIndicator>
}

function Separator() {
  return <MenuSeparator borderColor="$borderColor" marginVertical="$1" />
}

function Arrow() {
  return <MenuArrow borderWidth={1} borderColor="$borderColor" />
}

function Sub({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  return (
    <MenuSub open={open} onOpenChange={onOpenChange}>
      {children}
    </MenuSub>
  )
}

function SubTrigger({
  children,
  disabled,
}: {
  children: React.ReactNode
  disabled?: boolean
}) {
  return (
    <MenuSubTrigger
      disabled={disabled}
      paddingHorizontal="$3"
      paddingVertical="$2"
      borderRadius="$2"
      cursor="pointer"
      hoverStyle={{ backgroundColor: '$color4' }}
      focusStyle={{ backgroundColor: '$color4' }}
      opacity={disabled ? 0.5 : 1}
    >
      {children}
    </MenuSubTrigger>
  )
}

function SubContent({ children }: { children: React.ReactNode }) {
  return (
    <MenuSubContent
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      padding="$2"
      elevation="$4"
      minWidth={180}
      animation="medium"
      enterStyle={{ opacity: 0, scale: 0.95, x: -4 }}
      exitStyle={{ opacity: 0, scale: 0.95, x: -4 }}
    >
      {children}
    </MenuSubContent>
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
