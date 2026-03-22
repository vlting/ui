import { type ReactNode, createContext, forwardRef, useContext, useState } from 'react'
import { Pressable, Text as RNText, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface SelectContextValue {
  value: string
  onSelect: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const SelectContext = createContext<SelectContextValue | null>(null)

// ─── Styled ─────────────────────────────────────────────────────────────────

const TriggerBase = styled(Pressable, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderColor: '$neutral6',
  borderRadius: 6,
  backgroundColor: '$surface1',
}, {
  size: {
    sm: { height: 28, paddingHorizontal: 8 },
    md: { height: 32, paddingHorizontal: 12 },
    lg: { height: 40, paddingHorizontal: 16 },
  },
  error: {
    true: { borderColor: '$error9' },
  },
  disabled: {
    true: { opacity: 0.5 },
  },
}, 'NativeSelectTrigger')

const TriggerText = styled(RNText, {
  color: '$defaultBody',
  flex: 1,
}, {
  size: {
    sm: { fontSize: 13 },
    md: { fontSize: 14 },
    lg: { fontSize: 15 },
  },
}, 'NativeSelectText')

const Chevron = styled(RNText, {
  color: '$neutral7',
  fontSize: 12,
  marginLeft: 8,
}, 'NativeSelectChevron')

const OptionsList = styled(View, {
  borderWidth: 1,
  borderColor: '$neutral6',
  borderRadius: 6,
  backgroundColor: '$surface1',
  marginTop: 4,
  overflow: 'hidden',
}, 'NativeSelectOptions')

const OptionItem = styled(Pressable, {
  paddingHorizontal: 12,
  paddingVertical: 10,
}, {
  selected: {
    true: { backgroundColor: '$primary3' },
  },
  pressed: {
    true: { backgroundColor: '$neutral3' },
  },
}, 'NativeSelectOption')

const OptionText = styled(RNText, {
  fontSize: 14,
  color: '$defaultBody',
}, 'NativeSelectOptionText')

// ─── Types ──────────────────────────────────────────────────────────────────

export interface NativeSelectRootProps {
  children?: ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  error?: boolean
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
  style?: ViewStyle
}

export interface NativeSelectOptionProps {
  value: string
  children?: ReactNode
  disabled?: boolean
}

// ─── Root ───────────────────────────────────────────────────────────────────

const Root = forwardRef<View, NativeSelectRootProps>(
  ({
    children,
    value: valueProp,
    defaultValue = '',
    onValueChange,
    disabled,
    error,
    size = 'md',
    placeholder,
    ...rest
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const value = valueProp ?? internalValue
    const [isOpen, setIsOpen] = useState(false)

    const onSelect = (v: string) => {
      if (valueProp === undefined) setInternalValue(v)
      onValueChange?.(v)
      setIsOpen(false)
    }

    // Find display label from children
    let displayLabel = placeholder ?? ''
    const options: { value: string; label: string }[] = []
    const childArr = Array.isArray(children) ? children : children ? [children] : []
    for (const child of childArr) {
      if (child && typeof child === 'object' && 'props' in child) {
        const props = child.props as NativeSelectOptionProps
        const label = typeof props.children === 'string' ? props.children : String(props.value)
        options.push({ value: props.value, label })
        if (props.value === value) displayLabel = label
      }
    }

    return (
      <SelectContext.Provider value={{ value, onSelect, isOpen, setIsOpen }}>
        <View ref={ref} {...rest}>
          <TriggerBase
            size={size}
            error={error}
            disabled={disabled}
            onPress={disabled ? undefined : () => setIsOpen(!isOpen)}
            accessibilityRole="button"
            accessibilityState={{ disabled, expanded: isOpen }}
          >
            <TriggerText size={size} style={!value ? { opacity: 0.5 } : undefined}>
              {displayLabel}
            </TriggerText>
            <Chevron>{isOpen ? '\u25B2' : '\u25BC'}</Chevron>
          </TriggerBase>
          {isOpen && (
            <OptionsList>
              {options.map((opt) => (
                <OptionItem
                  key={opt.value}
                  selected={opt.value === value}
                  onPress={() => onSelect(opt.value)}
                >
                  <OptionText>{opt.label}</OptionText>
                </OptionItem>
              ))}
            </OptionsList>
          )}
        </View>
      </SelectContext.Provider>
    )
  },
)
Root.displayName = 'NativeSelect.Root'

// ─── Option ─────────────────────────────────────────────────────────────────

function Option({ value, children }: NativeSelectOptionProps) {
  // Rendered by Root — this is a declarative slot only
  return null
}
Option.displayName = 'NativeSelect.Option'

// ─── Export ─────────────────────────────────────────────────────────────────

export const NativeSelect = { Root, Option }
