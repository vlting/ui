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
import { useDisclosure } from '../../headless/src/useDisclosure'
import { useRovingTabIndex } from '../../headless/src/useRovingTabIndex'
import { useTypeahead } from '../../headless/src/useTypeahead'
import { styled } from '../../stl-react/src/config'
import { Portal } from '../../stl-react/src/primitives/Portal/Portal'
import { mergeRefs } from '../../utils/mergeRefs'

// ─── Context ────────────────────────────────────────────────────────────────

interface DropdownMenuContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
  contentId: string
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

function useDropdownMenuContext() {
  const ctx = useContext(DropdownMenuContext)
  if (!ctx) throw new Error('DropdownMenu compound components must be used within DropdownMenu.Root')
  return ctx
}

interface ContentContextValue {
  registerItem: (label: string, disabled?: boolean) => number
  unregisterItem: (index: number) => void
  activeIndex: number
  setActiveIndex: (i: number) => void
  onClose: () => void
  itemCount: number
}

const ContentContext = createContext<ContentContextValue | null>(null)

function useContentContext() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('DropdownMenu.Item must be used within DropdownMenu.Content')
  return ctx
}

interface RadioGroupContextValue {
  value: string
  onValueChange: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

// ─── Styled Elements ────────────────────────────────────────────────────────

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
}, { name: 'DropdownMenuContent' })

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
  name: 'DropdownMenuItem',
  variants: {
    disabled: {
      true: { opacity: '$disabledOpacity', cursor: 'not-allowed', pointerEvents: 'none' },
    },
  },
})

const StyledCheckboxIndicator = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  flexShrink: '0',
}, { name: 'DropdownMenuCheckboxIndicator' })

const StyledLabel = styled('div', {
  px: '$8',
  py: '$4',
  mx: '$4',
  fontSize: '$small',
  fontWeight: '$600',
  fontFamily: '$body',
  color: '$neutral9',
}, { name: 'DropdownMenuLabel' })

const StyledSeparator = styled('div', {
  height: '1px',
  bg: '$neutralAlpha5',
  my: '$4',
}, { name: 'DropdownMenuSeparator' })

const StyledShortcut = styled('span', {
  ml: 'auto',
  fontSize: '$small',
  color: '$neutral7',
  fontFamily: '$code',
}, { name: 'DropdownMenuShortcut' })

// ─── Icons ──────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 5" />
  </svg>
)

const DotIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <circle cx="8" cy="8" r="3" />
  </svg>
)

// ─── Root ───────────────────────────────────────────────────────────────────

export interface DropdownMenuRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const DropdownMenuRoot = forwardRef<HTMLDivElement, DropdownMenuRootProps>(
  ({ children, open, defaultOpen, onOpenChange: onOpenChangeProp }, _ref) => {
    const disclosure = useDisclosure({ open, defaultOpen, onOpenChange: onOpenChangeProp })
    const contentId = useId()
    const triggerRef = useRef<HTMLButtonElement>(null)

    const value = useMemo(() => ({
      isOpen: disclosure.isOpen,
      onOpenChange: (next: boolean) => {
        if (next) disclosure.onOpen()
        else disclosure.onClose()
      },
      triggerRef,
      contentId,
    }), [disclosure, contentId])

    return (
      <DropdownMenuContext.Provider value={value}>
        {children}
      </DropdownMenuContext.Provider>
    )
  },
)
DropdownMenuRoot.displayName = 'DropdownMenu.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface DropdownMenuTriggerProps extends ComponentPropsWithRef<'button'> {}

const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ children, onClick, onKeyDown, ...rest }, ref) => {
    const { isOpen, onOpenChange, contentId, triggerRef } = useDropdownMenuContext()

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onOpenChange(true)
      }
      onKeyDown?.(e)
    }, [onOpenChange, onKeyDown])

    return (
      <button
        ref={mergeRefs(ref, triggerRef)}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? contentId : undefined}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={(e) => {
          onOpenChange(!isOpen)
          onClick?.(e)
        }}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
DropdownMenuTrigger.displayName = 'DropdownMenu.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface DropdownMenuContentProps extends ComponentPropsWithRef<typeof StyledContent> {}

