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

interface MenuContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
  contentId: string
}

const MenuContext = createContext<MenuContextValue | null>(null)

function useMenuContext() {
  const ctx = useContext(MenuContext)
  if (!ctx) throw new Error('Menu compound components must be used within Menu.Root')
  return ctx
}

interface MenuContentContextValue {
  registerItem: (label: string, disabled?: boolean) => number
  unregisterItem: (index: number) => void
  activeIndex: number
  setActiveIndex: (i: number) => void
  onClose: () => void
  itemCount: number
}

const MenuContentContext = createContext<MenuContentContextValue | null>(null)

function useMenuContentContext() {
  const ctx = useContext(MenuContentContext)
  if (!ctx) throw new Error('Menu.Item must be used within Menu.Content')
  return ctx
}

interface RadioGroupContextValue {
  value: string
  onValueChange: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function useRadioGroupContext() {
  const ctx = useContext(RadioGroupContext)
  if (!ctx) throw new Error('Menu.RadioItem must be used within Menu.RadioGroup')
  return ctx
}

interface SubMenuContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<HTMLDivElement | null>
  contentId: string
}

const SubMenuContext = createContext<SubMenuContextValue | null>(null)

function useSubMenuContext() {
  const ctx = useContext(SubMenuContext)
  if (!ctx) throw new Error('Menu.SubTrigger/SubContent must be used within Menu.Sub')
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

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
}, { name: 'MenuContent' })

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
  name: 'MenuItem',
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
}, { name: 'MenuCheckboxIndicator' })

const StyledLabel = styled('div', {
  px: '$8',
  py: '$4',
  mx: '$4',
  fontSize: '$small',
  fontWeight: '$600',
  fontFamily: '$body',
  color: '$neutral9',
}, { name: 'MenuLabel' })

const StyledSeparator = styled('div', {
  height: '1px',
  bg: '$neutralAlpha5',
  my: '$4',
}, { name: 'MenuSeparator' })

const StyledShortcut = styled('span', {
  ml: 'auto',
  fontSize: '$small',
  color: '$neutral7',
  fontFamily: '$code',
}, { name: 'MenuShortcut' })

const StyledSubTriggerChevron = styled('span', {
  ml: 'auto',
  display: 'flex',
  alignItems: 'center',
  color: '$neutral7',
}, { name: 'MenuSubChevron' })

// ─── Helpers ────────────────────────────────────────────────────────────────

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

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 4l4 4-4 4" />
  </svg>
)

// ─── Root ───────────────────────────────────────────────────────────────────

export interface MenuRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const MenuRoot = forwardRef<HTMLDivElement, MenuRootProps>(
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
      <MenuContext.Provider value={value}>
        {children}
      </MenuContext.Provider>
    )
  },
)
MenuRoot.displayName = 'Menu.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface MenuTriggerProps extends ComponentPropsWithRef<'button'> {}

const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ children, onClick, onKeyDown, ...rest }, ref) => {
    const { isOpen, onOpenChange, contentId, triggerRef } = useMenuContext()

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
MenuTrigger.displayName = 'Menu.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface MenuContentProps extends ComponentPropsWithRef<typeof StyledContent> {}

const MenuContentInner = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const { isOpen, onOpenChange, contentId, triggerRef } = useMenuContext()
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

    const unregisterItem = useCallback((_index: number) => {
      // No-op for simplicity; items stay registered during lifecycle
    }, [])

    const { getContainerProps, getItemProps: _getItemProps } = useRovingTabIndex({
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
          // Focus the matched item
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

    const contentCtxValue = useMemo(() => ({
      registerItem,
      unregisterItem,
      activeIndex,
      setActiveIndex,
      onClose: () => {
        onOpenChange(false)
        triggerRef.current?.focus()
      },
      itemCount,
    }), [registerItem, unregisterItem, activeIndex, setActiveIndex, onOpenChange, triggerRef, itemCount])

    // Reset index counter on mount
    useEffect(() => {
      indexCounterRef.current = 0
      itemsRef.current = []
    }, [])

    return (
      <Portal>
        <MenuContentContext.Provider value={contentCtxValue}>
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
        </MenuContentContext.Provider>
      </Portal>
    )
  },
)
MenuContentInner.displayName = 'Menu.ContentInner'

const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  (props, ref) => {
    const { isOpen } = useMenuContext()
    if (!isOpen) return null
    return <MenuContentInner ref={ref} {...props} />
  },
)
MenuContent.displayName = 'Menu.Content'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface MenuItemProps extends ComponentPropsWithRef<typeof StyledItem> {
  disabled?: boolean
  onSelect?: () => void
}

