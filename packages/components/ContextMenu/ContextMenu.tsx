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

interface ContextMenuContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  position: { x: number; y: number }
  setPosition: (pos: { x: number; y: number }) => void
  contentId: string
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

function useContextMenuContext() {
  const ctx = useContext(ContextMenuContext)
  if (!ctx) throw new Error('ContextMenu compound components must be used within ContextMenu.Root')
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
  if (!ctx) throw new Error('ContextMenu.Item must be used within ContextMenu.Content')
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledOverlay = styled('div', {
  position: 'fixed',
  inset: '0',
  zIndex: '49',
}, { name: 'ContextMenuOverlay' })

const StyledContent = styled('div', {
  bg: '$surface1',
  radius: '$card',
  boxShadow: '$md',
  py: '$4',
  minWidth: '220px',
  zIndex: '$max',
  position: 'fixed',
  border: '$neutralMin',
  outline: 'none',
  color: '$neutralText3',
}, { name: 'ContextMenuContent' })

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
  name: 'ContextMenuItem',
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
}, { name: 'ContextMenuCheckboxIndicator' })

const StyledLabel = styled('div', {
  px: '$8',
  py: '$4',
  mx: '$4',
  fontSize: '$small',
  fontWeight: '$600',
  fontFamily: '$body',
  color: '$neutralText4',
}, { name: 'ContextMenuLabel' })

const StyledSeparator = styled('div', {
  height: '1px',
  bg: '$neutralAlpha5',
  my: '$4',
}, { name: 'ContextMenuSeparator' })

const StyledShortcut = styled('span', {
  ml: 'auto',
  fontSize: '$small',
  color: '$neutralText4',
  fontFamily: '$code',
}, { name: 'ContextMenuShortcut' })

// ─── Icons ──────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 5" />
  </svg>
)

// ─── Root ───────────────────────────────────────────────────────────────────

export interface ContextMenuRootProps {
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

const ContextMenuRoot = forwardRef<HTMLDivElement, ContextMenuRootProps>(
  ({ children, onOpenChange: onOpenChangeProp }, _ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const contentId = useId()

    const onOpenChange = useCallback((next: boolean) => {
      setIsOpen(next)
      onOpenChangeProp?.(next)
    }, [onOpenChangeProp])

    const value = useMemo(() => ({
      isOpen,
      onOpenChange,
      position,
      setPosition,
      contentId,
    }), [isOpen, onOpenChange, position, contentId])

    return (
      <ContextMenuContext.Provider value={value}>
        {children}
      </ContextMenuContext.Provider>
    )
  },
)
ContextMenuRoot.displayName = 'ContextMenu.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface ContextMenuTriggerProps extends ComponentPropsWithRef<'span'> {}

const ContextMenuTrigger = forwardRef<HTMLSpanElement, ContextMenuTriggerProps>(
  ({ children, ...rest }, ref) => {
    const ctx = useContextMenuContext()

    const handleContextMenu = useCallback((e: React.MouseEvent) => {
      e.preventDefault()
      ctx.setPosition({ x: e.clientX, y: e.clientY })
      ctx.onOpenChange(true)
    }, [ctx])

    return (
      <span
        ref={ref}
        onContextMenu={handleContextMenu}
        aria-haspopup="menu"
        {...rest}
      >
        {children}
      </span>
    )
  },
)
ContextMenuTrigger.displayName = 'ContextMenu.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface ContextMenuContentProps extends ComponentPropsWithRef<typeof StyledContent> {}

const ContextMenuContentInner = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const { onOpenChange, position, contentId } = useContextMenuContext()
    const contentRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const itemsRef = useRef<{ label: string; disabled: boolean }[]>([])
    const [itemCount, setItemCount] = useState(0)
    const indexCounterRef = useRef(0)

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
        return
      }
      containerProps.onKeyDown(e)
      typeaheadProps.onKeyDown(e)
      onKeyDown?.(e)
    }, [onOpenChange, containerProps, typeaheadProps, onKeyDown])

    const onClose = useCallback(() => {
      onOpenChange(false)
    }, [onOpenChange])

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
        <StyledOverlay onClick={() => onOpenChange(false)} />
        <ContentContext.Provider value={contentCtxValue}>
          <StyledContent
            ref={mergeRefs(ref, contentRef, containerProps.ref)}
            id={contentId}
            role="menu"
            data-state="open"
            tabIndex={-1}
            style={{ top: position.y, left: position.x }}
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
ContextMenuContentInner.displayName = 'ContextMenu.ContentInner'

const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  (props, ref) => {
    const { isOpen } = useContextMenuContext()
    if (!isOpen) return null
    return <ContextMenuContentInner ref={ref} {...props} />
  },
)
ContextMenuContent.displayName = 'ContextMenu.Content'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface ContextMenuItemProps extends ComponentPropsWithRef<typeof StyledItem> {
  disabled?: boolean
  onSelect?: () => void
}

const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
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
ContextMenuItem.displayName = 'ContextMenu.Item'

// ─── CheckboxItem ───────────────────────────────────────────────────────────

export interface ContextMenuCheckboxItemProps extends ComponentPropsWithRef<typeof StyledItem> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  onSelect?: () => void
}

const ContextMenuCheckboxItem = forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
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
ContextMenuCheckboxItem.displayName = 'ContextMenu.CheckboxItem'

// ─── Group, Label, Separator, Shortcut ──────────────────────────────────────

const ContextMenuGroup = forwardRef<HTMLDivElement, ComponentPropsWithRef<'div'>>(
  (props, ref) => <div ref={ref} role="group" {...props} />,
)
ContextMenuGroup.displayName = 'ContextMenu.Group'

const ContextMenuLabel = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledLabel>>(
  (props, ref) => <StyledLabel ref={ref} {...props} />,
)
ContextMenuLabel.displayName = 'ContextMenu.Label'

const ContextMenuSeparator = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledSeparator>>(
  (props, ref) => <StyledSeparator ref={ref} role="separator" aria-orientation="horizontal" {...props} />,
)
ContextMenuSeparator.displayName = 'ContextMenu.Separator'

const ContextMenuShortcut = forwardRef<HTMLSpanElement, ComponentPropsWithRef<typeof StyledShortcut>>(
  (props, ref) => <StyledShortcut ref={ref} aria-hidden="true" {...props} />,
)
ContextMenuShortcut.displayName = 'ContextMenu.Shortcut'

// ─── Export ─────────────────────────────────────────────────────────────────

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Root: ContextMenuRoot,
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  Group: ContextMenuGroup,
  Label: ContextMenuLabel,
  Separator: ContextMenuSeparator,
  Shortcut: ContextMenuShortcut,
})