const DropdownMenuContentInner = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const { onOpenChange, contentId, triggerRef } = useDropdownMenuContext()
    const contentRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const itemsRef = useRef<{ label: string; disabled: boolean }[]>([])
    const [itemCount, setItemCount] = useState(0)
    const indexCounterRef = useRef(0)

    // Position relative to trigger
    const [position, setPosition] = useState({ top: 0, left: 0 })

    useEffect(() => {
      if (!triggerRef.current) return
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({ top: rect.bottom + 4, left: rect.left })
    }, [triggerRef])

    const disabledIndices = useMemo(() => {
      const set = new Set<number>()
      itemsRef.current.forEach((item, i) => {
        if (item.disabled) set.add(i)
      })
      return set
    }, [itemCount])

    const registerItem = useCallback((label: string, disabled = false) => {
      const idx = indexCounterRef.current++
      itemsRef.current[idx] = { label, disabled }
      setItemCount(indexCounterRef.current)
      return idx
    }, [])

    const unregisterItem = useCallback((_index: number) => {}, [])

    const { getContainerProps } = useRovingTabIndex({
      count: itemCount,
      activeIndex,
      onActiveIndexChange: setActiveIndex,
      orientation: 'vertical',
      loop: true,
      disabledIndices,
    })

    const itemLabels = useMemo(
      () => itemsRef.current.map((i) => i.label),
      [itemCount],
    )

    const { getTypeaheadProps } = useTypeahead({
      items: itemLabels,
      onMatch: (index) => {
        if (!disabledIndices.has(index)) {
          setActiveIndex(index)
          if (contentRef.current) {
            const items = contentRef.current.querySelectorAll<HTMLElement>('[data-roving-item]')
            items[index]?.focus()
          }
        }
      },
    })

    const containerProps = getContainerProps()
    const typeaheadProps = getTypeaheadProps()

    // Click outside
    useEffect(() => {
      const handleMouseDown = (e: MouseEvent) => {
        const target = e.target as Node
        if (
          contentRef.current && !contentRef.current.contains(target) &&
          triggerRef.current && !triggerRef.current.contains(target)
        ) {
          onOpenChange(false)
        }
      }
      document.addEventListener('mousedown', handleMouseDown)
      return () => document.removeEventListener('mousedown', handleMouseDown)
    }, [onOpenChange, triggerRef])

    // Auto-focus first item
    useEffect(() => {
      if (!contentRef.current) return
      const items = contentRef.current.querySelectorAll<HTMLElement>('[data-roving-item]')
      for (let i = 0; i < items.length; i++) {
        if (items[i].getAttribute('aria-disabled') !== 'true') {
          items[i].focus()
          setActiveIndex(i)
          break
        }
      }
    }, [itemCount])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onOpenChange(false)
        triggerRef.current?.focus()
        return
      }
      containerProps.onKeyDown(e)
      typeaheadProps.onKeyDown(e)
      onKeyDown?.(e)
    }, [onOpenChange, triggerRef, containerProps, typeaheadProps, onKeyDown])

    const onClose = useCallback(() => {
      onOpenChange(false)
      triggerRef.current?.focus()
    }, [onOpenChange, triggerRef])

    const contentCtxValue = useMemo(() => ({
      registerItem,
      unregisterItem,
      activeIndex,
      setActiveIndex,
      onClose,
      itemCount,
    }), [registerItem, unregisterItem, activeIndex, setActiveIndex, onClose, itemCount])

    useEffect(() => {
      indexCounterRef.current = 0
      itemsRef.current = []
    }, [])

    return (
      <Portal>
        <ContentContext.Provider value={contentCtxValue}>
          <StyledContent
            ref={mergeRefs(ref, contentRef, containerProps.ref)}
            id={contentId}
            role="menu"
            data-state="open"
            tabIndex={-1}
            style={{ top: position.top, left: position.left }}
            onKeyDown={handleKeyDown}
            {...rest}
          >
            {children}
          </StyledContent>
        </ContentContext.Provider>
      </Portal>
    )
  },
)
DropdownMenuContentInner.displayName = 'DropdownMenu.ContentInner'

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  (props, ref) => {
    const { isOpen } = useDropdownMenuContext()
    if (!isOpen) return null
    return <DropdownMenuContentInner ref={ref} {...props} />
  },
)
DropdownMenuContent.displayName = 'DropdownMenu.Content'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface DropdownMenuItemProps extends ComponentPropsWithRef<typeof StyledItem> {
  disabled?: boolean
  onSelect?: () => void
}

const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ children, disabled = false, onSelect, onClick, onKeyDown, ...rest }, ref) => {
    const ctx = useContentContext()
    const indexRef = useRef(-1)

    if (indexRef.current === -1) {
      indexRef.current = ctx.registerItem(
        typeof children === 'string' ? children : '',
        disabled,
      )
    }

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onSelect?.()
      ctx.onClose()
      onClick?.(e)
    }, [disabled, onSelect, ctx, onClick])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect?.()
        ctx.onClose()
      }
      onKeyDown?.(e)
    }, [disabled, onSelect, ctx, onKeyDown])

    return (
      <StyledItem
        ref={ref}
        role="menuitem"
        tabIndex={indexRef.current === ctx.activeIndex ? 0 : -1}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        data-roving-item=""
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={() => ctx.setActiveIndex(indexRef.current)}
        {...rest}
      >
        {children}
      </StyledItem>
    )
  },
)
DropdownMenuItem.displayName = 'DropdownMenu.Item'

// ─── CheckboxItem ───────────────────────────────────────────────────────────

