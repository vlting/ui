import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from '../../stl-react/src/config'

const TriggerFrame = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "$background",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "$borderColor",
  borderRadius: "$4",
  fontFamily: "$body",
  fontSize: "$p",
  color: "$defaultBody",
  cursor: "pointer",
  padding: "8px 12px",
  gap: "8px",
  width: "100%",
  textAlign: "left",
  outline: "none",
}, {
  size: {
    sm: { padding: "4px 8px", fontSize: "$14", borderRadius: "$2" },
    md: { padding: "8px 12px", fontSize: "$p", borderRadius: "$4" },
    lg: { padding: "12px 16px", fontSize: "$p", borderRadius: "$4" },
  },
  disabled: {
    true: { cursor: "not-allowed", opacity: "0.5" },
  },
}, "SelectTrigger")

const DropdownFrame = styled("div", {
  position: "absolute",
  top: "100%",
  left: "0",
  right: "0",
  marginTop: "4px",
  backgroundColor: "$background",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "$borderColor",
  borderRadius: "$4",
  zIndex: "1000",
  overflow: "hidden",
}, "SelectDropdown")

const ItemFrame = styled("div", {
  display: "flex",
  alignItems: "center",
  padding: "8px 12px",
  fontFamily: "$body",
  fontSize: "$p",
  color: "$defaultBody",
  cursor: "pointer",
}, "SelectItem")

const LabelFrame = styled("div", {
  fontFamily: "$body",
  fontSize: "$14",
  fontWeight: "$500",
  color: "$tertiary7",
  padding: "4px 12px",
}, "SelectLabel")

const SeparatorFrame = styled("div", {
  height: "1px",
  backgroundColor: "$borderColor",
  margin: "4px 0",
}, "SelectSeparator")

interface SelectContextValue {
  value?: string
  onSelect: (value: string) => void
  highlightIndex: number
  setHighlightIndex: (i: number) => void
  isOpen: boolean
}

const SelectContext = React.createContext<SelectContextValue>({
  onSelect: () => {},
  highlightIndex: -1,
  setHighlightIndex: () => {},
  isOpen: false,
})

export interface SelectProps {
  children?: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

function SelectRootComponent({
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = 'Select...',
  size = 'md',
  disabled,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const [isOpen, setIsOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)

  const onSelect = useCallback((val: string) => {
    if (!isControlled) setInternalValue(val)
    onValueChange?.(val)
    setIsOpen(false)
  }, [isControlled, onValueChange])

  // Collect item values for display
  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement => React.isValidElement(child) && (child.type as any) === SelectItem
  )
  const selectedLabel = items.find((item) => item.props.value === value)?.props.children ?? value

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsOpen(true)
        setHighlightIndex(0)
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex((i) => Math.min(i + 1, items.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setHighlightIndex(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setHighlightIndex(items.length - 1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const item = items[highlightIndex]
      if (item) onSelect(item.props.value)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }, [isOpen, items, highlightIndex, onSelect])

  return (
    <SelectContext.Provider value={{ value, onSelect, highlightIndex, setHighlightIndex, isOpen }}>
      <div ref={rootRef} style={{ position: 'relative', width: '100%' }}>
        <TriggerFrame
          type="button"
          size={size}
          disabled={disabled || undefined}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span style={!value ? { opacity: 0.5 } : undefined}>
            {value ? selectedLabel : placeholder}
          </span>
          <span aria-hidden>▾</span>
        </TriggerFrame>

        {isOpen && (
          <DropdownFrame style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <div role="listbox" style={{ padding: '4px', maxHeight: '240px', overflowY: 'auto' }}>
              {React.Children.map(children, (child, i) => {
                if (React.isValidElement(child) && (child.type as any) === SelectItem) {
                  const itemIdx = items.indexOf(child as React.ReactElement)
                  return React.cloneElement(child as React.ReactElement<{ _index?: number }>, { _index: itemIdx })
                }
                return child
              })}
            </div>
          </DropdownFrame>
        )}
      </div>
    </SelectContext.Provider>
  )
}

export interface SelectItemProps {
  value: string
  children?: React.ReactNode
  _index?: number
}

function SelectItem({ value: itemValue, children, _index = 0 }: SelectItemProps) {
  const { value, onSelect, highlightIndex, setHighlightIndex } = React.useContext(SelectContext)
  const isSelected = value === itemValue
  const isHighlighted = highlightIndex === _index

  return (
    <ItemFrame
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(itemValue)}
      onMouseEnter={() => setHighlightIndex(_index)}
      style={{
        backgroundColor: isHighlighted ? 'var(--surface3, #f3f4f6)' : 'transparent',
        borderRadius: '4px',
        fontWeight: isSelected ? 600 : 400,
      }}
    >
      <span style={{ width: '20px', display: 'inline-flex', alignItems: 'center' }}>
        {isSelected && '✓'}
      </span>
      {children}
    </ItemFrame>
  )
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  return <>{placeholder}</>
}

function SelectGroupComponent({ children }: { children: React.ReactNode }) {
  return <div role="group">{children}</div>
}

function SelectLabel({ children }: { children: React.ReactNode }) {
  return <LabelFrame>{children}</LabelFrame>
}

function SelectSeparator() {
  return <SeparatorFrame />
}

export const Select = Object.assign(SelectRootComponent, {
  Item: SelectItem,
  Value: SelectValue,
  Group: SelectGroupComponent,
  Label: SelectLabel,
  Separator: SelectSeparator,
})
