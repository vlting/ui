import {
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  Pressable,
  Text as RNText,
  View,
} from 'react-native'
import type { ViewStyle } from 'react-native'
import { useControllableState } from '../../headless/src/useControllableState'
import { styled } from '../../stl-native/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface NavMenuContextValue {
  openItem: string | null | undefined
  setOpenItem: (value: string | null) => void
}

const NavMenuContext = createContext<NavMenuContextValue | null>(null)

function useNavMenuContext() {
  const ctx = useContext(NavMenuContext)
  if (!ctx) throw new Error('NavigationMenu compounds must be used within NavigationMenu.Root')
  return ctx
}

interface NavItemContextValue {
  value: string
}

const NavItemContext = createContext<NavItemContextValue | null>(null)

function useNavItemContext() {
  const ctx = useContext(NavItemContext)
  if (!ctx) throw new Error('NavigationMenu.Trigger/Content must be used within NavigationMenu.Item')
  return ctx
}

// ─── Styled Elements ────────────────────────────────────────────────────────

const StyledRoot = styled(View, {
  gap: 0,
}, 'NavigationMenuRoot')

const StyledList = styled(View, {
  gap: 0,
}, 'NavigationMenuList')

const StyledItem = styled(View, {
  borderBottomWidth: 1,
  borderBottomColor: '$neutral4',
}, 'NavigationMenuItem')

const StyledTrigger = styled(Pressable, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 12,
  paddingHorizontal: 4,
}, 'NavigationMenuTrigger')

const StyledTriggerText = styled(RNText, {
  fontWeight: '500',
  fontSize: 15,
  color: '$neutralText3',
}, 'NavigationMenuTriggerText')

const StyledLink = styled(Pressable, {
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 12,
  pressed: { backgroundColor: '$neutral2' },
}, 'NavigationMenuLink')

const StyledLinkTitle = styled(RNText, {
  fontWeight: '500',
  fontSize: 15,
  color: '$neutralText3',
}, 'NavigationMenuLinkTitle')

const StyledLinkDescription = styled(RNText, {
  fontSize: 14,
  color: '$neutral8',
  marginTop: 2,
}, 'NavigationMenuLinkDescription')

// ─── Root ───────────────────────────────────────────────────────────────────

export interface NavigationMenuRootProps {
  children: ReactNode
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  style?: ViewStyle
}

const NavigationMenuRoot = forwardRef<View, NavigationMenuRootProps>(
  ({ value, defaultValue, onValueChange, children, ...rest }, ref) => {
    const [openItem, setOpenItem] = useControllableState<string | null>({
      prop: value,
      defaultProp: defaultValue ?? null,
      onChange: onValueChange,
    })

    const ctx = useMemo(
      () => ({ openItem, setOpenItem }),
      [openItem, setOpenItem],
    )

    return (
      <NavMenuContext.Provider value={ctx}>
        <StyledRoot ref={ref} accessibilityRole="menu" {...rest}>
          {children}
        </StyledRoot>
      </NavMenuContext.Provider>
    )
  },
)
NavigationMenuRoot.displayName = 'NavigationMenu.Root'

// ─── List ───────────────────────────────────────────────────────────────────

export interface NavigationMenuListProps {
  children: ReactNode
  style?: ViewStyle
}

const NavigationMenuList = forwardRef<View, NavigationMenuListProps>(
  (props, ref) => <StyledList ref={ref} {...props} />,
)
NavigationMenuList.displayName = 'NavigationMenu.List'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface NavigationMenuItemProps {
  children: ReactNode
  value?: string
  style?: ViewStyle
}

let itemCounter = 0

const NavigationMenuItem = forwardRef<View, NavigationMenuItemProps>(
  ({ value, children, ...rest }, ref) => {
    const itemRef = useRef(value ?? `nav-item-${++itemCounter}`)

    const ctx = useMemo(
      () => ({ value: itemRef.current }),
      [],
    )

    return (
      <NavItemContext.Provider value={ctx}>
        <StyledItem ref={ref} {...rest}>
          {children}
        </StyledItem>
      </NavItemContext.Provider>
    )
  },
)
NavigationMenuItem.displayName = 'NavigationMenu.Item'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface NavigationMenuTriggerProps {
  children: ReactNode
  style?: ViewStyle
}

