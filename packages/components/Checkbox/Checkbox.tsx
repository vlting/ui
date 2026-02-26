import { Checkbox as TamaguiCheckbox } from '@tamagui/checkbox'
import type React from 'react'
import type { ComponentType } from 'react'
import { Text, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const CheckIcon = styled(Text, {
  color: '$color1',
  fontSize: 14,
  fontWeight: '700',
  lineHeight: 14,
})

// Tamagui v2 RC GetProps bug — cast for JSX usage
const CheckboxButton = TamaguiCheckbox as ComponentType<Record<string, unknown>>
const CheckboxIndicator = TamaguiCheckbox.Indicator as ComponentType<
  Record<string, unknown>
>
const CheckIconText = CheckIcon as ComponentType<Record<string, unknown>>

const SIZE_MAP = { sm: '$3' as const, md: '$4' as const, lg: '$5' as const }

export interface CheckboxRootProps {
  children?: React.ReactNode
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
  name?: string
  value?: string
}

function Root({
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  size = 'md',
  required,
  name,
  value,
}: CheckboxRootProps) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        userSelect: 'none',
      }}
    >
      <CheckboxButton
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        size={SIZE_MAP[size]}
        required={required}
        name={name}
        value={value}
        borderRadius="$2"
        borderWidth={1}
        borderColor="$borderColor"
        backgroundColor="transparent"
        focusVisibleStyle={{
          outlineWidth: 2,
          outlineOffset: 1,
          outlineColor: '$color10',
          outlineStyle: 'solid',
        }}
      >
        <CheckboxIndicator>
          <CheckIconText>✓</CheckIconText>
        </CheckboxIndicator>
      </CheckboxButton>
      {children}
    </label>
  )
}

function Indicator({ children }: { children?: React.ReactNode }) {
  return <CheckboxIndicator>{children}</CheckboxIndicator>
}

export const Checkbox = { Root, Indicator }
