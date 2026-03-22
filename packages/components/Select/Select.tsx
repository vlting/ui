import {
  Children,
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useControllableState } from '../../headless/src/useControllableState'
import { useDisclosure } from '../../headless/src/useDisclosure'
import { styled } from '../../stl-react/src/config'
import { Portal } from '../../stl-react/src/primitives/Portal/Portal'
import { mergeRefs } from '../../utils/mergeRefs'

// ─── Context ────────────────────────────────────────────────────────────────

interface ItemEntry { value: string; label: string; disabled: boolean }

interface SelectContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  value: string | undefined
  onSelect: (value: string, label: string) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
  contentId: string
  disabled: boolean
  size: 'sm' | 'md' | 'lg'
  placeholder?: string
  displayLabel: string | undefined
  // Shared item state
  registerItem: (value: string, label: string, disabled?: boolean) => number
  items: React.MutableRefObject<ItemEntry[]>
  activeIndex: number
  setActiveIndex: (i: number) => void
  itemCount: number
  labelMap: React.MutableRefObject<Map<string, string>>
}

const SelectContext = createContext<SelectContextValue | null>(null)

function useSelectContext() {
  const ctx = useContext(SelectContext)
  if (!ctx) throw new Error('Select compound components must be used within Select')
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledTrigger = styled('button', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$8',
  width: '100%',
  bg: '$surface1',
  borderWidth: '$widthMin',
  borderStyle: '$styleDefault',
  borderColor: '$neutralMin',
  radius: '$button',
  px: '$12',
  py: '$8',
  fontSize: '$p',
  fontFamily: '$body',
  color: 'inherit',
  cursor: 'pointer',
  outline: 'none',
  ':interact': { bg: '$neutral3' },
  ':focus': { outlineWidth: '2px', outlineStyle: 'solid', outlineColor: '$neutral7', outlineOffset: '1px' },
}, {
  name: 'SelectTrigger',
  variants: {
    size: {
      sm: { px: '$8', py: '$4', fontSize: '$small' },
      md: { px: '$12', py: '$8', fontSize: '$p' },
      lg: { px: '$16', py: '$12', fontSize: '$p' },
    },
    disabled: {
      true: { opacity: '$disabledOpacity', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
})

const StyledContent = styled('div', {
  bg: '$surface1',
  radius: '$4',
  boxShadow: '$md',
  py: '$4',
  minWidth: '220px',
  zIndex: '50',
  position: 'fixed',
  borderWidth: '$widthMin',
  borderStyle: '$styleDefault',
  borderColor: '$neutralMin',
  outline: 'none',
}, { name: 'SelectContent' })

const StyledItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$8',
  px: '$8',
  py: '$6',
  radius: '$2',
  cursor: 'pointer',
  fontSize: '$p',
  fontFamily: '$body',
  mx: '$4',
  outline: 'none',
  color: 'inherit',
  ':interact': { bg: '$neutral4' },
  ':focus': { bg: '$neutral4' },
}, {
  name: 'SelectItem',
  variants: {
    disabled: {
      true: { opacity: '$disabledOpacity', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
})

const StyledLabel = styled('div', {
  px: '$8',
  py: '$4',
  mx: '$4',
  fontSize: '$small',
  fontWeight: '$600',
  fontFamily: '$body',
  color: '$neutral9',
}, { name: 'SelectLabel' })

const StyledSeparator = styled('div', {
  height: '1px',
  bg: '$neutralAlpha5',
  my: '$4',
}, { name: 'SelectSeparator' })

const StyledPlaceholder = styled('span', {
  color: '$neutral7',
}, { name: 'SelectPlaceholder' })

const StyledCheckIndicator = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  flexShrink: '0',
}, { name: 'SelectCheckIndicator' })

// ─── Icons ──────────────────────────────────────────────────────────────────

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6l4 4 4-4" />
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 5" />
  </svg>
)

// ─── Root ───────────────────────────────────────────────────────────────────

export interface SelectProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const SelectRoot = forwardRef<HTMLDivElement, SelectProps & Omit<ComponentPropsWithRef<'div'>, keyof SelectProps> & { _initialLabel?: string }>(
  ({ children, value: valueProp, defaultValue, onValueChange, disabled = false, placeholder, size = 'md', open, onOpenChange: onOpenChangeProp, _initialLabel, ...rest }, ref) => {
    const disclosure = useDisclosure({ open, onOpenChange: onOpenChangeProp })
    const contentId = useId()
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [value, setValue] = useControllableState({ prop: valueProp, defaultProp: defaultValue, onChange: onValueChange })
    const [displayLabel, setDisplayLabel] = useState<string | undefined>(_initialLabel)

    // Shared item registry + active index (hoisted so trigger can navigate)
    const itemsRef = useRef<ItemEntry[]>([])
    const [itemCount, setItemCount] = useState(0)
    const indexCounterRef = useRef(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const labelMapRef = useRef(new Map<string, string>())

    const registerItem = useCallback((itemValue: string, label: string, itemDisabled = false) => {
      const idx = indexCounterRef.current++
      itemsRef.current[idx] = { value: itemValue, label, disabled: itemDisabled }
      labelMapRef.current.set(itemValue, label)
      setItemCount(indexCounterRef.current)
      // Resolve display label if this item matches current value
      if (itemValue === value && !displayLabel) {
        setDisplayLabel(label)
      }
      return idx
    }, [value, displayLabel])

    // Reset on mount
    useEffect(() => {
      indexCounterRef.current = 0
      itemsRef.current = []
    }, [])

    const onSelect = useCallback((itemValue: string, label: string) => {
      setValue(itemValue)
      setDisplayLabel(label)
      disclosure.onClose()
      triggerRef.current?.focus()
    }, [setValue, disclosure])

    const onOpenChange = useCallback((next: boolean) => {
      if (disabled) return
      if (next) {
        disclosure.onOpen()
        // Set active to selected item if available
        if (value) {
          const idx = itemsRef.current.findIndex((i) => i.value === value)
          if (idx >= 0) setActiveIndex(idx)
        }
      } else {
        disclosure.onClose()
      }
    }, [disabled, disclosure, value])

    const ctx = useMemo(() => ({
      isOpen: disclosure.isOpen,
      onOpenChange,
      value,
      onSelect,
      triggerRef,
      contentId,
      disabled,
      size,
      placeholder,
      displayLabel,
      registerItem,
      items: itemsRef,
      activeIndex,
      setActiveIndex,
      itemCount,
      labelMap: labelMapRef,
    }), [disclosure.isOpen, onOpenChange, value, onSelect, contentId, disabled, size, placeholder, displayLabel, registerItem, activeIndex, itemCount])

    return (
      <SelectContext.Provider value={ctx}>
        <div ref={ref} {...rest}>
          {children}
        </div>
      </SelectContext.Provider>
    )
  },
)
SelectRoot.displayName = 'Select'

// ─── Trigger ────────────────────────────────────────────────────────────────

const SelectTrigger = forwardRef<HTMLButtonElement, ComponentPropsWithRef<typeof StyledTrigger>>(
  ({ children, onClick, onKeyDown, ...rest }, ref) => {
    const ctx = useSelectContext()

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (ctx.disabled) return

      if (ctx.isOpen) {
        // When open: handle navigation, selection, close
        if (e.key === 'Escape') {
          e.preventDefault()
          ctx.onOpenChange(false)
          return
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          ctx.setActiveIndex(Math.min(ctx.activeIndex + 1, ctx.itemCount - 1))
          return
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          ctx.setActiveIndex(Math.max(ctx.activeIndex - 1, 0))
          return
        }
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          const item = ctx.items.current[ctx.activeIndex]
          if (item && !item.disabled) {
            ctx.onSelect(item.value, item.label)
          }
          return
        }
      } else {
        // When closed: open on arrow/enter/space
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          ctx.onOpenChange(true)
          return
        }
      }

      onKeyDown?.(e)
    }, [ctx, onKeyDown])

    return (
      <StyledTrigger
        ref={mergeRefs(ref, ctx.triggerRef)}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={ctx.isOpen}
        aria-controls={ctx.isOpen ? ctx.contentId : undefined}
        disabled={ctx.disabled}
        size={ctx.size}
        data-state={ctx.isOpen ? 'open' : 'closed'}
        onClick={(e) => {
          if (ctx.disabled) return
          ctx.onOpenChange(!ctx.isOpen)
          onClick?.(e)
        }}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children ?? (
          <>
            {ctx.displayLabel
              ? <span>{ctx.displayLabel}</span>
              : <StyledPlaceholder>{ctx.placeholder ?? 'Select...'}</StyledPlaceholder>}
            <ChevronDownIcon />
          </>
        )}
      </StyledTrigger>
    )
  },
)
SelectTrigger.displayName = 'Select.Trigger'

