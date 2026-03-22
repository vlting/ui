import {
  type ComponentPropsWithRef,
  createContext,
  forwardRef,
  useContext,
} from 'react'
import { useControllableState } from '../../headless/src/useControllableState'
import { styled } from '../../stl-react/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface SidebarContextValue {
  collapsed: boolean | undefined
  setCollapsed: (v: boolean) => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

function useSidebarContext() {
  const ctx = useContext(SidebarContext)
  if (!ctx) {
    throw new Error('Sidebar compound components must be used within Sidebar.Root')
  }
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledRoot = styled('aside', {
  width: '260px',
  height: '100%',
  bg: '$surface1',
  borderRight: '$neutralMin',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: '$body',
}, {
  name: 'SidebarRoot',
  variants: {
    collapsed: {
      true: { width: '60px' },
    },
  },
})

const StyledHeader = styled('div', {
  p: '$16',
  borderBottom: '$neutralMin',
}, { name: 'SidebarHeader' })

const StyledContent = styled('div', {
  flex: '1',
  overflow: 'auto',
  p: '$8',
}, { name: 'SidebarContent' })

const StyledFooter = styled('div', {
  p: '$16',
  borderTop: '$neutralMin',
}, { name: 'SidebarFooter' })

const StyledGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
}, { name: 'SidebarGroup' })

const StyledGroupLabel = styled('div', {
  px: '$8',
  py: '$4',
  fontSize: '$small',
  fontWeight: '$500',
  color: '$neutral7',
  fontFamily: '$body',
}, { name: 'SidebarGroupLabel' })

const StyledGroupContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
}, { name: 'SidebarGroupContent' })

const StyledMenu = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
}, { name: 'SidebarMenu' })

const StyledMenuItem = styled('button', {
  px: '$8',
  py: '$6',
  radius: '$2',
  display: 'flex',
  alignItems: 'center',
  gap: '$8',
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '$p',
  fontFamily: '$body',
  color: 'inherit',
  textAlign: 'start',
  width: '100%',
  ':interact': { bg: '$neutral4' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, {
  name: 'SidebarMenuItem',
  variants: {
    active: {
      true: { bg: '$neutral4', fontWeight: '$500' },
    },
  },
})

const StyledMenuButton = styled('button', {
  px: '$8',
  py: '$6',
  radius: '$2',
  display: 'flex',
  alignItems: 'center',
  gap: '$8',
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '$p',
  fontFamily: '$body',
  color: 'inherit',
  textAlign: 'start',
  width: '100%',
  ':interact': { bg: '$neutral4' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, { name: 'SidebarMenuButton' })

const StyledSeparator = styled('hr', {
  border: 'none',
  borderTop: '$neutralMin',
  m: '$0',
  my: '$8',
}, { name: 'SidebarSeparator' })

const StyledTrigger = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '36px',
  height: '36px',
  radius: '$button',
  bg: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: 'inherit',
  ':interact': { bg: '$neutral4' },
  ':focus': { outline: '$neutral', outlineOffset: '$offsetDefault' },
}, { name: 'SidebarTrigger' })

const StyledRail = styled('div', {
  position: 'absolute',
  top: '$0',
  right: '$0',
  width: '4px',
  height: '100%',
  bg: 'transparent',
  ':interact': { bg: '$neutral4' },
  cursor: 'col-resize',
}, { name: 'SidebarRail' })

// ─── Icons ──────────────────────────────────────────────────────────────────

const PanelLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="12" height="12" rx="2" />
    <line x1="6" y1="2" x2="6" y2="14" />
  </svg>
)

// ─── Root ───────────────────────────────────────────────────────────────────

export interface SidebarRootProps extends ComponentPropsWithRef<typeof StyledRoot> {
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

const SidebarRoot = forwardRef<HTMLElement, SidebarRootProps>(
  ({ collapsed: collapsedProp, defaultCollapsed = false, onCollapsedChange, children, ...rest }, ref) => {
    const [collapsed, setCollapsed] = useControllableState({
      prop: collapsedProp,
      defaultProp: defaultCollapsed,
      onChange: onCollapsedChange,
    })

    return (
      <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
        <StyledRoot
          ref={ref}
          collapsed={collapsed || undefined}
          data-collapsed={collapsed || undefined}
          {...rest}
        >
          {children}
        </StyledRoot>
      </SidebarContext.Provider>
    )
  },
)
SidebarRoot.displayName = 'Sidebar.Root'

// ─── Header ─────────────────────────────────────────────────────────────────

export interface SidebarHeaderProps extends ComponentPropsWithRef<typeof StyledHeader> {}

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  (props, ref) => <StyledHeader ref={ref} {...props} />,
)
SidebarHeader.displayName = 'Sidebar.Header'

// ─── Content ────────────────────────────────────────────────────────────────

export interface SidebarContentProps extends ComponentPropsWithRef<typeof StyledContent> {}

const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  (props, ref) => <StyledContent ref={ref} {...props} />,
)
SidebarContent.displayName = 'Sidebar.Content'

