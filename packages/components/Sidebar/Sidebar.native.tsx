import {
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import {
  Animated,
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  Text as RNText,
  View,
} from 'react-native'
import type { ViewStyle } from 'react-native'
import { useControllableState } from '../../headless/src/useControllableState'
import { styled } from '../../stl-native/src/config/styled'

// ─── Context ────────────────────────────────────────────────────────────────

interface SidebarContextValue {
  collapsed: boolean | undefined
  setCollapsed: (v: boolean) => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

function useSidebarContext() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('Sidebar compound components must be used within Sidebar.Root')
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledHeader = styled(View, {
  padding: '$16',
  borderBottomWidth: 1,
  borderBottomColor: '$neutral4',
}, {}, 'SidebarHeader')

const StyledContent = styled(RNScrollView, {
  flex: 1,
  padding: '$8',
}, {}, 'SidebarContent')

const StyledFooter = styled(View, {
  padding: '$16',
  borderTopWidth: 1,
  borderTopColor: '$neutral4',
}, {}, 'SidebarFooter')

const StyledGroup = styled(View, {
  flexDirection: 'column',
}, {}, 'SidebarGroup')

const StyledGroupLabel = styled(RNText, {
  paddingHorizontal: '$8',
  paddingVertical: '$4',
  fontSize: '$14',
  fontWeight: '500',
  color: '$neutral9',
}, {}, 'SidebarGroupLabel')

const StyledGroupContent = styled(View, {
  flexDirection: 'column',
  gap: '$2',
}, {}, 'SidebarGroupContent')

const StyledMenu = styled(View, {
  flexDirection: 'column',
  gap: '$2',
}, {}, 'SidebarMenu')

const StyledMenuItem = styled(RNPressable, {
  paddingHorizontal: '$8',
  paddingVertical: '$6',
  borderRadius: '$2',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$8',
  hovered: { backgroundColor: '$neutral4' },
  pressed: { backgroundColor: '$neutral4' },
}, {
  active: {
    true: { backgroundColor: '$neutral4' },
  },
}, 'SidebarMenuItem')

const StyledMenuItemText = styled(RNText, {
  fontSize: '$p',
  color: '$defaultBody',
}, {
  active: {
    true: { fontWeight: '500' },
  },
}, 'SidebarMenuItemText')

const StyledMenuButton = styled(RNPressable, {
  paddingHorizontal: '$8',
  paddingVertical: '$6',
  borderRadius: '$2',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$8',
  hovered: { backgroundColor: '$neutral4' },
  pressed: { backgroundColor: '$neutral4' },
}, {}, 'SidebarMenuButton')

const StyledSeparator = styled(View, {
  height: 1,
  backgroundColor: '$neutral4',
  marginVertical: '$8',
}, {}, 'SidebarSeparator')

const StyledTrigger = styled(RNPressable, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  borderRadius: '$button',
  hovered: { backgroundColor: '$neutral4' },
  pressed: { backgroundColor: '$neutral4' },
}, {}, 'SidebarTrigger')

const StyledRail = styled(View, {
  position: 'absolute',
  top: 0,
  width: 4,
  height: '100%',
  backgroundColor: 'transparent',
}, {
  side: {
    left: { right: 0 },
    right: { left: 0 },
  },
}, 'SidebarRail')

// ─── Constants ──────────────────────────────────────────────────────────────

const EXPANDED_WIDTH = 260
const COLLAPSED_WIDTH = 60
const ANIMATION_DURATION = 200

// ─── Root ───────────────────────────────────────────────────────────────────

export interface SidebarRootProps {
  children: ReactNode
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  side?: 'left' | 'right'
  style?: ViewStyle
}

const SidebarRoot = forwardRef<View, SidebarRootProps>(
  ({ collapsed: collapsedProp, defaultCollapsed = false, onCollapsedChange, side = 'left', children, style, ...rest }, ref) => {
    const [collapsed, setCollapsed] = useControllableState({
      prop: collapsedProp,
      defaultProp: defaultCollapsed,
      onChange: onCollapsedChange,
    })

    const widthAnim = useRef(new Animated.Value(collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH)).current

    useEffect(() => {
      Animated.timing(widthAnim, {
        toValue: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start()
    }, [collapsed, widthAnim])

    const ctxValue = useMemo(
      () => ({ collapsed, setCollapsed }),
      [collapsed, setCollapsed],
    )

    return (
      <SidebarContext.Provider value={ctxValue}>
        <Animated.View
          ref={ref}
          style={[
            {
              width: widthAnim,
              height: '100%',
              backgroundColor: '$surface1',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRightWidth: side === 'left' ? 1 : 0,
              borderLeftWidth: side === 'right' ? 1 : 0,
              borderColor: '$neutral4',
            },
            style,
          ]}
          accessibilityRole="none"
          {...rest}
        >
          {children}
        </Animated.View>
      </SidebarContext.Provider>
    )
  },
)
SidebarRoot.displayName = 'Sidebar.Root'

// ─── Header ─────────────────────────────────────────────────────────────────

export interface SidebarHeaderProps {
  children: ReactNode
  style?: ViewStyle
}

const SidebarHeader = forwardRef<View, SidebarHeaderProps>(
  (props, ref) => <StyledHeader ref={ref} {...props} />,
)
SidebarHeader.displayName = 'Sidebar.Header'

// ─── Content ────────────────────────────────────────────────────────────────

export interface SidebarContentProps {
  children: ReactNode
  style?: ViewStyle
}

const SidebarContent = forwardRef<RNScrollView, SidebarContentProps>(
  (props, ref) => <StyledContent ref={ref} {...props} />,
)
SidebarContent.displayName = 'Sidebar.Content'

// ─── Footer ─────────────────────────────────────────────────────────────────

export interface SidebarFooterProps {
  children: ReactNode
  style?: ViewStyle
}

const SidebarFooter = forwardRef<View, SidebarFooterProps>(
  (props, ref) => <StyledFooter ref={ref} {...props} />,
)
SidebarFooter.displayName = 'Sidebar.Footer'

// ─── Group ──────────────────────────────────────────────────────────────────

export interface SidebarGroupProps {
  children: ReactNode
  style?: ViewStyle
}

const SidebarGroup = forwardRef<View, SidebarGroupProps>(
  (props, ref) => <StyledGroup ref={ref} {...props} />,
)
SidebarGroup.displayName = 'Sidebar.Group'

// ─── GroupLabel ─────────────────────────────────────────────────────────────

export interface SidebarGroupLabelProps {
  children: ReactNode
  style?: ViewStyle
}

const SidebarGroupLabel = forwardRef<RNText, SidebarGroupLabelProps>(
  (props, ref) => <StyledGroupLabel ref={ref} {...props} />,
)
SidebarGroupLabel.displayName = 'Sidebar.GroupLabel'

// ─── GroupContent ───────────────────────────────────────────────────────────

export interface SidebarGroupContentProps {
  children: ReactNode
  style?: ViewStyle
}

const SidebarGroupContent = forwardRef<View, SidebarGroupContentProps>(
  (props, ref) => <StyledGroupContent ref={ref} {...props} />,
)
SidebarGroupContent.displayName = 'Sidebar.GroupContent'

// ─── Menu ───────────────────────────────────────────────────────────────────

export interface SidebarMenuProps {
  children: ReactNode
  style?: ViewStyle
}

const SidebarMenu = forwardRef<View, SidebarMenuProps>(
  (props, ref) => <StyledMenu ref={ref} accessibilityRole="menu" {...props} />,
)
SidebarMenu.displayName = 'Sidebar.Menu'

// ─── MenuItem ───────────────────────────────────────────────────────────────

export interface SidebarMenuItemProps {
  children: ReactNode
  active?: boolean
  onPress?: () => void
  style?: ViewStyle
}

const SidebarMenuItem = forwardRef<View, SidebarMenuItemProps>(
  ({ active, children, ...rest }, ref) => (
    <StyledMenuItem ref={ref} active={active || undefined} accessibilityRole="menuitem" {...rest}>
      {typeof children === 'string' ? (
        <StyledMenuItemText active={active || undefined}>{children}</StyledMenuItemText>
      ) : (
        children
      )}
    </StyledMenuItem>
  ),
)
SidebarMenuItem.displayName = 'Sidebar.MenuItem'

// ─── MenuButton ─────────────────────────────────────────────────────────────

export interface SidebarMenuButtonProps {
  children: ReactNode
  onPress?: () => void
  style?: ViewStyle
}

const SidebarMenuButton = forwardRef<View, SidebarMenuButtonProps>(
  (props, ref) => <StyledMenuButton ref={ref} accessibilityRole="button" {...props} />,
)
SidebarMenuButton.displayName = 'Sidebar.MenuButton'

// ─── Separator ──────────────────────────────────────────────────────────────

export interface SidebarSeparatorProps {
  style?: ViewStyle
}

const SidebarSeparator = forwardRef<View, SidebarSeparatorProps>(
  (props, ref) => <StyledSeparator ref={ref} accessibilityRole="none" {...props} />,
)
SidebarSeparator.displayName = 'Sidebar.Separator'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface SidebarTriggerProps {
  children?: ReactNode
  onPress?: () => void
  style?: ViewStyle
}

const SidebarTrigger = forwardRef<View, SidebarTriggerProps>(
  ({ onPress, children, ...rest }, ref) => {
    const ctx = useSidebarContext()

    return (
      <StyledTrigger
        ref={ref}
        accessibilityRole="button"
        accessibilityLabel={ctx.collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onPress={() => {
          ctx.setCollapsed(!ctx.collapsed)
          onPress?.()
        }}
        {...rest}
      >
        {children ?? <RNText style={{ fontSize: 16 }}>☰</RNText>}
      </StyledTrigger>
    )
  },
)
SidebarTrigger.displayName = 'Sidebar.Trigger'

// ─── Rail ───────────────────────────────────────────────────────────────────

export interface SidebarRailProps {
  side?: 'left' | 'right'
  style?: ViewStyle
}

const SidebarRail = forwardRef<View, SidebarRailProps>(
  ({ side = 'left', ...rest }, ref) => <StyledRail ref={ref} side={side} {...rest} />,
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
