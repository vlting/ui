import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
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

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

// ─── Context ────────────────────────────────────────────────────────────────

interface ComboboxContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  value: string | undefined
  onSelect: (value: string, label: string) => void
  searchValue: string
  setSearchValue: (v: string) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  contentId: string
  disabled: boolean
  activeIndex: number
  setActiveIndex: (i: number) => void
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null)

function useComboboxContext() {
  const ctx = useContext(ComboboxContext)
  if (!ctx) throw new Error('Combobox compound components must be used within Combobox.Root')
  return ctx
}

interface ContentContextValue {
  registerItem: (value: string, label: string, disabled?: boolean) => number
  activeIndex: number
  setActiveIndex: (i: number) => void
  selectedValue: string | undefined
  itemCount: number
}

const ContentContext = createContext<ContentContextValue | null>(null)

function useContentContext() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('Combobox.Item must be used within Combobox.Content')
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledInput = styled('input', {
  display: 'flex',
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
  outline: 'none',
  ':focus': { outlineWidth: '2px', outlineStyle: 'solid', outlineColor: '$neutral7', outlineOffset: '1px' },
}, {
  name: 'ComboboxInput',
  variants: {
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
  zIndex: '$max',
  position: 'fixed',
  borderWidth: '$widthMin',
  borderStyle: '$styleDefault',
  borderColor: '$neutralMin',
  outline: 'none',
}, { name: 'ComboboxContent' })

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
  name: 'ComboboxItem',
  variants: {
    disabled: {
      true: { opacity: '$disabledOpacity', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
})

const StyledEmpty = styled('div', {
  px: '$8',
  py: '$24',
  textAlign: 'center',
  color: '$neutral7',
  fontSize: '$p',
  fontFamily: '$body',
}, { name: 'ComboboxEmpty' })

const StyledLabel = styled('div', {
  px: '$8',
  py: '$4',
  mx: '$4',
  fontSize: '$small',
  fontWeight: '$600',
  fontFamily: '$body',
  color: '$neutral9',
}, { name: 'ComboboxLabel' })

const StyledCheckIndicator = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  flexShrink: '0',
}, { name: 'ComboboxCheckIndicator' })

// ─── Icons ──────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 5" />
  </svg>
)

// ─── Root ───────────────────────────────────────────────────────────────────

