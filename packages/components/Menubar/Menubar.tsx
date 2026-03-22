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
import { useRovingTabIndex } from '../../headless/src/useRovingTabIndex'
import { useTypeahead } from '../../headless/src/useTypeahead'
import { styled } from '../../stl-react/src/config'
import { Portal } from '../../stl-react/src/primitives/Portal/Portal'
import { mergeRefs } from '../../utils/mergeRefs'

// ─── Context ────────────────────────────────────────────────────────────────

interface MenubarContextValue {
  openMenuId: string | null
  setOpenMenuId: (id: string | null) => void
  registerMenu: (id: string) => void
  unregisterMenu: (id: string) => void
  menuIds: string[]
}

const MenubarContext = createContext<MenubarContextValue | null>(null)

function useMenubarContext() {
  const ctx = useContext(MenubarContext)
  if (!ctx) throw new Error('Menubar compound components must be used within Menubar.Root')
  return ctx
}

interface MenubarMenuContextValue {
  menuId: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
  contentId: string
}

const MenubarMenuContext = createContext<MenubarMenuContextValue | null>(null)

function useMenubarMenuContext() {
  const ctx = useContext(MenubarMenuContext)
  if (!ctx) throw new Error('Menubar.Trigger/Content must be used within Menubar.Menu')
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
  if (!ctx) throw new Error('Menubar.Item must be used within Menubar.Content')
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledRoot = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$4',
  bg: '$surface1',
  radius: '$4',
  p: '$4',
  borderWidth: '$widthMin',
  borderStyle: '$styleDefault',
  borderColor: '$neutralMin',
  fontFamily: '$body',
}, { name: 'MenubarRoot' })

const StyledTrigger = styled('button', {
  display: 'flex',
  alignItems: 'center',
  px: '$8',
  py: '$4',
  radius: '$2',
  cursor: 'pointer',
  fontSize: '$small',
  fontWeight: '$500',
  fontFamily: '$body',
  bg: 'transparent',
  border: 'none',
  color: 'inherit',
  outline: 'none',
  ':interact': { bg: '$neutral4' },
  ':focus': { bg: '$neutral4' },
}, {
  name: 'MenubarTrigger',
  variants: {
    active: {
      true: { bg: '$neutral4' },
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
}, { name: 'MenubarContent' })

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
  name: 'MenubarItem',
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
}, { name: 'MenubarCheckboxIndicator' })

const StyledLabel = styled('div', {
  px: '$8',
  py: '$4',
  mx: '$4',
  fontSize: '$small',
  fontWeight: '$600',
  fontFamily: '$body',
  color: '$neutral9',
}, { name: 'MenubarLabel' })

const StyledSeparator = styled('div', {
  height: '1px',
  bg: '$neutralAlpha5',
  my: '$4',
}, { name: 'MenubarSeparator' })

const StyledShortcut = styled('span', {
  ml: 'auto',
  fontSize: '$small',
  color: '$neutral7',
  fontFamily: '$code',
}, { name: 'MenubarShortcut' })

// ─── Icons ──────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 5" />
  </svg>
)

// ─── Root ───────────────────────────────────────────────────────────────────

export interface MenubarRootProps extends ComponentPropsWithRef<typeof StyledRoot> {}

const MenubarRoot = forwardRef<HTMLDivElement, MenubarRootProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const menuIdsRef = useRef<string[]>([])

    const registerMenu = useCallback((id: string) => {
      if (!menuIdsRef.current.includes(id)) {
        menuIdsRef.current = [...menuIdsRef.current, id]
      }
    }, [])

    const unregisterMenu = useCallback((id: string) => {
      menuIdsRef.current = menuIdsRef.current.filter((m) => m !== id)
    }, [])

    const value = useMemo(() => ({
      openMenuId,
      setOpenMenuId,
      registerMenu,
      unregisterMenu,
      menuIds: menuIdsRef.current,
    }), [openMenuId, registerMenu, unregisterMenu])

    return (
      <MenubarContext.Provider value={value}>
        <StyledRoot
          ref={ref}
          role="menubar"
          onKeyDown={onKeyDown}
          {...rest}
        >
          {children}
        </StyledRoot>
      </MenubarContext.Provider>
    )
  },
)
MenubarRoot.displayName = 'Menubar.Root'

