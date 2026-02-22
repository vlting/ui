import type React from 'react'
import { createContext, useContext } from 'react'
import { View, XStack, YStack, styled } from 'tamagui'
import { useControllableState } from '../../hooks/useControllableState'

interface RadioGroupContextValue {
  value: string | undefined
  onValueChange: (value: string) => void
  disabled: boolean
  name?: string
  size: 'sm' | 'md' | 'lg'
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function useRadioGroupContext() {
  const ctx = useContext(RadioGroupContext)
  if (!ctx) throw new Error('RadioGroup components must be used within RadioGroup.Root')
  return ctx
}

// @ts-expect-error Tamagui v2 RC
const StyledIndicator = styled(View, {
  borderRadius: 1000,
  backgroundColor: '$color10',

  variants: {
    size: {
      sm: { width: 8, height: 8 },
      md: { width: 10, height: 10 },
      lg: { width: 12, height: 12 },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const StyledCircle = styled(View, {
  borderRadius: 1000,
  borderWidth: 1,
  borderColor: '$borderColor',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',

  variants: {
    checked: {
      true: {
        borderColor: '$color10',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
    size: {
      sm: { width: 16, height: 16 },
      md: { width: 20, height: 20 },
      lg: { width: 24, height: 24 },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

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

function Root({
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled = false,
  name,
  size = 'md',
  orientation = 'vertical',
}: RadioGroupRootProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const Container = orientation === 'horizontal' ? XStack : YStack

  return (
    <RadioGroupContext.Provider
      value={{ value, onValueChange: setValue, disabled, name, size }}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <Container role="radiogroup" gap="$2">
        {children}
      </Container>
    </RadioGroupContext.Provider>
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
  const {
    value,
    onValueChange,
    disabled: groupDisabled,
    name,
    size,
  } = useRadioGroupContext()
  const isChecked = value === itemValue
  const isDisabled = itemDisabled || groupDisabled

  return (
    <XStack alignItems="center" gap="$2">
      <button
        type="button"
        role="radio"
        aria-checked={isChecked}
        disabled={isDisabled}
        onClick={() => !isDisabled && onValueChange(itemValue)}
        style={{
          all: 'unset',
          display: 'inline-flex',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
      >
        {/* @ts-expect-error Tamagui v2 RC */}
        <StyledCircle checked={isChecked} disabled={isDisabled} size={size}>
          {/* @ts-expect-error Tamagui v2 RC */}
          {isChecked && <StyledIndicator size={size} />}
        </StyledCircle>
      </button>
      {children}
      {name && (
        <input
          type="radio"
          aria-hidden
          tabIndex={-1}
          name={name}
          value={itemValue}
          checked={isChecked}
          onChange={() => {}}
          style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            width: 0,
            height: 0,
          }}
        />
      )}
    </XStack>
  )
}

export const RadioGroup = { Root, Item }
