import React from 'react'
import type { ComponentType } from 'react'
import { Text, View, styled, withStaticProperties } from 'tamagui'
import { Select as TamaguiSelect } from '@tamagui/select'

type AnyFC = ComponentType<Record<string, unknown>>

// @ts-expect-error Tamagui v2 RC
const ChevronIcon = styled(Text, {
  color: '$color',
  fontSize: 12,
})

// Tamagui v2 RC GetProps bug — cast for JSX usage
const SelectRoot = TamaguiSelect as AnyFC
const SelectTrigger = TamaguiSelect.Trigger as AnyFC
const SelectValueJsx = TamaguiSelect.Value as AnyFC
const SelectContent = TamaguiSelect.Content as AnyFC
const SelectViewport = TamaguiSelect.Viewport as AnyFC
const SelectTamaguiItem = TamaguiSelect.Item as unknown as AnyFC
const SelectItemText = TamaguiSelect.ItemText as AnyFC
const ChevronText = ChevronIcon as AnyFC
const SelectGroupJsx = TamaguiSelect.Group as AnyFC

// @ts-expect-error Tamagui v2 RC
const SelectLabelText = styled(Text, {
  fontFamily: '$body',
  fontSize: '$2',
  fontWeight: '$3',
  color: '$colorSubtitle',
  paddingHorizontal: '$3',
  paddingVertical: '$1',
})

// @ts-expect-error Tamagui v2 RC
const SelectSeparatorFrame = styled(View, {
  height: 1,
  backgroundColor: '$borderColor',
  marginVertical: '$1',
})

const SelectLabelJsx = SelectLabelText as AnyFC
const SelectSeparatorJsx = SelectSeparatorFrame as AnyFC

const SIZE_MAP = { sm: '$3.5' as const, md: '$4' as const, lg: '$4.5' as const }
const SIZE_PADDING_MAP = {
  sm: { h: '$2', v: '$1', fontSize: '$2' },
  md: { h: '$3', v: '$2', fontSize: '$3' },
  lg: { h: '$4', v: '$2.5', fontSize: '$4' },
} as const

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

  const sizePadding = SIZE_PADDING_MAP[size]

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
        paddingHorizontal={sizePadding.h}
        paddingVertical={sizePadding.v}
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        backgroundColor="$background"
        gap="$2"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        opacity={disabled ? 0.5 : 1}
        focusVisibleStyle={{
          outlineWidth: 2,
          outlineOffset: 1,
          outlineColor: '$outlineColor',
          outlineStyle: 'solid',
        }}
      >
        <SelectValueJsx placeholder={placeholder} fontSize={sizePadding.fontSize} />
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

function SelectValue({ placeholder }: { placeholder?: string }) {
  return <SelectValueJsx placeholder={placeholder} />
}

function SelectGroupComponent({ children }: { children: React.ReactNode }) {
  return <SelectGroupJsx>{children}</SelectGroupJsx>
}

function SelectLabel({ children }: { children: React.ReactNode }) {
  return <SelectLabelJsx>{children}</SelectLabelJsx>
}

function SelectSeparator() {
  return <SelectSeparatorJsx />
}

export const Select = withStaticProperties(SelectRootComponent, {
  Item: SelectItem,
  Value: SelectValue,
  Group: SelectGroupComponent,
  Label: SelectLabel,
  Separator: SelectSeparator,
})