// ─── Menu ───────────────────────────────────────────────────────────────────

export interface MenubarMenuProps {
  children: React.ReactNode
}

const MenubarMenu = forwardRef<HTMLDivElement, MenubarMenuProps>(
  ({ children }, _ref) => {
    const menuId = useId()
    const contentId = useId()
    const barCtx = useMenubarContext()
    const triggerRef = useRef<HTMLButtonElement>(null)
    const isOpen = barCtx.openMenuId === menuId

    useEffect(() => {
      barCtx.registerMenu(menuId)
      return () => barCtx.unregisterMenu(menuId)
    }, [menuId, barCtx])

    const onOpenChange = useCallback((next: boolean) => {
      barCtx.setOpenMenuId(next ? menuId : null)
    }, [barCtx, menuId])

    const value = useMemo(() => ({
      menuId,
      isOpen,
      onOpenChange,
      triggerRef,
      contentId,
    }), [menuId, isOpen, onOpenChange, contentId])

    return (
      <MenubarMenuContext.Provider value={value}>
        {children}
      </MenubarMenuContext.Provider>
    )
  },
)
MenubarMenu.displayName = 'Menubar.Menu'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface MenubarTriggerProps extends ComponentPropsWithRef<typeof StyledTrigger> {}

const MenubarTrigger = forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ children, onClick, onKeyDown, ...rest }, ref) => {
    const barCtx = useMenubarContext()
    const menuCtx = useMenubarMenuContext()

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      menuCtx.onOpenChange(!menuCtx.isOpen)
      onClick?.(e)
    }, [menuCtx, onClick])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        menuCtx.onOpenChange(true)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        const idx = barCtx.menuIds.indexOf(menuCtx.menuId)
        const nextIdx = (idx + 1) % barCtx.menuIds.length
        barCtx.setOpenMenuId(barCtx.menuIds[nextIdx])
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const idx = barCtx.menuIds.indexOf(menuCtx.menuId)
        const prevIdx = (idx - 1 + barCtx.menuIds.length) % barCtx.menuIds.length
        barCtx.setOpenMenuId(barCtx.menuIds[prevIdx])
      }
      onKeyDown?.(e)
    }, [barCtx, menuCtx, onKeyDown])

    // When another menu opens, if we're open, close. If we become the open menu, focus trigger.
    const handleMouseEnter = useCallback(() => {
      if (barCtx.openMenuId !== null && barCtx.openMenuId !== menuCtx.menuId) {
        barCtx.setOpenMenuId(menuCtx.menuId)
      }
    }, [barCtx, menuCtx.menuId])

    return (
      <StyledTrigger
        ref={mergeRefs(ref, menuCtx.triggerRef)}
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={menuCtx.isOpen}
        aria-controls={menuCtx.isOpen ? menuCtx.contentId : undefined}
        data-state={menuCtx.isOpen ? 'open' : 'closed'}
        active={menuCtx.isOpen}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        {...rest}
      >
        {children}
      </StyledTrigger>
    )
  },
)
MenubarTrigger.displayName = 'Menubar.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface MenubarContentProps extends ComponentPropsWithRef<typeof StyledContent> {}

