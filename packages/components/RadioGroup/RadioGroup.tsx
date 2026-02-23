import React, { useRef } from 'react'
import type { ComponentType } from 'react'
import { XStack, YStack } from 'tamagui'
import { RadioGroup as TamaguiRadioGroup } from '@tamagui/radio-group'

// Tamagui v2 RC GetProps bug — cast for JSX usage
const RadioGroupRoot = TamaguiRadioGroup as unknown as ComponentType<Record<string, unknown>>
const RadioGroupItem = TamaguiRadioGroup.Item as unknown as ComponentType<Record<string, unknown>>
const RadioGroupIndicator = TamaguiRadioGroup.Indicator as unknown as ComponentType<Record<string, unknown>>

const SIZE_MAP = { sm: '$3' as const, md: '$4' as const, lg: '$5' as const }

export interface RadioGroupRootProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'horizontal' | 'vertical'
}

const RadioGroupSizeContext = React.createContext<'sm' | 'md' | 'lg'>('md')

function Root({
  children,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  name,
  size = 'md',
  orientation = 'vertical',
}: RadioGroupRootProps) {
  const Container = orientation === 'horizontal' ? XStack : YStack

  return (
    <RadioGroupSizeContext.Provider value={size}>
      <RadioGroupRoot
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
        orientation={orientation}
      >
        {/* @ts-expect-error Tamagui v2 RC */}
        <Container gap="$2">
          {children}
        </Container>
      </RadioGroupRoot>
    </RadioGroupSizeContext.Provider>
  )
}

export interface RadioGroupItemProps {
  value: string
  disabled?: boolean
  children?: React.ReactNode
}

function Item({
  value: itemValue,
  disabled: itemDisabled,
  children,
}: RadioGroupItemProps) {
  const size = React.useContext(RadioGroupSizeContext)
  const itemRef = useRef<HTMLButtonElement>(null)

  return (
    // @ts-expect-error Tamagui v2 RC
    <XStack alignItems="center" gap="$2">
      <RadioGroupItem
        ref={itemRef}
        value={itemValue}
        disabled={itemDisabled}
        size={SIZE_MAP[size]}
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius={1000}
        backgroundColor="transparent"
      >
        <RadioGroupIndicator
          backgroundColor="$color10"
          borderRadius={1000}
        />
      </RadioGroupItem>
      {children && (
        <span
          onClick={() => !itemDisabled && itemRef.current?.click()}
          style={{ cursor: itemDisabled ? 'not-allowed' : 'pointer' }}
        >
          {children}
        </span>
      )}
    </XStack>
  )
}

export const RadioGroup = { Root, Item }