const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, disabled = false, onSelect, onClick, onKeyDown, ...rest }, ref) => {
    const ctx = useMenuContentContext()
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
MenuItem.displayName = 'Menu.Item'

// ─── CheckboxItem ───────────────────────────────────────────────────────────

export interface MenuCheckboxItemProps extends ComponentPropsWithRef<typeof StyledItem> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  onSelect?: () => void
}

const MenuCheckboxItem = forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  ({ children, checked, onCheckedChange, disabled = false, onSelect, onClick, onKeyDown, ...rest }, ref) => {
    const ctx = useMenuContentContext()
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
MenuCheckboxItem.displayName = 'Menu.CheckboxItem'

// ─── RadioGroup ─────────────────────────────────────────────────────────────

export interface MenuRadioGroupProps extends ComponentPropsWithRef<'div'> {
  value: string
  onValueChange: (value: string) => void
}

const MenuRadioGroup = forwardRef<HTMLDivElement, MenuRadioGroupProps>(
  ({ children, value, onValueChange, ...rest }, ref) => (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} role="group" {...rest}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  ),
)
MenuRadioGroup.displayName = 'Menu.RadioGroup'

// ─── RadioItem ──────────────────────────────────────────────────────────────

export interface MenuRadioItemProps extends ComponentPropsWithRef<typeof StyledItem> {
  value: string
  disabled?: boolean
  onSelect?: () => void
}

const MenuRadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>(
  ({ children, value, disabled = false, onSelect, onClick, onKeyDown, ...rest }, ref) => {
    const ctx = useMenuContentContext()
    const radioCtx = useRadioGroupContext()
    const isChecked = radioCtx.value === value
    const indexRef = useRef(-1)

    if (indexRef.current === -1) {
      indexRef.current = ctx.registerItem(
        typeof children === 'string' ? children : '',
        disabled,
      )
    }

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      radioCtx.onValueChange(value)
      onSelect?.()
      onClick?.(e)
    }, [disabled, value, radioCtx, onSelect, onClick])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        radioCtx.onValueChange(value)
        onSelect?.()
      }
      onKeyDown?.(e)
    }, [disabled, value, radioCtx, onSelect, onKeyDown])

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
MenuRadioItem.displayName = 'Menu.RadioItem'

// ─── Group ──────────────────────────────────────────────────────────────────

export interface MenuGroupProps extends ComponentPropsWithRef<'div'> {}

const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(
  (props, ref) => <div ref={ref} role="group" {...props} />,
)
MenuGroup.displayName = 'Menu.Group'

// ─── Label ──────────────────────────────────────────────────────────────────

export interface MenuLabelProps extends ComponentPropsWithRef<typeof StyledLabel> {}

const MenuLabel = forwardRef<HTMLDivElement, MenuLabelProps>(
  (props, ref) => <StyledLabel ref={ref} {...props} />,
)
MenuLabel.displayName = 'Menu.Label'

// ─── Separator ──────────────────────────────────────────────────────────────

export interface MenuSeparatorProps extends ComponentPropsWithRef<typeof StyledSeparator> {}

const MenuSeparator = forwardRef<HTMLDivElement, MenuSeparatorProps>(
  (props, ref) => <StyledSeparator ref={ref} role="separator" aria-orientation="horizontal" {...props} />,
)
MenuSeparator.displayName = 'Menu.Separator'

// ─── Shortcut ───────────────────────────────────────────────────────────────

export interface MenuShortcutProps extends ComponentPropsWithRef<typeof StyledShortcut> {}

const MenuShortcut = forwardRef<HTMLSpanElement, MenuShortcutProps>(
  (props, ref) => <StyledShortcut ref={ref} aria-hidden="true" {...props} />,
)
MenuShortcut.displayName = 'Menu.Shortcut'

// ─── Sub ────────────────────────────────────────────────────────────────────