// ─── Footer ─────────────────────────────────────────────────────────────────

export interface SidebarFooterProps extends ComponentPropsWithRef<typeof StyledFooter> {}

const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  (props, ref) => <StyledFooter ref={ref} {...props} />,
)
SidebarFooter.displayName = 'Sidebar.Footer'

// ─── Group ──────────────────────────────────────────────────────────────────

export interface SidebarGroupProps extends ComponentPropsWithRef<typeof StyledGroup> {}

const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  (props, ref) => <StyledGroup ref={ref} {...props} />,
)
SidebarGroup.displayName = 'Sidebar.Group'

// ─── GroupLabel ─────────────────────────────────────────────────────────────

export interface SidebarGroupLabelProps extends ComponentPropsWithRef<typeof StyledGroupLabel> {}

const SidebarGroupLabel = forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  (props, ref) => <StyledGroupLabel ref={ref} {...props} />,
)
SidebarGroupLabel.displayName = 'Sidebar.GroupLabel'

// ─── GroupContent ───────────────────────────────────────────────────────────

export interface SidebarGroupContentProps extends ComponentPropsWithRef<typeof StyledGroupContent> {}

const SidebarGroupContent = forwardRef<HTMLDivElement, SidebarGroupContentProps>(
  (props, ref) => <StyledGroupContent ref={ref} {...props} />,
)
SidebarGroupContent.displayName = 'Sidebar.GroupContent'

// ─── Menu ───────────────────────────────────────────────────────────────────

export interface SidebarMenuProps extends ComponentPropsWithRef<typeof StyledMenu> {}

const SidebarMenu = forwardRef<HTMLElement, SidebarMenuProps>(
  (props, ref) => <StyledMenu ref={ref} {...props} />,
)
SidebarMenu.displayName = 'Sidebar.Menu'

// ─── MenuItem ───────────────────────────────────────────────────────────────

export interface SidebarMenuItemProps extends ComponentPropsWithRef<typeof StyledMenuItem> {
  active?: boolean
}

const SidebarMenuItem = forwardRef<HTMLButtonElement, SidebarMenuItemProps>(
  ({ active, ...rest }, ref) => <StyledMenuItem ref={ref} type="button" active={active} {...rest} />,
)
SidebarMenuItem.displayName = 'Sidebar.MenuItem'

// ─── MenuButton ─────────────────────────────────────────────────────────────

export interface SidebarMenuButtonProps extends ComponentPropsWithRef<typeof StyledMenuButton> {}

const SidebarMenuButton = forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  (props, ref) => <StyledMenuButton ref={ref} type="button" {...props} />,
)
SidebarMenuButton.displayName = 'Sidebar.MenuButton'

// ─── Separator ──────────────────────────────────────────────────────────────

export interface SidebarSeparatorProps extends ComponentPropsWithRef<typeof StyledSeparator> {}

const SidebarSeparator = forwardRef<HTMLHRElement, SidebarSeparatorProps>(
  (props, ref) => <StyledSeparator ref={ref} {...props} />,
)
SidebarSeparator.displayName = 'Sidebar.Separator'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface SidebarTriggerProps extends ComponentPropsWithRef<typeof StyledTrigger> {}

const SidebarTrigger = forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ onClick, children, ...rest }, ref) => {
    const ctx = useSidebarContext()

    return (
      <StyledTrigger
        ref={ref}
        type="button"
        aria-label={ctx.collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          ctx.setCollapsed(!ctx.collapsed)
          onClick?.(e)
        }}
        {...rest}
      >
        {children ?? <PanelLeftIcon />}
      </StyledTrigger>
    )
  },
)
SidebarTrigger.displayName = 'Sidebar.Trigger'

// ─── Rail ───────────────────────────────────────────────────────────────────

export interface SidebarRailProps extends ComponentPropsWithRef<typeof StyledRail> {}

const SidebarRail = forwardRef<HTMLDivElement, SidebarRailProps>(
  (props, ref) => <StyledRail ref={ref} {...props} />,
)
SidebarRail.displayName = 'Sidebar.Rail'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Sidebar = Object.assign(SidebarRoot, {
  Root: SidebarRoot,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  GroupContent: SidebarGroupContent,
  Menu: SidebarMenu,
  MenuItem: SidebarMenuItem,
  MenuButton: SidebarMenuButton,
  Separator: SidebarSeparator,
  Trigger: SidebarTrigger,
  Rail: SidebarRail,
})