// ─── Value ──────────────────────────────────────────────────────────────────

export interface SelectValueProps extends ComponentPropsWithRef<'span'> {
  placeholder?: string
}

const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ placeholder: placeholderProp, ...rest }, ref) => {
    const ctx = useSelectContext()
    const ph = placeholderProp ?? ctx.placeholder ?? 'Select...'
    return (
      <span ref={ref} {...rest}>
        {ctx.displayLabel ?? <StyledPlaceholder>{ph}</StyledPlaceholder>}
      </span>
    )
  },
)
SelectValue.displayName = 'Select.Value'

// ─── Icon ───────────────────────────────────────────────────────────────────

const SelectIcon = forwardRef<HTMLSpanElement, ComponentPropsWithRef<'span'>>(
  ({ children, ...rest }, ref) => (
    <span ref={ref} aria-hidden="true" {...rest}>
      {children ?? <ChevronDownIcon />}
    </span>
  ),
)
SelectIcon.displayName = 'Select.Icon'

// ─── Content ────────────────────────────────────────────────────────────────

export interface SelectContentProps extends ComponentPropsWithRef<typeof StyledContent> {}

const SelectContentInner = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const ctx = useSelectContext()
    const contentRef = useRef<HTMLDivElement>(null)

    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })

    useEffect(() => {
      if (!ctx.triggerRef.current) return
      const rect = ctx.triggerRef.current.getBoundingClientRect()
      setPosition({ top: rect.bottom + 4, left: rect.left, width: rect.width })
    }, [ctx.triggerRef])

    // Click outside
    useEffect(() => {
      const handleMouseDown = (e: MouseEvent) => {
        const target = e.target as Node
        if (
          contentRef.current && !contentRef.current.contains(target) &&
          ctx.triggerRef.current && !ctx.triggerRef.current.contains(target)
        ) {
          ctx.onOpenChange(false)
        }
      }
      document.addEventListener('mousedown', handleMouseDown)
      return () => document.removeEventListener('mousedown', handleMouseDown)
    }, [ctx])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        ctx.onOpenChange(false)
        ctx.triggerRef.current?.focus()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        ctx.setActiveIndex(Math.min(ctx.activeIndex + 1, ctx.itemCount - 1))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        ctx.setActiveIndex(Math.max(ctx.activeIndex - 1, 0))
        return
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        const item = ctx.items.current[ctx.activeIndex]
        if (item && !item.disabled) {
          ctx.onSelect(item.value, item.label)
        }
        return
      }
      onKeyDown?.(e)
    }, [ctx, onKeyDown])

    return (
      <Portal>
        <StyledContent
          ref={mergeRefs(ref, contentRef)}
          id={ctx.contentId}
          role="listbox"
          data-state="open"
          tabIndex={-1}
          style={{ top: position.top, left: position.left, minWidth: position.width || undefined }}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          {children}
        </StyledContent>
      </Portal>
    )
  },
)
SelectContentInner.displayName = 'Select.ContentInner'

