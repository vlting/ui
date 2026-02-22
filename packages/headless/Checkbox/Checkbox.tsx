import React, { createContext, useContext } from 'react'
import { useControllableState } from '../../hooks/useControllableState'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface CheckboxContextValue {
  checked: boolean | 'indeterminate' | undefined
  onCheckedChange: (checked: boolean | 'indeterminate') => void
  disabled: boolean
}

const CheckboxContext = createContext<CheckboxContextValue | null>(null)

function useCheckboxContext() {
  const ctx = useContext(CheckboxContext)
  if (!ctx) throw new Error('Checkbox compound components must be used within Checkbox.Root')
  return ctx
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

export interface CheckboxRootProps {
  children: React.ReactNode
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  className?: string
}

function Root({
  children,
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  required,
  name,
  value = 'on',
  ...props
}: CheckboxRootProps) {
  const [checked, setChecked] = useControllableState<boolean | 'indeterminate'>({
    prop: checkedProp,
    defaultProp: defaultChecked,
    onChange: onCheckedChange,
  })

  const handleClick = () => {
    if (disabled) return
    setChecked(checked === true ? false : true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <CheckboxContext.Provider value={{ checked, onCheckedChange: setChecked, disabled }}>
      <button
        {...props}
        type="button"
        role="checkbox"
        aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
        aria-required={required}
        disabled={disabled}
        data-state={checked === true ? 'checked' : checked === 'indeterminate' ? 'indeterminate' : 'unchecked'}
        data-disabled={disabled || undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </button>
      {name && (
        <input
          type="checkbox"
          aria-hidden
          tabIndex={-1}
          name={name}
          value={value}
          checked={checked === true}
          onChange={() => {}}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
        />
      )}
    </CheckboxContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Indicator
// ---------------------------------------------------------------------------

export interface CheckboxIndicatorProps {
  children?: React.ReactNode
  className?: string
}

function Indicator({ children, ...props }: CheckboxIndicatorProps) {
  const { checked } = useCheckboxContext()
  if (checked !== true && checked !== 'indeterminate') return null
  return (
    <span {...props} data-state={checked === true ? 'checked' : 'indeterminate'}>
      {children}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const Checkbox = {
  Root,
  Indicator,
}