export interface MenuSubProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const MenuSub = forwardRef<HTMLDivElement, MenuSubProps>(
  ({ children, open, defaultOpen, onOpenChange: onOpenChangeProp }, _ref) => {
    const disclosure = useDisclosure({ open, defaultOpen, onOpenChange: onOpenChangeProp })
    const contentId = useId()
    const triggerRef = useRef<HTMLDivElement>(null)

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
      <SubMenuContext.Provider value={value}>
        {children}
      </SubMenuContext.Provider>
    )
  },
)
MenuSub.displayName = 'Menu.Sub'

// ─── SubTrigger ─────────────────────────────────────────────────────────────

export interface MenuSubTriggerProps extends ComponentPropsWithRef<typeof StyledItem> {
  disabled?: boolean
}

const MenuSubTrigger = forwardRef<HTMLDivElement, MenuSubTriggerProps>(
  ({ children, disabled = false, onKeyDown, ...rest }, ref) => {
    const ctx = useMenuContentContext()
    const subCtx = useSubMenuContext()
    const indexRef = useRef(-1)

    if (indexRef.current === -1) {
      indexRef.current = ctx.registerItem(
        typeof children === 'string' ? children : '',
        disabled,
      )
    }

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()
        subCtx.onOpenChange(true)
      }
      onKeyDown?.(e)
    }, [subCtx, onKeyDown])

    return (
      <StyledItem
        ref={mergeRefs(ref, subCtx.triggerRef)}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={subCtx.isOpen}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        tabIndex={indexRef.current === ctx.activeIndex ? 0 : -1}
        data-roving-item=""
        data-state={subCtx.isOpen ? 'open' : 'closed'}
        onMouseEnter={() => !disabled && subCtx.onOpenChange(true)}
        onMouseLeave={() => subCtx.onOpenChange(false)}
        onKeyDown={handleKeyDown}
        onFocus={() => ctx.setActiveIndex(indexRef.current)}
        {...rest}
      >
        {children}
        <StyledSubTriggerChevron>
          <ChevronRightIcon />
        </StyledSubTriggerChevron>
      </StyledItem>
    )
  },
)
MenuSubTrigger.displayName = 'Menu.SubTrigger'

// ─── SubContent ─────────────────────────────────────────────────────────────

export interface MenuSubContentProps extends ComponentPropsWithRef<typeof StyledContent> {}

const MenuSubContentInner = forwardRef<HTMLDivElement, MenuSubContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const subCtx = useSubMenuContext()
    const contentRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ top: 0, left: 0 })

    useEffect(() => {
      if (!subCtx.triggerRef.current) return
      const rect = subCtx.triggerRef.current.getBoundingClientRect()
      setPosition({ top: rect.top, left: rect.right + 2 })
    }, [subCtx.triggerRef])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape' || e.key === 'ArrowLeft') {
        e.preventDefault()
        e.stopPropagation()
        subCtx.onOpenChange(false)
        subCtx.triggerRef.current?.focus()
        return
      }
      onKeyDown?.(e)
    }, [subCtx, onKeyDown])

    return (
      <StyledContent
        ref={mergeRefs(ref, contentRef)}
        id={subCtx.contentId}
        role="menu"
        data-state="open"
        tabIndex={-1}
        style={{ top: position.top, left: position.left }}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => subCtx.onOpenChange(true)}
        onMouseLeave={() => subCtx.onOpenChange(false)}
        {...rest}
      >
        {children}
      </StyledContent>
    )
  },
)
MenuSubContentInner.displayName = 'Menu.SubContentInner'

const MenuSubContent = forwardRef<HTMLDivElement, MenuSubContentProps>(
  (props, ref) => {
    const subCtx = useSubMenuContext()
    if (!subCtx.isOpen) return null
    return <MenuSubContentInner ref={ref} {...props} />
  },
)
MenuSubContent.displayName = 'Menu.SubContent'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Menu = Object.assign(MenuRoot, {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  CheckboxItem: MenuCheckboxItem,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Group: MenuGroup,
  Label: MenuLabel,
  Separator: MenuSeparator,
  Shortcut: MenuShortcut,
  Sub: MenuSub,
  SubTrigger: MenuSubTrigger,
  SubContent: MenuSubContent,
})
