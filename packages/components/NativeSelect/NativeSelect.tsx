import { styledHtml } from '@tamagui/web'
import type { ComponentType } from 'react'
import type React from 'react'

const SelectFrame = styledHtml('select', {
  display: 'flex',
  width: '100%',
  appearance: 'none',
  backgroundColor: '$background',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '$borderColor',
  borderRadius: '$4',
  color: '$color',
  fontFamily: '$body',
  cursor: 'pointer',
  outline: 'none',

  // Custom arrow via background image
  backgroundImage:
    'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")',
  backgroundPosition: 'right 8px center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '16px',

  variants: {
    size: {
      sm: {
        height: 32,
        paddingLeft: 10,
        paddingRight: 28,
        fontSize: 13,
      },
      md: {
        height: 36,
        paddingLeft: 12,
        paddingRight: 32,
        fontSize: 14,
      },
      lg: {
        height: 40,
        paddingLeft: 14,
        paddingRight: 36,
        fontSize: 14,
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
} as any)

const OptionFrame = styledHtml('option', {} as any)

// Cast for JSX usage — v2 RC GetFinalProps bug
const SelectJsx = SelectFrame as ComponentType<Record<string, unknown>>
const OptionJsx = OptionFrame as ComponentType<Record<string, unknown>>

export interface NativeSelectRootProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  name?: string
  'aria-label'?: string
}

export interface NativeSelectOptionProps {
  children: React.ReactNode
  value: string
  disabled?: boolean
}

function Root({
  children,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  size = 'md',
  name,
  'aria-label': ariaLabel,
}: NativeSelectRootProps) {
  return (
    <SelectJsx
      value={value}
      defaultValue={defaultValue}
      onChange={(e: any) => onValueChange?.(e.target.value)}
      disabled={disabled || undefined}
      size={size}
      name={name}
      aria-label={ariaLabel}
    >
      {placeholder && (
        <OptionJsx value="" disabled>
          {placeholder}
        </OptionJsx>
      )}
      {children}
    </SelectJsx>
  )
}

function Option({ children, value, disabled }: NativeSelectOptionProps) {
  return (
    <OptionJsx value={value} disabled={disabled || undefined}>
      {children}
    </OptionJsx>
  )
}

export const NativeSelect = { Root, Option }
