import { type ReactNode, createContext, forwardRef, useContext, useState } from 'react'
import { Pressable, Text as RNText, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'
import { useControllableState } from '../../headless/src/useControllableState'

// ─── Context ────────────────────────────────────────────────────────────────

interface RadioGroupContextValue {
  value: string | undefined
  onValueChange: (value: string) => void
  disabled?: boolean
  error?: boolean
  size: 'sm' | 'md' | 'lg'
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function useRadioGroup() {
  const ctx = useContext(RadioGroupContext)
  if (!ctx) throw new Error('RadioGroup.Item must be used within RadioGroup.Root')
  return ctx
}

// ─── Styled ─────────────────────────────────────────────────────────────────

const RootContainer = styled(View, {
  gap: 8,
}, {
  orientation: {
    vertical: { flexDirection: 'column' },
    horizontal: { flexDirection: 'row' },
  },
}, 'RadioGroupRoot')

const ItemLabel = styled(Pressable, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  paddingVertical: 2,
  paddingHorizontal: 4,
}, {
  size: {
    sm: {},
    md: {},
    lg: {},
  },
  disabled: {
    true: { opacity: 0.5 },
  },
}, 'RadioItem')

const RadioCircle = styled(View, {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 999,
  borderWidth: 1,
  borderColor: '$neutral6',
  backgroundColor: 'transparent',
}, {
  size: {
    sm: { width: 16, height: 16 },
    md: { width: 20, height: 20 },
    lg: { width: 24, height: 24 },
  },
  selected: {
    true: { borderColor: '$primary9' },
  },
  error: {
    true: { borderColor: '$error9' },
  },
}, 'RadioCircle')

const RadioDot = styled(View, {
  borderRadius: 999,
  backgroundColor: '$primary9',
}, {
  size: {
    sm: { width: 8, height: 8 },
    md: { width: 8, height: 8 },
    lg: { width: 12, height: 12 },
  },
  error: {
    true: { backgroundColor: '$error9' },
  },
}, 'RadioDot')

const ItemText = styled(RNText, {
  color: '$defaultBody',
}, {
  size: {
    sm: { fontSize: 13 },
    md: { fontSize: 14 },
    lg: { fontSize: 15 },
  },
}, 'RadioLabel')

// ─── Types ──────────────────────────────────────────────────────────────────

export interface RadioGroupRootProps {
  children?: ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  error?: boolean
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'vertical' | 'horizontal'
  style?: ViewStyle
}

export interface RadioGroupItemProps {
  value: string
  disabled?: boolean
  children?: ReactNode
}

// ─── Root ───────────────────────────────────────────────────────────────────

const Root = forwardRef<View, RadioGroupRootProps>(
  ({
    value: valueProp,
    defaultValue,
    onValueChange,
    disabled,
    error,
    size = 'md',
    orientation = 'vertical',
    children,
    ...rest
  }, ref) => {
    const [value, setValue] = useControllableState<string | undefined>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: (v) => { if (v !== undefined) onValueChange?.(v) },
    })

    return (
      <RadioGroupContext.Provider
        value={{
          value,
          onValueChange: (v) => !disabled && setValue(v),
          disabled,
          error,
          size,
        }}
      >
        <RootContainer
          ref={ref}
          orientation={orientation}
          accessibilityRole="radiogroup"
          {...rest}
        >
          {children}
        </RootContainer>
      </RadioGroupContext.Provider>
    )
  },
)
Root.displayName = 'RadioGroup.Root'

// ─── Item ───────────────────────────────────────────────────────────────────

const Item = forwardRef<View, RadioGroupItemProps>(
  ({ value: itemValue, disabled: itemDisabled, children }, ref) => {
    const ctx = useRadioGroup()
    const isDisabled = ctx.disabled || itemDisabled
    const isSelected = ctx.value === itemValue

    return (
      <ItemLabel
        ref={ref}
        size={ctx.size}
        disabled={isDisabled}
        onPress={isDisabled ? undefined : () => ctx.onValueChange(itemValue)}
        accessibilityRole="radio"
        accessibilityState={{ selected: isSelected, disabled: isDisabled }}
      >
        <RadioCircle size={ctx.size} selected={isSelected} error={ctx.error}>
          {isSelected && <RadioDot size={ctx.size} error={ctx.error} />}
        </RadioCircle>
        {typeof children === 'string' ? (
          <ItemText size={ctx.size}>{children}</ItemText>
        ) : (
          children
        )}
      </ItemLabel>
    )
  },
)
Item.displayName = 'RadioGroup.Item'

// ─── Export ─────────────────────────────────────────────────────────────────

export const RadioGroup = { Root, Item }
