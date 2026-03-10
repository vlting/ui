import React from 'react'
import { styled } from '../../stl-react/src/config'

const RadioDot = styled(
  'div',
  {
    borderRadius: '9999px',
    backgroundColor: 'var(--color10, #0066ff)',
  },
  {
    size: {
      sm: { width: '6px', height: '6px' },
      md: { width: '8px', height: '8px' },
      lg: { width: '10px', height: '10px' },
    },
  },
  'RadioDot',
)

const RadioCircle = styled(
  'div',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '$borderColor',
    borderRadius: '9999px',
    backgroundColor: 'transparent',
    flexShrink: '0',
    transition: 'border-color 0.15s',
  },
  {
    size: {
      sm: { width: '16px', height: '16px' },
      md: { width: '20px', height: '20px' },
      lg: { width: '24px', height: '24px' },
    },
  },
  'RadioCircle',
)

export interface RadioGroupRootProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'horizontal' | 'vertical'
  'aria-label'?: string
}

const RadioGroupSizeContext = React.createContext<'sm' | 'md' | 'lg'>('md')
const RadioGroupValueContext = React.createContext<{
  value?: string
  name?: string
  disabled?: boolean
  onValueChange?: (value: string) => void
}>({})

function Root({
  children,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  name,
  size = 'md',
  orientation = 'vertical',
  'aria-label': ariaLabel,
}: RadioGroupRootProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) setInternalValue(newValue)
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange],
  )

  return (
    <RadioGroupSizeContext.Provider value={size}>
      <RadioGroupValueContext.Provider
        value={{ value: currentValue, name, disabled, onValueChange: handleChange }}
      >
        <fieldset
          aria-label={ariaLabel}
          style={{
            display: 'flex',
            flexDirection: orientation === 'horizontal' ? 'row' : 'column',
            gap: '8px',
            border: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {children}
        </fieldset>
      </RadioGroupValueContext.Provider>
    </RadioGroupSizeContext.Provider>
  )
}

export interface RadioGroupItemProps {
  value: string
  disabled?: boolean
  children?: React.ReactNode
}

function Item({
  value: itemValue,
  disabled: itemDisabled,
  children,
}: RadioGroupItemProps) {
  const size = React.useContext(RadioGroupSizeContext)
  const group = React.useContext(RadioGroupValueContext)
  const isDisabled = itemDisabled || group.disabled
  const isSelected = group.value === itemValue

  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
      }}
    >
      <input
        type="radio"
        name={group.name}
        value={itemValue}
        checked={isSelected}
        onChange={() => group.onValueChange?.(itemValue)}
        disabled={isDisabled}
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
      <RadioCircle size={size}>{isSelected && <RadioDot size={size} />}</RadioCircle>
      {children}
    </label>
  )
}

export const RadioGroup = { Root, Item }
