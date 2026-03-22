import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import { styled } from '../../stl-react/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface NavMenuContextValue {
  openItem: string | null
  setOpenItem: (value: string | null) => void
}

const NavMenuContext = createContext<NavMenuContextValue | null>(null)

function useNavMenuContext() {
  const ctx = useContext(NavMenuContext)
  if (!ctx) {
    throw new Error('NavigationMenu compound components must be used within NavigationMenu.Root')
  }
  return ctx
}

interface NavItemContextValue {
  value: string
}

const NavItemContext = createContext<NavItemContextValue | null>(null)

function useNavItemContext() {
  const ctx = useContext(NavItemContext)
  if (!ctx) {
    throw new Error('NavigationMenu.Trigger/Content must be used within NavigationMenu.Item')
  }
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledRoot = styled('nav', {
  display: 'flex',
  alignItems: 'center',
  fontFamily: '$body',
}, { name: 'NavigationMenuRoot' })

const StyledList = styled('ul', {
  display: 'flex',
  gap: '$4',
  listStyle: 'none',
  m: '$0',
  p: '$0',
}, { name: 'NavigationMenuList' })

const StyledItem = styled('li', {
  position: 'relative',
}, { name: 'NavigationMenuItem' })

const StyledTrigger = styled('button', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  px: '$12',
  py: '$8',
  radius: '$button',
  fontWeight: '$500',
  fontSize: '$p',
  fontFamily: '$body',
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: 'inherit',
  ':interact': { bg: '$neutral3' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, { name: 'NavigationMenuTrigger' })

const ChevronIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 6l4 4 4-4" />
  </svg>
)

const StyledContent = styled('div', {
  position: 'absolute',
  top: '100%',
  left: '$0',
  bg: '$surface1',
  radius: '$4',
  boxShadow: '$md',
  border: '$neutralMin',
  p: '$16',
  minWidth: '220px',
  zIndex: '$10',
}, { name: 'NavigationMenuContent' })

const StyledLink = styled('a', {
  display: 'block',
  px: '$12',
  py: '$8',
  radius: '$2',
  textDecoration: 'none',
  color: 'inherit',
  fontSize: '$p',
  fontFamily: '$body',
  ':interact': { bg: '$neutral4' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, { name: 'NavigationMenuLink' })

const StyledIndicator = styled('div', {}, { name: 'NavigationMenuIndicator' })

const StyledViewport = styled('div', {}, { name: 'NavigationMenuViewport' })

// ─── Root ───────────────────────────────────────────────────────────────────

export interface NavigationMenuRootProps
  extends ComponentPropsWithRef<typeof StyledRoot> {}

const NavigationMenuRoot = forwardRef<HTMLElement, NavigationMenuRootProps>(
  ({ children, ...rest }, ref) => {
    const [openItem, setOpenItem] = useState<string | null>(null)

    return (
      <NavMenuContext.Provider value={{ openItem, setOpenItem }}>
        <StyledRoot ref={ref} {...rest}>
          {children}
        </StyledRoot>
      </NavMenuContext.Provider>
    )
  },
)
NavigationMenuRoot.displayName = 'NavigationMenu.Root'

// ─── List ───────────────────────────────────────────────────────────────────

export interface NavigationMenuListProps
  extends ComponentPropsWithRef<typeof StyledList> {}

const NavigationMenuList = forwardRef<HTMLUListElement, NavigationMenuListProps>(
  (props, ref) => <StyledList ref={ref} role="menubar" {...props} />,
)
NavigationMenuList.displayName = 'NavigationMenu.List'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface NavigationMenuItemProps
  extends ComponentPropsWithRef<typeof StyledItem> {
  value?: string
}

let itemCounter = 0

const NavigationMenuItem = forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ value, children, ...rest }, ref) => {
    const itemRef = useRef(value ?? `nav-item-${++itemCounter}`)
    const ctx = useNavMenuContext()
    const closeTimeout = useRef<ReturnType<typeof setTimeout>>()

    const handleMouseEnter = useCallback(() => {
      clearTimeout(closeTimeout.current)
      ctx.setOpenItem(itemRef.current)
    }, [ctx])

    const handleMouseLeave = useCallback(() => {
      closeTimeout.current = setTimeout(() => {
        ctx.setOpenItem(null)
      }, 150)
    }, [ctx])

    return (
      <NavItemContext.Provider value={{ value: itemRef.current }}>
        <StyledItem
          ref={ref}
          role="none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...rest}
        >
          {children}
        </StyledItem>
      </NavItemContext.Provider>
    )
  },
)
NavigationMenuItem.displayName = 'NavigationMenu.Item'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface NavigationMenuTriggerProps
  extends ComponentPropsWithRef<typeof StyledTrigger> {}

const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ children, onClick, ...rest }, ref) => {
    const ctx = useNavMenuContext()
    const item = useNavItemContext()
    const isOpen = ctx.openItem === item.value

    return (
      <StyledTrigger
        ref={ref}
        type="button"
        role="menuitem"
        aria-expanded={isOpen}
        aria-haspopup="true"
        data-state={isOpen ? 'open' : 'closed'}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          ctx.setOpenItem(isOpen ? null : item.value)
          onClick?.(e)
        }}
        {...rest}
      >
        {children}
        <ChevronIcon />
      </StyledTrigger>
    )
  },
)
NavigationMenuTrigger.displayName = 'NavigationMenu.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface NavigationMenuContentProps
  extends ComponentPropsWithRef<typeof StyledContent> {}

const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ children, ...rest }, ref) => {
    const ctx = useNavMenuContext()
    const item = useNavItemContext()

    if (ctx.openItem !== item.value) return null

    return (
      <StyledContent ref={ref} data-state="open" {...rest}>
        {children}
      </StyledContent>
    )
  },
)
NavigationMenuContent.displayName = 'NavigationMenu.Content'

// ─── Link ───────────────────────────────────────────────────────────────────

export interface NavigationMenuLinkProps
  extends ComponentPropsWithRef<typeof StyledLink> {}

const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  (props, ref) => <StyledLink ref={ref} role="menuitem" {...props} />,
)
NavigationMenuLink.displayName = 'NavigationMenu.Link'

// ─── Indicator ──────────────────────────────────────────────────────────────

const NavigationMenuIndicator = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledIndicator>>(
  (props, ref) => <StyledIndicator ref={ref} {...props} />,
)
NavigationMenuIndicator.displayName = 'NavigationMenu.Indicator'

// ─── Viewport ───────────────────────────────────────────────────────────────

const NavigationMenuViewport = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledViewport>>(
  (props, ref) => <StyledViewport ref={ref} {...props} />,
)
NavigationMenuViewport.displayName = 'NavigationMenu.Viewport'

// ─── Export ─────────────────────────────────────────────────────────────────

export const NavigationMenu = Object.assign(NavigationMenuRoot, {
  Root: NavigationMenuRoot,
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Trigger: NavigationMenuTrigger,
  Content: NavigationMenuContent,
  Link: NavigationMenuLink,
  Indicator: NavigationMenuIndicator,
  Viewport: NavigationMenuViewport,
})
