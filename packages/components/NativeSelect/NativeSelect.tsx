import { styled } from '../../stl-react/src/config'
import type React from 'react'
import type { ComponentProps } from 'react'

const SelectFrame = styled(
  "select",
  {
    display: "flex",
    width: "100%",
    appearance: "none",
    backgroundColor: "$background",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "$borderColor",
    borderRadius: "$4",
    color: "$defaultBody",
    fontFamily: "$body",
    cursor: "pointer",
    outline: "none",
    backgroundImage:
      'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")',
    backgroundPosition: "right 8px center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "16px",
  },
  {
    size: {
      sm: { height: "$6", paddingLeft: "$2", paddingRight: "$8", fontSize: "$14" },
      md: { height: "$8", paddingLeft: "$3", paddingRight: "$10", fontSize: "$p" },
      lg: { height: "$10", paddingLeft: "$3", paddingRight: "$10", fontSize: "$p" },
    },
    disabled: {
      true: { opacity: "0.5", cursor: "not-allowed" },
    },
  },
  "NativeSelect"
)

const OptionFrame = styled("option", {}, "NativeSelectOption")

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
    <SelectFrame
      value={value}
      defaultValue={defaultValue}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onValueChange?.(e.target.value)}
      disabled={disabled || undefined}
      size={size}
      name={name}
      aria-label={ariaLabel}
    >
      {placeholder && (
        <OptionFrame value="" disabled>
          {placeholder}
        </OptionFrame>
      )}
      {children}
    </SelectFrame>
  )
}

function Option({ children, value, disabled }: NativeSelectOptionProps) {
  return (
    <OptionFrame value={value} disabled={disabled || undefined}>
      {children}
    </OptionFrame>
  )
}

export const NativeSelect = { Root, Option }
