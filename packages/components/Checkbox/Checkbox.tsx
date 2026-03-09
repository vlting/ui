import { Checkbox as TamaguiCheckbox } from '@tamagui/checkbox'
import type React from 'react'
import type { ComponentType } from 'react'

// Tamagui v2 RC GetProps bug — cast for JSX usage
const CheckboxButton = TamaguiCheckbox as ComponentType<Record<string, unknown>>
const CheckboxIndicator = TamaguiCheckbox.Indicator as ComponentType<
  Record<string, unknown>
>

function CheckSvg({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function MinusSvg({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}

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

const ICON_SIZE_MAP: Record<string, number> = { sm: 12, md: 14, lg: 18 }

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
  const isChecked = checked === true
  const isIndeterminate = checked === 'indeterminate'

  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
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
        borderWidth={2}
        borderColor={isChecked || isIndeterminate ? '$color10' : '$borderColor'}
        backgroundColor={isChecked || isIndeterminate ? '$color10' : 'transparent'}
        color={isChecked || isIndeterminate ? '$color1' : '$color'}
        hoverStyle={{
          borderColor: '$color8',
        }}
        focusVisibleStyle={{
          outlineWidth: 2,
          outlineOffset: 2,
          outlineColor: '$color8',
          outlineStyle: 'solid',
        }}
      >
        <CheckboxIndicator>
          {isIndeterminate ? (
            <MinusSvg size={ICON_SIZE_MAP[size]} />
          ) : (
            <CheckSvg size={ICON_SIZE_MAP[size]} />
          )}
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