export interface ComboboxRootProps {
  children?: React.ReactNode
  /** Selected value */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Search input text */
  searchValue?: string
  onSearchChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  /** Legacy options-based API */
  options?: ComboboxOption[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const ComboboxRoot = forwardRef<HTMLDivElement, ComboboxRootProps & Omit<ComponentPropsWithRef<'div'>, keyof ComboboxRootProps>>(
  ({ children, value: valueProp, defaultValue, onValueChange, searchValue: searchProp, onSearchChange, disabled = false, placeholder, options, open, onOpenChange: onOpenChangeProp, ...rest }, ref) => {
    const disclosure = useDisclosure({ open, onOpenChange: onOpenChangeProp })
    const contentId = useId()
    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useControllableState({ prop: valueProp, defaultProp: defaultValue, onChange: onValueChange })
    // Resolve initial search text from options API
    const initialSearch = searchProp ?? (options && valueProp ? options.find((o) => o.value === valueProp)?.label : '') ?? ''
    const [searchValue, setSearchValueInternal] = useState(initialSearch)
    const [activeIndex, setActiveIndex] = useState(0)

    const setSearchValue = useCallback((v: string) => {
      setSearchValueInternal(v)
      onSearchChange?.(v)
    }, [onSearchChange])

    // Sync controlled searchValue
    useEffect(() => {
      if (searchProp !== undefined) setSearchValueInternal(searchProp)
    }, [searchProp])

    const onSelect = useCallback((itemValue: string, label: string) => {
      setValue(itemValue)
      setSearchValue(label)
      disclosure.onClose()
      inputRef.current?.focus()
    }, [setValue, setSearchValue, disclosure])

    const onOpenChange = useCallback((next: boolean) => {
      if (disabled) return
      if (next) disclosure.onOpen()
      else disclosure.onClose()
    }, [disabled, disclosure])

    const ctx = useMemo(() => ({
      isOpen: disclosure.isOpen,
      onOpenChange,
      value,
      onSelect,
      searchValue,
      setSearchValue,
      inputRef,
      contentId,
      disabled,
      activeIndex,
      setActiveIndex,
    }), [disclosure.isOpen, onOpenChange, value, onSelect, searchValue, setSearchValue, contentId, disabled, activeIndex])

    // Options-based API (simple mode)
    if (options) {
      const filtered = options.filter((o) =>
        o.label.toLowerCase().includes(searchValue.toLowerCase()),
      )
      const selectedOption = options.find((o) => o.value === value)

      return (
        <ComboboxContext.Provider value={ctx}>
          <div ref={ref} {...rest}>
            <ComboboxInput placeholder={placeholder} />
            {disclosure.isOpen && (
              <ComboboxContent>
                {filtered.length === 0
                  ? <ComboboxEmpty>No results found</ComboboxEmpty>
                  : filtered.map((o) => (
                    <ComboboxItem key={o.value} value={o.value} disabled={o.disabled}>
                      {o.label}
                    </ComboboxItem>
                  ))}
              </ComboboxContent>
            )}
            {/* Display selected value when not open */}
            {!disclosure.isOpen && selectedOption && !searchValue && (
              <span data-display-value="">{selectedOption.label}</span>
            )}
          </div>
        </ComboboxContext.Provider>
      )
    }

    return (
      <ComboboxContext.Provider value={ctx}>
        <div ref={ref} {...rest}>
          {children}
        </div>
      </ComboboxContext.Provider>
    )
  },
)
ComboboxRoot.displayName = 'Combobox.Root'

// ─── Input ──────────────────────────────────────────────────────────────────

export interface ComboboxInputProps extends ComponentPropsWithRef<typeof StyledInput> {}

const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  ({ onChange, onFocus, onKeyDown, ...rest }, ref) => {
    const ctx = useComboboxContext()

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (!ctx.isOpen) ctx.onOpenChange(true)
        else ctx.setActiveIndex(Math.min(ctx.activeIndex + 1, 999))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        ctx.setActiveIndex(Math.max(ctx.activeIndex - 1, 0))
      } else if (e.key === 'Escape') {
        e.preventDefault()
        ctx.onOpenChange(false)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        // Selection handled by content context
      }
      onKeyDown?.(e)
    }, [ctx, onKeyDown])

    return (
      <StyledInput
        ref={mergeRefs(ref, ctx.inputRef)}
        type="text"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={ctx.isOpen}
        aria-controls={ctx.isOpen ? ctx.contentId : undefined}
        aria-autocomplete="list"
        autoComplete="off"
        disabled={ctx.disabled}
        value={ctx.searchValue}
        onChange={(e) => {
          ctx.setSearchValue(e.target.value)
          if (!ctx.isOpen) ctx.onOpenChange(true)
          ctx.setActiveIndex(0)
          onChange?.(e)
        }}
        onFocus={(e) => {
          ctx.onOpenChange(true)
          onFocus?.(e)
        }}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    )
  },
)
ComboboxInput.displayName = 'Combobox.Input'

// ─── Content ────────────────────────────────────────────────────────────────

export interface ComboboxContentProps extends ComponentPropsWithRef<typeof StyledContent> {}

