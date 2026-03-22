import {
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
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
import { useDisclosure } from '../../headless/src/useDisclosure'

// ─── Context ────────────────────────────────────────────────────────────────

interface CollapsibleContextValue {
  isOpen: boolean
  toggle: () => void
  disabled: boolean
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null)

function useCollapsibleContext() {
  const ctx = useContext(CollapsibleContext)
  if (!ctx) throw new Error('Collapsible compounds must be used within Collapsible.Root')
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface CollapsibleRootProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  style?: ViewStyle
}

const CollapsibleRoot = forwardRef<View, CollapsibleRootProps>(
  ({ open, defaultOpen, onOpenChange, disabled = false, children, ...rest }, ref) => {
    const { isOpen, onToggle } = useDisclosure({ open, defaultOpen, onOpenChange })

    return (
      <CollapsibleContext.Provider value={{ isOpen, toggle: onToggle, disabled }}>
        <View ref={ref} {...rest}>
          {children}
        </View>
      </CollapsibleContext.Provider>
    )
  },
)
CollapsibleRoot.displayName = 'Collapsible.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface CollapsibleTriggerProps {
  children: ReactNode
  indicator?: boolean
  style?: ViewStyle
}

const CollapsibleTrigger = forwardRef<View, CollapsibleTriggerProps>(
  ({ children, indicator = true, style, ...rest }, ref) => {
    const ctx = useCollapsibleContext()
    const rotation = useRef(new Animated.Value(ctx.isOpen ? 1 : 0)).current

    useEffect(() => {
      Animated.timing(rotation, {
        toValue: ctx.isOpen ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }, [ctx.isOpen, rotation])

    const rotate = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    })

    return (
      <Pressable
        ref={ref}
        onPress={() => !ctx.disabled && ctx.toggle()}
        disabled={ctx.disabled}
        accessibilityRole="button"
        accessibilityState={{ expanded: ctx.isOpen, disabled: ctx.disabled }}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
          },
          ctx.disabled && { opacity: 0.5 },
          style,
        ]}
        {...rest}
      >
        {typeof children === 'string' ? (
          <RNText style={{ fontSize: 15, fontWeight: '500', flex: 1 }}>{children}</RNText>
        ) : (
          <View style={{ flex: 1 }}>{children}</View>
        )}
        {indicator && (
          <Animated.View style={{ transform: [{ rotate }] }}>
            <RNText style={{ fontSize: 14, color: '#666' }}>▼</RNText>
          </Animated.View>
        )}
      </Pressable>
    )
  },
)
CollapsibleTrigger.displayName = 'Collapsible.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface CollapsibleContentProps {
  children: ReactNode
  style?: ViewStyle
}

const CollapsibleContent = forwardRef<View, CollapsibleContentProps>(
  ({ children, style, ...rest }, ref) => {
    const ctx = useCollapsibleContext()
    const heightAnim = useRef(new Animated.Value(ctx.isOpen ? 1 : 0)).current
    const [measured, setMeasured] = useState(false)
    const contentHeight = useRef(0)

    useEffect(() => {
      Animated.timing(heightAnim, {
        toValue: ctx.isOpen ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }, [ctx.isOpen, heightAnim])

    const animatedHeight = heightAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, contentHeight.current || 500],
    })

    return (
      <Animated.View
        ref={ref}
        style={[
          { overflow: 'hidden' },
          measured ? { height: animatedHeight } : { position: 'absolute', opacity: 0 },
        ]}
        {...rest}
      >
        <View
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height
            if (h > 0 && !measured) {
              contentHeight.current = h
              setMeasured(true)
              heightAnim.setValue(ctx.isOpen ? 1 : 0)
            }
          }}
          style={[{ paddingTop: 4, paddingBottom: 16 }, style]}
        >
          {typeof children === 'string' ? (
            <RNText style={{ fontSize: 14, color: '#666' }}>{children}</RNText>
          ) : (
            children
          )}
        </View>
      </Animated.View>
    )
  },
)
CollapsibleContent.displayName = 'Collapsible.Content'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Collapsible = Object.assign(CollapsibleRoot, {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
})
