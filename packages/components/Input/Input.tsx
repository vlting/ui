import type React from 'react'
import { useId } from 'react'
import { styled } from '../../stl-react/src/config'

const InputFrame = styled("input", {
  fontFamily: "$body",
  fontSize: "$p",
  color: "$defaultBody",
  backgroundColor: "$background",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "$borderColor",
  borderRadius: "$4",
  padding: "8px 12px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
}, {
  fieldSize: {
    sm: { borderRadius: "$2", paddingLeft: "6px", paddingRight: "6px", paddingTop: "4px", paddingBottom: "4px", fontSize: "$14" },
    md: { borderRadius: "$4", paddingLeft: "8px", paddingRight: "8px", paddingTop: "6px", paddingBottom: "6px" },
    lg: { borderRadius: "$4", paddingLeft: "10px", paddingRight: "10px", paddingTop: "8px", paddingBottom: "8px" },
  },
  error: {
    true: { borderColor: "red" },
  },
}, "Input")

const StyledLabelText = styled("span", {
  fontFamily: "$body",
  fontWeight: "$500",
  color: "$defaultBody",
  marginBottom: "4px",
  display: "block",
}, {
  size: {
    sm: { fontSize: "$14" },
    md: { fontSize: "$p" },
    lg: { fontSize: "$p" },
  },
}, "InputLabel")

const InputHelper = styled("span", {
  fontFamily: "$body",
  fontSize: "$14",
  marginTop: "4px",
  display: "block",
}, {
  tone: {
    neutral: { color: "$tertiary7" },
    error: { color: "red" },
  },
}, "InputHelper")

const SlotFrame = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}, "InputSlot")

export interface InputProps {
  size?: 'sm' | 'md' | 'lg'
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'search'
    | 'tel'
    | 'url'
    | 'date'
    | 'file'
  placeholder?: string
  value?: string
  defaultValue?: string
  onChangeText?: (text: string) => void
  label?: string
  helperText?: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  leadingSlot?: React.ReactNode
  trailingSlot?: React.ReactNode
}

export function Input({
  size = 'md',
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChangeText,
  label,
  helperText,
  error,
  errorMessage,
  disabled,
  leadingSlot,
  trailingSlot,
}: InputProps) {
  const inputId = useId()
  const helperId = useId()
  const displayHelper = error && errorMessage ? errorMessage : helperText

  const inputEl = (
    <InputFrame
      id={inputId}
      type={type}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChangeText ? (e: React.ChangeEvent<HTMLInputElement>) => onChangeText(e.target.value) : undefined}
      disabled={disabled || undefined}
      error={error || undefined}
      fieldSize={size}
      aria-invalid={error || undefined}
      aria-describedby={displayHelper ? helperId : undefined}
      aria-label={!label ? placeholder : undefined}
      style={leadingSlot || trailingSlot ? { flex: 1 } : undefined}
    />
  )

  return (
    <div>
      {label && (
        <label htmlFor={inputId} style={{ display: 'block' }}>
          <StyledLabelText size={size}>{label}</StyledLabelText>
        </label>
      )}
      {leadingSlot || trailingSlot ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {leadingSlot && <SlotFrame>{leadingSlot}</SlotFrame>}
          {inputEl}
          {trailingSlot && <SlotFrame>{trailingSlot}</SlotFrame>}
        </div>
      ) : (
        inputEl
      )}
      {displayHelper && (
        <InputHelper id={helperId} tone={error ? 'error' : 'neutral'}>
          {displayHelper}
        </InputHelper>
      )}
    </div>
  )
}

Input.Frame = InputFrame
Input.Label = StyledLabelText
Input.Helper = InputHelper