const NavigationMenuTrigger = forwardRef<View, NavigationMenuTriggerProps>(
  ({ children, ...rest }, ref) => {
    const ctx = useNavMenuContext()
    const item = useNavItemContext()
    const isOpen = ctx.openItem === item.value
    const rotation = useRef(new Animated.Value(isOpen ? 1 : 0)).current

    useEffect(() => {
      Animated.timing(rotation, {
        toValue: isOpen ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }, [isOpen, rotation])

    const rotate = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    })

    const handlePress = useCallback(() => {
      ctx.setOpenItem(isOpen ? null : item.value)
    }, [ctx, isOpen, item.value])

    return (
      <StyledTrigger
        ref={ref}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        {...rest}
      >
        {typeof children === 'string' ? (
          <StyledTriggerText>{children}</StyledTriggerText>
        ) : (
          <View style={{ flex: 1 }}>{children}</View>
        )}
        <Animated.View style={{ transform: [{ rotate }] }}>
          <RNText style={{ fontSize: 14, color: '$neutral7' }}>▼</RNText>
        </Animated.View>
      </StyledTrigger>
    )
  },
)
NavigationMenuTrigger.displayName = 'NavigationMenu.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface NavigationMenuContentProps {
  children: ReactNode
  style?: ViewStyle
}

const NavigationMenuContent = forwardRef<View, NavigationMenuContentProps>(
  ({ children, style, ...rest }, ref) => {
    const ctx = useNavMenuContext()
    const item = useNavItemContext()
    const isOpen = ctx.openItem === item.value
    const heightAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current
    const [measured, setMeasured] = useState(false)
    const contentHeight = useRef(0)

    useEffect(() => {
      Animated.timing(heightAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }, [isOpen, heightAnim])

    const animatedHeight = heightAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, contentHeight.current || 500],
    })

    return (
      <Animated.View
        ref={ref}
        style={[
          { overflow: 'hidden' as const },
          measured ? { height: animatedHeight } : { position: 'absolute' as const, opacity: 0 },
        ]}
        {...rest}
      >
        <View
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height
            if (h > 0 && !measured) {
              contentHeight.current = h
              setMeasured(true)
              heightAnim.setValue(isOpen ? 1 : 0)
            }
          }}
          style={[{ paddingTop: 4, paddingBottom: 16 }, style]}
        >
          {children}
        </View>
      </Animated.View>
    )
  },
)
NavigationMenuContent.displayName = 'NavigationMenu.Content'

// ─── Link ───────────────────────────────────────────────────────────────────

export interface NavigationMenuLinkProps {
  children: ReactNode
  onPress?: () => void
  style?: ViewStyle
}

const NavigationMenuLink = forwardRef<View, NavigationMenuLinkProps>(
  ({ onPress, children, ...rest }, ref) => {
    const ctx = useNavMenuContext()

    const handlePress = useCallback(() => {
      ctx.setOpenItem(null)
      onPress?.()
    }, [ctx, onPress])

    return (
      <StyledLink
        ref={ref}
        onPress={handlePress}
        accessibilityRole="link"
        {...rest}
      >
        {children}
      </StyledLink>
    )
  },
)
NavigationMenuLink.displayName = 'NavigationMenu.Link'

// ─── LinkTitle ──────────────────────────────────────────────────────────────

export interface NavigationMenuLinkTitleProps {
  children: ReactNode
  style?: ViewStyle
}

const NavigationMenuLinkTitle = forwardRef<View, NavigationMenuLinkTitleProps>(
  ({ children, ...rest }, ref) => (
    <StyledLinkTitle ref={ref} {...rest}>{children}</StyledLinkTitle>
  ),
)
NavigationMenuLinkTitle.displayName = 'NavigationMenu.LinkTitle'

// ─── LinkDescription ────────────────────────────────────────────────────────

export interface NavigationMenuLinkDescriptionProps {
  children: ReactNode
  style?: ViewStyle
}

const NavigationMenuLinkDescription = forwardRef<View, NavigationMenuLinkDescriptionProps>(
  ({ children, ...rest }, ref) => (
    <StyledLinkDescription ref={ref} {...rest}>{children}</StyledLinkDescription>
  ),
)
NavigationMenuLinkDescription.displayName = 'NavigationMenu.LinkDescription'

// ─── Web-only stubs ─────────────────────────────────────────────────────────

const NavigationMenuIndicator = forwardRef<View>((_props, _ref) => {
  if (__DEV__) console.warn('NavigationMenu.Indicator is web-only on React Native')
  return null
})
NavigationMenuIndicator.displayName = 'NavigationMenu.Indicator'

const NavigationMenuViewport = forwardRef<View>((_props, _ref) => {
  if (__DEV__) console.warn('NavigationMenu.Viewport is web-only on React Native')
  return null
})
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