const MenubarContentInner = forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const barCtx = useMenubarContext()
    const menuCtx = useMenubarMenuContext()
    const contentRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const itemsRef = useRef<{ label: string; disabled: boolean }[]>([])
    const [itemCount, setItemCount] = useState(0)
    const indexCounterRef = useRef(0)

    // Position relative to trigger
    const [position, setPosition] = useState({ top: 0, left: 0 })

    useEffect(() => {
      if (!menuCtx.triggerRef.current) return
      const rect = menuCtx.triggerRef.current.getBoundingClientRect()
      setPosition({ top: rect.bottom + 4, left: rect.left })
    }, [menuCtx.triggerRef])

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
          menuCtx.triggerRef.current && !menuCtx.triggerRef.current.contains(target)
        ) {
          menuCtx.onOpenChange(false)
        }
      }
      document.addEventListener('mousedown', handleMouseDown)
      return () => document.removeEventListener('mousedown', handleMouseDown)
    }, [menuCtx])

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
        menuCtx.onOpenChange(false)
        menuCtx.triggerRef.current?.focus()
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        const idx = barCtx.menuIds.indexOf(menuCtx.menuId)
        const nextIdx = (idx + 1) % barCtx.menuIds.length
        barCtx.setOpenMenuId(barCtx.menuIds[nextIdx])
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const idx = barCtx.menuIds.indexOf(menuCtx.menuId)
        const prevIdx = (idx - 1 + barCtx.menuIds.length) % barCtx.menuIds.length
        barCtx.setOpenMenuId(barCtx.menuIds[prevIdx])
        return
      }
      containerProps.onKeyDown(e)
      typeaheadProps.onKeyDown(e)
      onKeyDown?.(e)
    }, [barCtx, menuCtx, containerProps, typeaheadProps, onKeyDown])

    const onClose = useCallback(() => {
      menuCtx.onOpenChange(false)
      menuCtx.triggerRef.current?.focus()
    }, [menuCtx])

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
            id={menuCtx.contentId}
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
MenubarContentInner.displayName = 'Menubar.ContentInner'

const MenubarContent = forwardRef<HTMLDivElement, MenubarContentProps>(
  (props, ref) => {
    const menuCtx = useMenubarMenuContext()
    if (!menuCtx.isOpen) return null
    return <MenubarContentInner ref={ref} {...props} />
  },
)
MenubarContent.displayName = 'Menubar.Content'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface MenubarItemProps extends ComponentPropsWithRef<typeof StyledItem> {
  disabled?: boolean
  onSelect?: () => void
}

const MenubarItem = forwardRef<HTMLDivElement, MenubarItemProps>(
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
MenubarItem.displayName = 'Menubar.Item'

// ─── CheckboxItem ───────────────────────────────────────────────────────────

export interface MenubarCheckboxItemProps extends ComponentPropsWithRef<typeof StyledItem> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
}

const MenubarCheckboxItem = forwardRef<HTMLDivElement, MenubarCheckboxItemProps>(
  ({ children, checked, onCheckedChange, disabled = false, onClick, onKeyDown, ...rest }, ref) => {
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
      onClick?.(e)
    }, [disabled, checked, onCheckedChange, onClick])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onCheckedChange(!checked)
      }
      onKeyDown?.(e)
    }, [disabled, checked, onCheckedChange, onKeyDown])

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
MenubarCheckboxItem.displayName = 'Menubar.CheckboxItem'

// ─── Group, Label, Separator, Shortcut ──────────────────────────────────────

const MenubarGroup = forwardRef<HTMLDivElement, ComponentPropsWithRef<'div'>>(
  (props, ref) => <div ref={ref} role="group" {...props} />,
)
MenubarGroup.displayName = 'Menubar.Group'

const MenubarLabel = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledLabel>>(
  (props, ref) => <StyledLabel ref={ref} {...props} />,
)
MenubarLabel.displayName = 'Menubar.Label'

const MenubarSeparator = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledSeparator>>(
  (props, ref) => <StyledSeparator ref={ref} role="separator" aria-orientation="horizontal" {...props} />,
)
MenubarSeparator.displayName = 'Menubar.Separator'

const MenubarShortcut = forwardRef<HTMLSpanElement, ComponentPropsWithRef<typeof StyledShortcut>>(
  (props, ref) => <StyledShortcut ref={ref} aria-hidden="true" {...props} />,
)
MenubarShortcut.displayName = 'Menubar.Shortcut'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Menubar = Object.assign(MenubarRoot, {
  Root: MenubarRoot,
  Menu: MenubarMenu,
  Trigger: MenubarTrigger,
  Content: MenubarContent,
  Item: MenubarItem,
  CheckboxItem: MenubarCheckboxItem,
  Group: MenubarGroup,
  Label: MenubarLabel,
  Separator: MenubarSeparator,
  Shortcut: MenubarShortcut,
})
