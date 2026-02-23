import React from 'react'
import type { ComponentType } from 'react'
import { styled, Text } from 'tamagui'
import { Select as TamaguiSelect } from '@tamagui/select'
import { withStaticProperties } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const ChevronIcon = styled(Text, {
  color: '$color',
  fontSize: 12,
})

// Tamagui v2 RC GetProps bug — cast for JSX usage
const SelectRoot = TamaguiSelect as ComponentType<Record<string, unknown>>
const SelectTrigger = TamaguiSelect.Trigger as ComponentType<Record<string, unknown>>
const SelectValue = TamaguiSelect.Value as ComponentType<Record<string, unknown>>
const SelectContent = TamaguiSelect.Content as ComponentType<Record<string, unknown>>
const SelectViewport = TamaguiSelect.Viewport as ComponentType<Record<string, unknown>>
const SelectTamaguiItem = TamaguiSelect.Item as unknown as ComponentType<Record<string, unknown>>
const SelectItemText = TamaguiSelect.ItemText as ComponentType<Record<string, unknown>>
const ChevronText = ChevronIcon as ComponentType<Record<string, unknown>>

const SIZE_MAP = { sm: '$3.5' as const, md: '$4' as const, lg: '$4.5' as const }

export interface SelectProps {
  children?: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

function SelectRootComponent({
  children,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select...',
  size = 'md',
  disabled,
}: SelectProps) {
  // Inject index prop into SelectItem children for Tamagui's keyboard nav
  let index = 0
  const indexedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<{ _index?: number }>, {
        _index: index++,
      })
    }
    return child
  })

  return (
    <SelectRoot
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disablePreventBodyScroll
    >
      <SelectTrigger
        disabled={disabled}
        size={SIZE_MAP[size]}
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        backgroundColor="$background"
        gap="$2"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        opacity={disabled ? 0.5 : 1}
      >
        <SelectValue placeholder={placeholder} />
        <ChevronText>▾</ChevronText>
      </SelectTrigger>

      <SelectContent zIndex={1000}>
        <SelectViewport>
          {indexedChildren}
        </SelectViewport>
      </SelectContent>
    </SelectRoot>
  )
}

export interface SelectItemProps {
  value: string
  children?: React.ReactNode
  _index?: number
}

function SelectItem({ value: itemValue, children, _index = 0 }: SelectItemProps) {
  return (
    <SelectTamaguiItem
      value={itemValue}
      index={_index}
      paddingHorizontal="$3"
      paddingVertical="$2"
      cursor="pointer"
    >
      <SelectItemText fontFamily="$body" color="$color" fontSize="$3">
        {children}
      </SelectItemText>
    </SelectTamaguiItem>
  )
}

export const Select = withStaticProperties(SelectRootComponent, {
  Item: SelectItem,
})
