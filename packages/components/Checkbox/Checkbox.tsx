import React, { useCallback, useRef } from 'react'
import { styled } from '../../stl-react/src/config'

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

const CheckboxBox = styled("div", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: "2px",
  borderStyle: "solid",
  borderRadius: "$2",
  flexShrink: "0",
  transition: "border-color 0.15s, background-color 0.15s",
}, {
  size: {
    sm: { width: "16px", height: "16px" },
    md: { width: "20px", height: "20px" },
    lg: { width: "24px", height: "24px" },
  },
}, "CheckboxBox")

const ICON_SIZE_MAP: Record<string, number> = { sm: 12, md: 14, lg: 18 }

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
  const inputRef = useRef<HTMLInputElement>(null)
  const isControlled = checked !== undefined
  const isChecked = checked === true
  const isIndeterminate = checked === 'indeterminate'

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isIndeterminate) {
      onCheckedChange?.(true)
    } else {
      onCheckedChange?.(e.target.checked)
    }
  }, [isIndeterminate, onCheckedChange])

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isIndeterminate
    }
  }, [isIndeterminate])

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
      <input
        ref={inputRef}
        type="checkbox"
        checked={isControlled ? isChecked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: 0,
        }}
      />
      <CheckboxBox
        size={size}
        style={{
          borderColor: isChecked || isIndeterminate ? 'var(--color10, #0066ff)' : 'var(--borderColor, #d1d5db)',
          backgroundColor: isChecked || isIndeterminate ? 'var(--color10, #0066ff)' : 'transparent',
          color: isChecked || isIndeterminate ? 'white' : 'inherit',
        }}
      >
        {(isChecked || isIndeterminate) && (
          isIndeterminate
            ? <MinusSvg size={ICON_SIZE_MAP[size]} />
            : <CheckSvg size={ICON_SIZE_MAP[size]} />
        )}
      </CheckboxBox>
      {children}
    </label>
  )
}

function Indicator({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

export const Checkbox = { Root, Indicator }
