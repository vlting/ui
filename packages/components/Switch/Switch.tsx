import React, { useState } from 'react'
import { styled } from '../../stl-react/src/config'

const SwitchTrack = styled(
  "button",
  {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "9999px",
    border: "none",
    cursor: "pointer",
    padding: "2px",
    transition: "background-color 200ms ease",
    flexShrink: 0,
  },
  {
    size: {
      sm: { width: "36px", height: "20px" },
      md: { width: "44px", height: "24px" },
      lg: { width: "52px", height: "28px" },
    },
    disabled: {
      true: { opacity: "0.5", cursor: "not-allowed" },
    },
  },
  "Switch"
)

const SwitchThumb = styled(
  "span",
  {
    display: "block",
    borderRadius: "9999px",
    backgroundColor: "var(--background, #fff)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    transition: "transform 200ms ease",
  },
  {
    size: {
      sm: { width: "16px", height: "16px" },
      md: { width: "20px", height: "20px" },
      lg: { width: "24px", height: "24px" },
    },
  },
  "SwitchThumb"
)

const THUMB_TRANSLATE: Record<string, string> = {
  sm: 'translateX(16px)',
  md: 'translateX(20px)',
  lg: 'translateX(24px)',
}

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  name?: string
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = 'md',
  name,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isControlled = controlledChecked !== undefined
  const isChecked = isControlled ? controlledChecked : internalChecked

  const handleClick = () => {
    if (disabled) return
    const next = !isChecked
    if (!isControlled) setInternalChecked(next)
    onCheckedChange?.(next)
  }

  return (
    <SwitchTrack
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleClick}
      size={size}
      style={{
        backgroundColor: isChecked ? 'var(--color10)' : 'var(--color4)',
      }}
    >
      {name && <input type="hidden" name={name} value={isChecked ? 'on' : 'off'} />}
      <SwitchThumb
        size={size}
        style={{
          transform: isChecked ? THUMB_TRANSLATE[size] : 'translateX(0)',
        }}
      />
    </SwitchTrack>
  )
}