const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  (props, ref) => {
    const ctx = useSelectContext()
    if (!ctx.isOpen) return null
    return <SelectContentInner ref={ref} {...props} />
  },
)
SelectContent.displayName = 'Select.Content'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface SelectItemProps extends ComponentPropsWithRef<typeof StyledItem> {
  value: string
  disabled?: boolean
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, value, disabled = false, onClick, ...rest }, ref) => {
    const ctx = useSelectContext()
    const indexRef = useRef(-1)
    const label = typeof children === 'string' ? children : ''

    if (indexRef.current === -1) {
      indexRef.current = ctx.registerItem(value, label, disabled)
    }

    const isSelected = ctx.value === value

    return (
      <StyledItem
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        tabIndex={indexRef.current === ctx.activeIndex ? 0 : -1}
        data-roving-item=""
        onMouseEnter={() => ctx.setActiveIndex(indexRef.current)}
        onClick={(e) => {
          if (disabled) return
          ctx.onSelect(value, label)
          onClick?.(e)
        }}
        onFocus={() => ctx.setActiveIndex(indexRef.current)}
        {...rest}
      >
        <StyledCheckIndicator>
          {isSelected && <CheckIcon />}
        </StyledCheckIndicator>
        {children}
      </StyledItem>
    )
  },
)
SelectItem.displayName = 'Select.Item'

