import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
} from 'react'
import { useControllableState } from '../../headless/src/useControllableState'
import { useRovingTabIndex } from '../../headless/src/useRovingTabIndex'
import { styled } from '../../stl-react/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface RadioGroupContextValue {
  value: string | undefined
  onValueChange: (value: string) => void
  disabled?: boolean
  size: 'sm' | 'md' | 'lg'
  name: string
  getItemProps: (index: number) => {
    tabIndex: 0 | -1
    onFocus: () => void
    'data-roving-item': ''
  }
  registerItem: (value: string) => number
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function useRadioGroup() {
  const ctx = useContext(RadioGroupContext)
  if (!ctx) throw new Error('RadioGroup.Item must be used within RadioGroup.Root')
  return ctx
}

// ─── Hidden Radio Input ─────────────────────────────────────────────────────

const HiddenInput = styled('input', {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  opacity: '0',
  margin: '0',
  padding: '0',
  border: 'none',
  pointerEvents: 'none',
}, { name: 'RadioInput' })

// ─── Radio Indicator ────────────────────────────────────────────────────────

const RadioCircle = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  radius: '$round',
  border: '$neutral7',
  borderWidth: '$widthMin',
  bg: 'transparent',
  flexShrink: '0',
}, {
  name: 'RadioCircle',
  variants: {
    size: {
      sm: { width: '$16', height: '$16' },
      md: { width: '$20', height: '$20' },
      lg: { width: '$24', height: '$24' },
    },
    selected: {
      true: { border: '$primary9' },
    },
  },
  defaultVariants: { size: 'md' },
})

const RadioDot = styled('span', {
  display: 'block',
  radius: '$round',
  bg: '$primary9',
}, {
  name: 'RadioDot',
  variants: {
    size: {
      sm: { width: '$8', height: '$8' },
      md: { width: '$8', height: '$8' },
      lg: { width: '$12', height: '$12' },
    },
  },
  defaultVariants: { size: 'md' },
})

// ─── Item Label ─────────────────────────────────────────────────────────────

const ItemLabel = styled('label', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$8',
  cursor: 'pointer',
  position: 'relative',
  userSelect: 'none',
}, {
  name: 'RadioItem',
  variants: {
    size: {
      sm: { fontSize: '$buttonSmall' },
      md: { fontSize: '$button' },
      lg: { fontSize: '$button' },
    },
    disabled: {
      true: { opacity: '0.5', cursor: 'not-allowed' },
    },
  },
  defaultVariants: { size: 'md' },
})

// ─── Root ───────────────────────────────────────────────────────────────────

const RootContainer = styled('div', {
  display: 'flex',
  gap: '$8',
}, {
  name: 'RadioGroupRoot',
  variants: {
    orientation: {
      vertical: { flexDirection: 'column' },
      horizontal: { flexDirection: 'row' },
    },
    disabled: {
      true: {},
    },
  },
  defaultVariants: { orientation: 'vertical' },
})

export interface RadioGroupRootProps extends Omit<ComponentPropsWithRef<typeof RootContainer>, 'onChange'> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  name?: string
  orientation?: 'vertical' | 'horizontal'
}

const Root = forwardRef<HTMLDivElement, RadioGroupRootProps>(
  ({
    value: valueProp,
    defaultValue,
    onValueChange,
    disabled,
    size = 'md',
    name: nameProp,
    orientation = 'vertical',
    children,
    ...rest
  }, ref) => {
    const autoName = useId()
    const name = nameProp ?? autoName

    const [value, setValue] = useControllableState<string | undefined>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    })

    // Track items for roving tabindex
    const [itemValues] = useState<string[]>(() => [])
    const [activeIndex, setActiveIndex] = useState(0)

    const registerItem = (itemValue: string): number => {
      let idx = itemValues.indexOf(itemValue)
      if (idx === -1) {
        idx = itemValues.length
        itemValues.push(itemValue)
      }
      return idx
    }

    const { getContainerProps, getItemProps } = useRovingTabIndex({
      count: itemValues.length || 1,
      activeIndex,
      onActiveIndexChange: (idx) => {
        setActiveIndex(idx)
        // Select on arrow key navigation per WAI-ARIA radio pattern
        const itemValue = itemValues[idx]
        if (itemValue !== undefined && !disabled) {
          setValue(itemValue)
        }
      },
      orientation: orientation === 'vertical' ? 'vertical' : 'horizontal',
      loop: true,
    })

    const containerProps = getContainerProps()

    return (
      <RadioGroupContext.Provider
        value={{ value, onValueChange: (v) => !disabled && setValue(v), disabled, size, name, getItemProps, registerItem }}
      >
        <RootContainer
          ref={(node: HTMLDivElement | null) => {
            // Wire both the roving ref and the forwarded ref
            const rovingRef = containerProps.ref as React.MutableRefObject<HTMLElement | null>
            if (rovingRef) rovingRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          role="radiogroup"
          orientation={orientation}
          disabled={disabled}
          onKeyDown={containerProps.onKeyDown}
          {...rest}
        >
          {children}
        </RootContainer>
      </RadioGroupContext.Provider>
    )
  },
)
Root.displayName = 'RadioGroup.Root'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface RadioGroupItemProps {
  value: string
  disabled?: boolean
  children?: React.ReactNode
}

const Item = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ value: itemValue, disabled: itemDisabled, children }, ref) => {
    const ctx = useRadioGroup()
    const isDisabled = ctx.disabled || itemDisabled
    const isSelected = ctx.value === itemValue

    // Register item and get index for roving tabindex
    const index = ctx.registerItem(itemValue)
    const rovingProps = ctx.getItemProps(index)

    return (
      <ItemLabel size={ctx.size} disabled={isDisabled}>
        <HiddenInput
          ref={ref}
          type="radio"
          name={ctx.name}
          value={itemValue}
          checked={isSelected}
          disabled={isDisabled}
          tabIndex={rovingProps.tabIndex}
          data-roving-item={rovingProps['data-roving-item']}
          onFocus={rovingProps.onFocus}
          onChange={() => {
            if (!isDisabled) {
              ctx.onValueChange(itemValue)
            }
          }}
        />
        <RadioCircle size={ctx.size} selected={isSelected}>
          {isSelected && <RadioDot size={ctx.size} />}
        </RadioCircle>
        {children}
      </ItemLabel>
    )
  },
)
Item.displayName = 'RadioGroup.Item'

// ─── Export ─────────────────────────────────────────────────────────────────

export const RadioGroup = { Root, Item }
