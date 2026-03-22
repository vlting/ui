import {
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  View,
} from 'react-native'
import type { LayoutRectangle, ViewStyle } from 'react-native'

// ─── Context ────────────────────────────────────────────────────────────────

interface HoverCardContextValue {
  isOpen: boolean
  show: () => void
  hide: () => void
  triggerRef: React.RefObject<View | null>
  triggerLayout: React.MutableRefObject<LayoutRectangle | null>
  placement: 'top' | 'bottom'
}

const HoverCardContext = createContext<HoverCardContextValue | null>(null)

function useHoverCardContext() {
  const ctx = useContext(HoverCardContext)
  if (!ctx) throw new Error('HoverCard compounds must be used within HoverCard.Root')
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface HoverCardRootProps {
  children: ReactNode
  placement?: 'top' | 'bottom'
  showDelay?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const HoverCardRoot = forwardRef<View, HoverCardRootProps>(
  ({ children, placement = 'bottom', showDelay = 500, open: controlledOpen, onOpenChange }, _ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
    const isControlled = controlledOpen !== undefined
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen
    const triggerRef = useRef<View>(null)
    const triggerLayout = useRef<LayoutRectangle | null>(null)
    const longPressTimer = useRef<ReturnType<typeof setTimeout>>(null)

    const setOpen = useCallback(
      (value: boolean) => {
        if (!isControlled) setUncontrolledOpen(value)
        onOpenChange?.(value)
      },
      [isControlled, onOpenChange],
    )

    const show = useCallback(() => {
      triggerRef.current?.measureInWindow((x, y, w, h) => {
        triggerLayout.current = { x, y, width: w, height: h }
        setOpen(true)
      })
    }, [setOpen])

    const hide = useCallback(() => {
      if (longPressTimer.current != null) clearTimeout(longPressTimer.current)
      setOpen(false)
    }, [setOpen])

    useEffect(() => {
      return () => { if (longPressTimer.current != null) clearTimeout(longPressTimer.current) }
    }, [])

    return (
      <HoverCardContext.Provider value={{ isOpen, show, hide, triggerRef, triggerLayout, placement }}>
        {children}
      </HoverCardContext.Provider>
    )
  },
)
HoverCardRoot.displayName = 'HoverCard.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface HoverCardTriggerProps {
  children: ReactNode
  style?: ViewStyle
}

const HoverCardTrigger = forwardRef<View, HoverCardTriggerProps>(
  ({ children, ...rest }, ref) => {
    const { show, hide, triggerRef } = useHoverCardContext()

    return (
      <Pressable
        ref={(node) => {
          (triggerRef as any).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as any).current = node
        }}
        onLongPress={show}
        onPressOut={hide}
        delayLongPress={500}
        accessibilityRole="button"
        {...rest}
      >
        {children}
      </Pressable>
    )
  },
)
HoverCardTrigger.displayName = 'HoverCard.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface HoverCardContentProps {
  children: ReactNode
  style?: ViewStyle
}

const HoverCardContent = forwardRef<View, HoverCardContentProps>(
  ({ children, style, ...rest }, ref) => {
    const { isOpen, hide, triggerLayout, placement } = useHoverCardContext()
    const opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
      Animated.timing(opacity, {
        toValue: isOpen ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }).start()
    }, [isOpen, opacity])

    if (!isOpen) return null

    const tl = triggerLayout.current
    const { width: screenW, height: screenH } = Dimensions.get('window')
    let posStyle: ViewStyle = {}
    if (tl) {
      const left = Math.max(8, Math.min(tl.x, screenW - 328))
      if (placement === 'top') {
        posStyle = { bottom: screenH - tl.y + 8, left }
      } else {
        posStyle = { top: tl.y + tl.height + 8, left }
      }
    }

    return (
      <Modal transparent visible animationType="none" onRequestClose={hide}>
        <Pressable style={{ flex: 1 }} onPress={hide}>
          <View style={{ flex: 1 }} />
        </Pressable>
        <Animated.View
          ref={ref}
          style={[
            {
              position: 'absolute',
              backgroundColor: '#fff',
              borderRadius: 8,
              padding: 16,
              maxWidth: 320,
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.1)',
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
              opacity,
            },
            posStyle,
            style,
          ]}
          {...rest}
        >
          {children}
        </Animated.View>
      </Modal>
    )
  },
)
HoverCardContent.displayName = 'HoverCard.Content'

// ─── Export ─────────────────────────────────────────────────────────────────

export const HoverCard = Object.assign(HoverCardRoot, {
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
})