// ─── Group ──────────────────────────────────────────────────────────────────

const SelectGroup = forwardRef<HTMLDivElement, ComponentPropsWithRef<'div'>>(
  (props, ref) => <div ref={ref} role="group" {...props} />,
)
SelectGroup.displayName = 'Select.Group'

// ─── Label ──────────────────────────────────────────────────────────────────

const SelectLabel = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledLabel>>(
  (props, ref) => <StyledLabel ref={ref} {...props} />,
)
SelectLabel.displayName = 'Select.Label'

// ─── Separator ──────────────────────────────────────────────────────────────

const SelectSeparator = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledSeparator>>(
  (props, ref) => <StyledSeparator ref={ref} role="separator" aria-orientation="horizontal" {...props} />,
)
SelectSeparator.displayName = 'Select.Separator'

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Walk children to extract value->label pairs from Item elements */
function extractLabels(children: React.ReactNode): Map<string, string> {
  const map = new Map<string, string>()
  const walk = (nodes: React.ReactNode) => {
    Children.forEach(nodes, (child) => {
      if (!isValidElement(child)) return
      const p = child.props as Record<string, unknown>
      if (p.value && typeof p.children === 'string') {
        map.set(p.value as string, p.children)
      }
      if (p.children) walk(p.children as React.ReactNode)
    })
  }
  walk(children)
  return map
}

// ─── Inline Root (renders trigger+content automatically) ────────────────────

const SelectInline = forwardRef<HTMLDivElement, SelectProps & Omit<ComponentPropsWithRef<'div'>, keyof SelectProps>>(
  ({ children, defaultValue, value, ...props }, ref) => {
    // Extract labels from children to resolve display text for defaultValue
    const labels = useMemo(() => extractLabels(children), [children])
    const resolvedValue = value ?? defaultValue
    const initialLabel = resolvedValue ? labels.get(resolvedValue) : undefined

    return (
      <SelectRoot ref={ref} defaultValue={defaultValue} value={value} _initialLabel={initialLabel} {...props as any}>
        <SelectTrigger />
        <SelectContent>
          {children}
        </SelectContent>
      </SelectRoot>
    )
  },
)
SelectInline.displayName = 'Select'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Select = Object.assign(SelectInline, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Value: SelectValue,
  Icon: SelectIcon,
  Group: SelectGroup,
  Label: SelectLabel,
  Separator: SelectSeparator,
})
