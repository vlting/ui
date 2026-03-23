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

type NavMenuSize = 'sm' | 'md' | 'lg'

interface NavMenuContextValue {
  openItem: string | null
  setOpenItem: (value: string | null) => void
  closeTimeout: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>
  size: NavMenuSize
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
  radius: '$button',
  fontWeight: '$500',
  fontFamily: '$body',
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: 'inherit',
  ':interact': { bg: '$neutral3' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, {
  name: 'NavigationMenuTrigger',
  variants: {
    size: {
      sm: { px: '$8', py: '$4', fontSize: '$small' },
      md: { px: '$12', py: '$8', fontSize: '$p' },
      lg: { px: '$16', py: '$12', fontSize: '$p' },
    },
  },
})

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
  radius: '$card',
  boxShadow: '$md',
  border: '$neutralMin',
  minWidth: '320px',
  zIndex: '$max',
  color: '$neutralText3',
}, {
  name: 'NavigationMenuContent',
  variants: {
    size: {
      sm: { p: '$4', mt: '$2' },
      md: { p: '$8', mt: '$4' },
      lg: { p: '$12', mt: '$4' },
    },
  },
})

const StyledLink = styled('a', {
  display: 'block',
  radius: '$2',
  textDecoration: 'none',
  color: 'inherit',
  fontFamily: '$body',
  ':interact': { bg: '$neutral4' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, {
  name: 'NavigationMenuLink',
  variants: {
    size: {
      sm: { px: '$8', py: '$4', fontSize: '$small' },
      md: { px: '$12', py: '$8', fontSize: '$p' },
      lg: { px: '$16', py: '$12', fontSize: '$p' },
    },
  },
})

const StyledLinkTitle = styled('div', {
  fontWeight: '$500',
  fontSize: '$p',
}, { name: 'NavigationMenuLinkTitle' })

const StyledLinkDescription = styled('div', {
  fontSize: '$small',
  color: '$neutral9',
  mt: '$2',
}, { name: 'NavigationMenuLinkDescription' })

const StyledIndicator = styled('div', {}, { name: 'NavigationMenuIndicator' })

const StyledViewport = styled('div', {}, { name: 'NavigationMenuViewport' })

// ─── Root ───────────────────────────────────────────────────────────────────

export interface NavigationMenuRootProps
  extends ComponentPropsWithRef<typeof StyledRoot> {
  size?: NavMenuSize
}

const NavigationMenuRoot = forwardRef<HTMLElement, NavigationMenuRootProps>(
  ({ size = 'md', children, ...rest }, ref) => {
    const [openItem, setOpenItem] = useState<string | null>(null)
    const closeTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)

    return (
      <NavMenuContext.Provider value={{ openItem, setOpenItem, closeTimeout, size }}>
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

    const handleMouseEnter = useCallback(() => {
      clearTimeout(ctx.closeTimeout.current)
      ctx.setOpenItem(itemRef.current)
    }, [ctx])

    const handleMouseLeave = useCallback(() => {
      ctx.closeTimeout.current = setTimeout(() => {
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
        size={ctx.size}
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
      <StyledContent ref={ref} data-state="open" size={ctx.size} {...rest}>
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
  (props, ref) => {
    const ctx = useNavMenuContext()
    return <StyledLink ref={ref} role="menuitem" size={ctx.size} {...props} />
  },
)
NavigationMenuLink.displayName = 'NavigationMenu.Link'

// ─── LinkTitle ──────────────────────────────────────────────────────────────

const NavigationMenuLinkTitle = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledLinkTitle>>(
  (props, ref) => <StyledLinkTitle ref={ref} {...props} />,
)
NavigationMenuLinkTitle.displayName = 'NavigationMenu.LinkTitle'

// ─── LinkDescription ────────────────────────────────────────────────────────

const NavigationMenuLinkDescription = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof StyledLinkDescription>>(
  (props, ref) => <StyledLinkDescription ref={ref} {...props} />,
)
NavigationMenuLinkDescription.displayName = 'NavigationMenu.LinkDescription'

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
  LinkTitle: NavigationMenuLinkTitle,
  LinkDescription: NavigationMenuLinkDescription,
  Indicator: NavigationMenuIndicator,
  Viewport: NavigationMenuViewport,
})