export interface DropdownMenuCheckboxItemProps extends ComponentPropsWithRef<typeof StyledItem> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  onSelect?: () => void
}

const DropdownMenuCheckboxItem = forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  ({ children, checked, onCheckedChange, disabled = false, onSelect, onClick, onKeyDown, ...rest }, ref) => {
    const ctx = useContentContext()
    const indexRef = useRef(-1)

    if (indexRef.current === -1) {
      indexRef.current = ctx.registerItem(
        typeof children === 'string' ? children : '',
        disabled,
      )
    }

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onCheckedChange(!checked)
      onSelect?.()
      onClick?.(e)
    }, [disabled, checked, onCheckedChange, onSelect, onClick])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onCheckedChange(!checked)
        onSelect?.()
      }
      onKeyDown?.(e)
    }, [disabled, checked, onCheckedChange, onSelect, onKeyDown])

    return (
      <StyledItem
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        tabIndex={indexRef.current === ctx.activeIndex ? 0 : -1}
        data-roving-item=""
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={() => ctx.setActiveIndex(indexRef.current)}
        {...rest}
      >
        <StyledCheckboxIndicator>
          {checked && <CheckIcon />}
        </StyledCheckboxIndicator>
        {children}
      </StyledItem>
    )
  },
)
DropdownMenuCheckboxItem.displayName = 'DropdownMenu.CheckboxItem'

// ─── RadioGroup ─────────────────────────────────────────────────────────────

export interface DropdownMenuRadioGroupProps extends ComponentPropsWithRef<'div'> {
  value: string
  onValueChange: (value: string) => void
}

const DropdownMenuRadioGroup = forwardRef<HTMLDivElement, DropdownMenuRadioGroupProps>(
  ({ children, value, onValueChange, ...rest }, ref) => (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} role="group" {...rest}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  ),
)
DropdownMenuRadioGroup.displayName = 'DropdownMenu.RadioGroup'

// ─── RadioItem ──────────────────────────────────────────────────────────────

export interface DropdownMenuRadioItemProps extends ComponentPropsWithRef<typeof StyledItem> {
  value: string
  disabled?: boolean
}

const DropdownMenuRadioItem = forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  ({ children, value, disabled = false, onClick, onKeyDown, ...rest }, ref) => {
    const ctx = useContentContext()
    const radioCtx = useContext(RadioGroupContext)
    const isChecked = radioCtx?.value === value
    const indexRef = useRef(-1)

    if (indexRef.current === -1) {
      indexRef.current = ctx.registerItem(
        typeof children === 'string' ? children : '',
        disabled,
      )
    }

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      radioCtx?.onValueChange(value)
      onClick?.(e)
    }, [disabled, value, radioCtx, onClick])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        radioCtx?.onValueChange(value)
      }
      onKeyDown?.(e)
    }, [disabled, value, radioCtx, onKeyDown])

    return (
      <StyledItem
        ref={ref}
        role="menuitemradio"
        aria-checked={isChecked}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        tabIndex={indexRef.current === ctx.activeIndex ? 0 : -1}
        data-roving-item=""
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={() => ctx.setActiveIndex(indexRef.current)}
        {...rest}
      >
        <StyledCheckboxIndicator>
          {isChecked && <DotIcon />}
        </StyledCheckboxIndicator>
        {children}
      </StyledItem>
    )
  },
)
DropdownMenuRadioItem.displayName = 'DropdownMenu.RadioItem'

// ─── Group ──────────────────────────────────────────────────────────────────

const DropdownMenuGroup = forwardRef<HTMLDivElement, ComponentPropsWithRef<'div'>>(
  (props, ref) => <div ref={ref} role="group" {...props} />,
)
DropdownMenuGroup.displayName = 'DropdownMenu.Group'

// ─── Label ──────────────────────────────────────────────────────────────────

const DropdownMenuLabel = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledLabel>>(
  (props, ref) => <StyledLabel ref={ref} {...props} />,
)
DropdownMenuLabel.displayName = 'DropdownMenu.Label'

// ─── Separator ──────────────────────────────────────────────────────────────

const DropdownMenuSeparator = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledSeparator>>(
  (props, ref) => <StyledSeparator ref={ref} role="separator" aria-orientation="horizontal" {...props} />,
)
DropdownMenuSeparator.displayName = 'DropdownMenu.Separator'

// ─── Shortcut ───────────────────────────────────────────────────────────────

const DropdownMenuShortcut = forwardRef<HTMLSpanElement, ComponentPropsWithRef<typeof StyledShortcut>>(
  (props, ref) => <StyledShortcut ref={ref} aria-hidden="true" {...props} />,
)
DropdownMenuShortcut.displayName = 'DropdownMenu.Shortcut'

// ─── Export ─────────────────────────────────────────────────────────────────

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Group: DropdownMenuGroup,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
})
