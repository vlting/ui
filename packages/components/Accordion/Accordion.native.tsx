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
import {
  type UseAccordionProps,
  type UseAccordionReturn,
  useAccordion,
} from '../../headless/src/useAccordion'

// ─── Context ────────────────────────────────────────────────────────────────

const AccordionContext = createContext<UseAccordionReturn | null>(null)

function useAccordionContext() {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('Accordion compounds must be used within Accordion.Root')
  return ctx
}

interface AccordionItemContextValue {
  value: string
  disabled: boolean
  isOpen: boolean
  index: number
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext)
  if (!ctx) throw new Error('Accordion.Trigger/Content must be used within Accordion.Item')
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface AccordionRootProps {
  children: ReactNode
  type: 'single' | 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  collapsible?: boolean
  style?: ViewStyle
}

const AccordionRoot = forwardRef<View, AccordionRootProps>(
  ({ type, value, defaultValue, onValueChange, disabled, collapsible, children, ...rest }, ref) => {
    const accordionProps: UseAccordionProps =
      type === 'multiple'
        ? { type: 'multiple', value, defaultValue, onValueChange, disabled }
        : { type: 'single', collapsible, value, defaultValue, onValueChange, disabled }

    const accordion = useAccordion(accordionProps)

    return (
      <AccordionContext.Provider value={accordion}>
        <View ref={ref} accessibilityRole="none" {...rest}>
          {children}
        </View>
      </AccordionContext.Provider>
    )
  },
)
AccordionRoot.displayName = 'Accordion.Root'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface AccordionItemProps {
  children: ReactNode
  value: string
  disabled?: boolean
  style?: ViewStyle
}

const AccordionItem = forwardRef<View, AccordionItemProps>(
  ({ value: itemValue, disabled = false, children, style, ...rest }, ref) => {
    const ctx = useAccordionContext()
    const index = ctx.registerItem(itemValue)
    const isOpen = ctx.isExpanded(itemValue)

    ctx.setItemDisabled(index, disabled)

    useEffect(() => {
      return () => ctx.unregisterItem(itemValue)
    }, [itemValue, ctx])

    return (
      <AccordionItemContext.Provider value={{ value: itemValue, disabled, isOpen, index }}>
        <View
          ref={ref}
          style={[{ borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' }, style]}
          {...rest}
        >
          {children}
        </View>
      </AccordionItemContext.Provider>
    )
  },
)
AccordionItem.displayName = 'Accordion.Item'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface AccordionTriggerProps {
  children: ReactNode
  indicator?: boolean
  style?: ViewStyle
}

const AccordionTrigger = forwardRef<View, AccordionTriggerProps>(
  ({ children, indicator = true, style, ...rest }, ref) => {
    const ctx = useAccordionContext()
    const item = useAccordionItemContext()
    const triggerProps = ctx.getTriggerProps(item.value, item.index)
    const isDisabled = triggerProps.disabled || item.disabled
    const rotation = useRef(new Animated.Value(item.isOpen ? 1 : 0)).current

    useEffect(() => {
      Animated.timing(rotation, {
        toValue: item.isOpen ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }, [item.isOpen, rotation])

    const rotate = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    })

    return (
      <Pressable
        ref={ref}
        onPress={triggerProps.onClick}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityState={{ expanded: item.isOpen, disabled: isDisabled }}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
          },
          isDisabled && { opacity: 0.5 },
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
AccordionTrigger.displayName = 'Accordion.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface AccordionContentProps {
  children: ReactNode
  style?: ViewStyle
}

const AccordionContent = forwardRef<View, AccordionContentProps>(
  ({ children, style, ...rest }, ref) => {
    const item = useAccordionItemContext()
    const heightAnim = useRef(new Animated.Value(item.isOpen ? 1 : 0)).current
    const [measured, setMeasured] = useState(false)
    const contentHeight = useRef(0)

    useEffect(() => {
      Animated.timing(heightAnim, {
        toValue: item.isOpen ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }, [item.isOpen, heightAnim])

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
              heightAnim.setValue(item.isOpen ? 1 : 0)
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
AccordionContent.displayName = 'Accordion.Content'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})
