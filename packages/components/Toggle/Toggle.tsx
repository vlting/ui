import React, { useCallback, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const ToggleBtn = styled("button", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "$borderColor",
  borderRadius: "$4",
  cursor: "pointer",
  backgroundColor: "transparent",
  color: "$defaultBody",
  fontFamily: "$body",
  fontWeight: "$500",
  transition: "background-color 0.15s, border-color 0.15s",
  outline: "none",
}, {
  size: {
    sm: { height: "32px", paddingLeft: "8px", paddingRight: "8px", fontSize: "$14" },
    md: { height: "36px", paddingLeft: "12px", paddingRight: "12px", fontSize: "$p" },
    lg: { height: "40px", paddingLeft: "16px", paddingRight: "16px", fontSize: "$p" },
  },
  disabled: {
    true: { opacity: "0.5", cursor: "not-allowed", pointerEvents: "none" },
  },
}, "Toggle")

export interface ToggleProps {
  children?: React.ReactNode
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function Toggle({
  children,
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  size = 'md',
  disabled,
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed)
  const isPressed = controlledPressed ?? internalPressed

  const handlePress = useCallback(() => {
    if (disabled) return
    const next = !isPressed
    setInternalPressed(next)
    onPressedChange?.(next)
  }, [disabled, isPressed, onPressedChange])

  return (
    <ToggleBtn
      type="button"
      aria-pressed={isPressed}
      aria-disabled={disabled || undefined}
      disabled={disabled || undefined}
      onClick={handlePress}
      size={size}
      style={{
        backgroundColor: isPressed ? 'var(--surface3, #e5e7eb)' : 'transparent',
        borderColor: isPressed ? 'var(--color8, #9ca3af)' : undefined,
      }}
    >
      {children}
    </ToggleBtn>
  )
}

// --- ToggleGroup ---

interface ToggleGroupContextValue {
  type: 'single' | 'multiple'
  values: string[]
  toggle: (value: string) => void
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  type: 'single',
  values: [],
  toggle: () => {},
  size: 'md',
})

export interface ToggleGroupProps {
  children?: React.ReactNode
  type?: 'single' | 'multiple'
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
}

function ToggleGroupRoot({
  children,
  type = 'single',
  value,
  defaultValue,
  onValueChange,
  size = 'md',
  disabled,
  orientation = 'horizontal',
}: ToggleGroupProps) {
  const normalize = (v?: string | string[]): string[] => {
    if (!v) return []
    return Array.isArray(v) ? v : [v]
  }

  const [internal, setInternal] = useState<string[]>(normalize(defaultValue))
  const isControlled = value !== undefined
  const values = isControlled ? normalize(value) : internal

  const toggle = useCallback((val: string) => {
    const update = (prev: string[]) => {
      if (type === 'single') {
        return prev.includes(val) ? [] : [val]
      }
      return prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    }

    if (!isControlled) {
      setInternal((prev) => {
        const next = update(prev)
        onValueChange?.(type === 'single' ? (next[0] ?? '') : next)
        return next
      })
    } else {
      const next = update(values)
      onValueChange?.(type === 'single' ? (next[0] ?? '') : next)
    }
  }, [type, isControlled, values, onValueChange])

  return (
    <ToggleGroupContext.Provider value={{ type, values, toggle, size, disabled }}>
      <div
        role="group"
        style={{
          display: 'inline-flex',
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          gap: '1px',
        }}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  )
}

export interface ToggleGroupItemProps {
  children?: React.ReactNode
  value: string
  disabled?: boolean
}

function ToggleGroupItem({ children, value, disabled: itemDisabled }: ToggleGroupItemProps) {
  const { values, toggle, size, disabled: groupDisabled } = React.useContext(ToggleGroupContext)
  const isPressed = values.includes(value)
  const isDisabled = itemDisabled || groupDisabled

  return (
    <ToggleBtn
      type="button"
      aria-pressed={isPressed}
      disabled={isDisabled || undefined}
      onClick={() => !isDisabled && toggle(value)}
      size={size}
      style={{
        backgroundColor: isPressed ? 'var(--surface3, #e5e7eb)' : 'transparent',
        borderColor: isPressed ? 'var(--color8, #9ca3af)' : undefined,
      }}
    >
      {children}
    </ToggleBtn>
  )
}

export const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Item: ToggleGroupItem,
})