const ComboboxContentInner = forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ children, ...rest }, ref) => {
    const ctx = useComboboxContext()
    const contentRef = useRef<HTMLDivElement>(null)
    const itemsRef = useRef<{ value: string; label: string; disabled: boolean }[]>([])
    const [itemCount, setItemCount] = useState(0)
    const indexCounterRef = useRef(0)

    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })

    useEffect(() => {
      if (!ctx.inputRef.current) return
      const rect = ctx.inputRef.current.getBoundingClientRect()
      setPosition({ top: rect.bottom + 4, left: rect.left, width: rect.width })
    }, [ctx.inputRef])

    const registerItem = useCallback((value: string, label: string, disabled = false) => {
      const idx = indexCounterRef.current++
      itemsRef.current[idx] = { value, label, disabled }
      setItemCount(indexCounterRef.current)
      return idx
    }, [])

    // Click outside
    useEffect(() => {
      const handleMouseDown = (e: MouseEvent) => {
        const target = e.target as Node
        if (
          contentRef.current && !contentRef.current.contains(target) &&
          ctx.inputRef.current && !ctx.inputRef.current.contains(target)
        ) {
          ctx.onOpenChange(false)
        }
      }
      document.addEventListener('mousedown', handleMouseDown)
      return () => document.removeEventListener('mousedown', handleMouseDown)
    }, [ctx])

    // Enter selects active item
    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && ctx.isOpen) {
          const item = itemsRef.current[ctx.activeIndex]
          if (item && !item.disabled) {
            ctx.onSelect(item.value, item.label)
          }
        }
      }
      ctx.inputRef.current?.addEventListener('keydown', handler)
      const inputEl = ctx.inputRef.current
      return () => inputEl?.removeEventListener('keydown', handler)
    }, [ctx])

    const contentCtxValue = useMemo(() => ({
      registerItem,
      activeIndex: ctx.activeIndex,
      setActiveIndex: ctx.setActiveIndex,
      selectedValue: ctx.value,
      itemCount,
    }), [registerItem, ctx.activeIndex, ctx.setActiveIndex, ctx.value, itemCount])

    useEffect(() => {
      indexCounterRef.current = 0
      itemsRef.current = []
    }, [])

    return (
      <Portal>
        <ContentContext.Provider value={contentCtxValue}>
          <StyledContent
            ref={mergeRefs(ref, contentRef)}
            id={ctx.contentId}
            role="listbox"
            data-state="open"
            tabIndex={-1}
            style={{ top: position.top, left: position.left, minWidth: position.width || undefined }}
            {...rest}
          >
            {children}
          </StyledContent>
        </ContentContext.Provider>
      </Portal>
    )
  },
)
ComboboxContentInner.displayName = 'Combobox.ContentInner'

const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  (props, ref) => {
    const ctx = useComboboxContext()
    if (!ctx.isOpen) return null
    return <ComboboxContentInner ref={ref} {...props} />
  },
)
ComboboxContent.displayName = 'Combobox.Content'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface ComboboxItemProps extends ComponentPropsWithRef<typeof StyledItem> {
  value: string
  disabled?: boolean
}

const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(
  ({ children, value, disabled = false, onClick, ...rest }, ref) => {
    const comboCtx = useComboboxContext()
    const contentCtx = useContentContext()
    const indexRef = useRef(-1)
    const label = typeof children === 'string' ? children : ''

    if (indexRef.current === -1) {
      indexRef.current = contentCtx.registerItem(value, label, disabled)
    }

    const isSelected = comboCtx.value === value
    const isHighlighted = indexRef.current === contentCtx.activeIndex

    return (
      <StyledItem
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        tabIndex={-1}
        data-highlighted={isHighlighted || undefined}
        onMouseEnter={() => contentCtx.setActiveIndex(indexRef.current)}
        onClick={(e) => {
          if (disabled) return
          comboCtx.onSelect(value, label)
          onClick?.(e)
        }}
        stl={isHighlighted ? { bg: '$neutral4' } : undefined}
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
ComboboxItem.displayName = 'Combobox.Item'

// ─── Group ──────────────────────────────────────────────────────────────────

const ComboboxGroup = forwardRef<HTMLDivElement, ComponentPropsWithRef<'div'>>(
  (props, ref) => <div ref={ref} role="group" {...props} />,
)
ComboboxGroup.displayName = 'Combobox.Group'

// ─── Label ──────────────────────────────────────────────────────────────────

const ComboboxLabel = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledLabel>>(
  (props, ref) => <StyledLabel ref={ref} {...props} />,
)
ComboboxLabel.displayName = 'Combobox.Label'

// ─── Empty ──────────────────────────────────────────────────────────────────

const ComboboxEmpty = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledEmpty>>(
  ({ children, ...rest }, ref) => (
    <StyledEmpty ref={ref} role="presentation" {...rest}>
      {children ?? 'No results found'}
    </StyledEmpty>
  ),
)
ComboboxEmpty.displayName = 'Combobox.Empty'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Combobox = {
  Root: ComboboxRoot,
  Input: ComboboxInput,
  Content: ComboboxContent,
  Item: ComboboxItem,
  Group: ComboboxGroup,
  Label: ComboboxLabel,
  Empty: ComboboxEmpty,
}
