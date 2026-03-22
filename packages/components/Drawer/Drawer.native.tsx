import {
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  Text as RNText,
  View,
} from 'react-native'
import type { ViewStyle } from 'react-native'
import { useDisclosure } from '../../headless/src/useDisclosure'

// ─── Types ──────────────────────────────────────────────────────────────────

type DrawerDirection = 'left' | 'right' | 'top' | 'bottom'

// ─── Context ────────────────────────────────────────────────────────────────

interface DrawerContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  direction: DrawerDirection
}

const DrawerContext = createContext<DrawerContextValue | null>(null)

function useDrawerContext() {
  const ctx = useContext(DrawerContext)
  if (!ctx) throw new Error('Drawer compounds must be used within Drawer.Root')
  return ctx
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const { width: SW, height: SH } = Dimensions.get('window')

function getSlideFrom(dir: DrawerDirection): { start: Record<string, number>; end: Record<string, number> } {
  switch (dir) {
    case 'left':
      return { start: { translateX: -SW }, end: { translateX: 0 } }
    case 'right':
      return { start: { translateX: SW }, end: { translateX: 0 } }
    case 'top':
      return { start: { translateY: -SH }, end: { translateY: 0 } }
    case 'bottom':
      return { start: { translateY: SH }, end: { translateY: 0 } }
  }
}

function getPositionStyle(dir: DrawerDirection): ViewStyle {
  const base: ViewStyle = { position: 'absolute', backgroundColor: '#fff' }
  switch (dir) {
    case 'left':
      return { ...base, top: 0, left: 0, bottom: 0, width: Math.min(SW * 0.85, 400), borderTopRightRadius: 12, borderBottomRightRadius: 12 }
    case 'right':
      return { ...base, top: 0, right: 0, bottom: 0, width: Math.min(SW * 0.85, 400), borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }
    case 'top':
      return { ...base, top: 0, left: 0, right: 0, maxHeight: Math.min(SH * 0.85, 400), borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }
    case 'bottom':
      return { ...base, bottom: 0, left: 0, right: 0, maxHeight: Math.min(SH * 0.85, 400), borderTopLeftRadius: 12, borderTopRightRadius: 12 }
  }
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface DrawerRootProps {
  children: ReactNode
  direction?: DrawerDirection
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const DrawerRoot = ({ children, direction = 'right', ...disclosureProps }: DrawerRootProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure(disclosureProps)

  const onOpenChange = useCallback(
    (next: boolean) => {
      if (next) onOpen()
      else onClose()
    },
    [onOpen, onClose],
  )

  return (
    <DrawerContext.Provider value={{ isOpen, onOpenChange, direction }}>
      {children}
    </DrawerContext.Provider>
  )
}
DrawerRoot.displayName = 'Drawer.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

const DrawerTrigger = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => {
    const { isOpen, onOpenChange } = useDrawerContext()

    return (
      <Pressable
        ref={ref}
        onPress={() => onOpenChange(!isOpen)}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        {...rest}
      >
        {children}
      </Pressable>
    )
  },
)
DrawerTrigger.displayName = 'Drawer.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface DrawerContentProps {
  children: ReactNode
  style?: ViewStyle
}

const DrawerContent = forwardRef<View, DrawerContentProps>(
  ({ children, style, ...rest }, ref) => {
    const { isOpen, onOpenChange, direction } = useDrawerContext()
    const slide = getSlideFrom(direction)
    const anim = useRef(new Animated.Value(0)).current

    useEffect(() => {
      Animated.timing(anim, {
        toValue: isOpen ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }).start()
    }, [isOpen, anim])

    const isHorizontal = direction === 'left' || direction === 'right'
    const transform = isHorizontal
      ? [{ translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [slide.start.translateX!, 0] }) }]
      : [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [slide.start.translateY!, 0] }) }]

    return (
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={() => onOpenChange(false)}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
          onPress={() => onOpenChange(false)}
        >
          <View style={{ flex: 1 }} />
        </Pressable>
        <Animated.View
          ref={ref}
          style={[getPositionStyle(direction), { transform }, style]}
          {...rest}
        >
          {children}
        </Animated.View>
      </Modal>
    )
  },
)
DrawerContent.displayName = 'Drawer.Content'

// ─── Header ─────────────────────────────────────────────────────────────────

const DrawerHeader = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => (
    <View ref={ref} style={[{ padding: 16, paddingBottom: 8 }, props.style]}>
      {props.children}
    </View>
  ),
)
DrawerHeader.displayName = 'Drawer.Header'

// ─── Title ──────────────────────────────────────────────────────────────────

const DrawerTitle = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => (
    <RNText ref={ref as any} accessibilityRole="header" style={[{ fontSize: 20, fontWeight: '600' }, props.style]}>
      {props.children}
    </RNText>
  ),
)
DrawerTitle.displayName = 'Drawer.Title'

// ─── Description ────────────────────────────────────────────────────────────

const DrawerDescription = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => (
    <RNText ref={ref as any} style={[{ fontSize: 14, color: '#666' }, props.style]}>
      {props.children}
    </RNText>
  ),
)
DrawerDescription.displayName = 'Drawer.Description'

// ─── Footer ─────────────────────────────────────────────────────────────────

const DrawerFooter = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => (
    <View
      ref={ref}
      style={[{ flexDirection: 'row', gap: 8, padding: 16, paddingTop: 8, justifyContent: 'flex-end' }, props.style]}
    >
      {props.children}
    </View>
  ),
)
DrawerFooter.displayName = 'Drawer.Footer'

// ─── Close ──────────────────────────────────────────────────────────────────

const DrawerClose = forwardRef<View, { children?: ReactNode; onPress?: () => void; style?: ViewStyle }>(
  ({ children, onPress, ...rest }, ref) => {
    const { onOpenChange } = useDrawerContext()

    return (
      <Pressable
        ref={ref}
        onPress={() => {
          onOpenChange(false)
          onPress?.()
        }}
        accessibilityRole="button"
        accessibilityLabel="Close drawer"
        style={[{ position: 'absolute', top: 12, right: 12, padding: 8, borderRadius: 4 }, rest.style]}
      >
        {children ?? <RNText style={{ fontSize: 16, color: '#666' }}>✕</RNText>}
      </Pressable>
    )
  },
)
DrawerClose.displayName = 'Drawer.Close'

// ─── Overlay (no-op — Modal provides) ───────────────────────────────────────

const DrawerOverlay = forwardRef<View, { children?: ReactNode }>(() => null)
DrawerOverlay.displayName = 'Drawer.Overlay'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Drawer = Object.assign(DrawerRoot, {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Close: DrawerClose,
})
