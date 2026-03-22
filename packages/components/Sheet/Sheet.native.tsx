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
  PanResponder,
  Pressable,
  Text as RNText,
  View,
} from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config'
import { useDisclosure } from '../../headless/src/useDisclosure'

// ─── Context ────────────────────────────────────────────────────────────────

interface SheetContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const SheetContext = createContext<SheetContextValue | null>(null)

function useSheetContext() {
  const ctx = useContext(SheetContext)
  if (!ctx) throw new Error('Sheet compounds must be used within Sheet.Root')
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface SheetRootProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const SheetRoot = ({ children, open, defaultOpen, onOpenChange: onOpenChangeProp }: SheetRootProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ open, defaultOpen, onOpenChange: onOpenChangeProp })

  const onOpenChange = useCallback(
    (next: boolean) => {
      if (next) onOpen()
      else onClose()
    },
    [onOpen, onClose],
  )

  return (
    <SheetContext.Provider value={{ isOpen, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  )
}
SheetRoot.displayName = 'Sheet.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

const SheetTrigger = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => {
    const { onOpenChange } = useSheetContext()

    return (
      <Pressable ref={ref} onPress={() => onOpenChange(true)} accessibilityRole="button" {...rest}>
        {children}
      </Pressable>
    )
  },
)
SheetTrigger.displayName = 'Sheet.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface SheetContentProps {
  children: ReactNode
  style?: ViewStyle
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const SheetContent = forwardRef<View, SheetContentProps>(
  ({ children, style, ...rest }, ref) => {
    const { isOpen, onOpenChange } = useSheetContext()
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current

    useEffect(() => {
      if (isOpen) {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start()
      } else {
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }).start()
      }
    }, [isOpen, slideAnim])

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (_e, gs) => gs.dy > 10,
        onPanResponderRelease: (_e, gs) => {
          if (gs.dy > 80) onOpenChange(false)
        },
      }),
    ).current

    return (
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={() => onOpenChange(false)}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: '$overlayBackground' }}
          onPress={() => onOpenChange(false)}
        >
          <View style={{ flex: 1 }} />
        </Pressable>
        <Animated.View
          ref={ref}
          {...panResponder.panHandlers}
          style={[
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '$surface1',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              maxHeight: SCREEN_HEIGHT * 0.85,
              transform: [{ translateY: slideAnim }],
            },
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
SheetContent.displayName = 'Sheet.Content'

// ─── Handle ─────────────────────────────────────────────────────────────────

const SheetHandle = forwardRef<View, { style?: ViewStyle }>(
  (props, ref) => (
    <View ref={ref} style={[{ alignItems: 'center', paddingVertical: 8 }, props.style]}>
      <View style={{ width: 36, height: 4, backgroundColor: '$neutral5', borderRadius: 2 }} />
    </View>
  ),
)
SheetHandle.displayName = 'Sheet.Handle'

// ─── Header ─────────────────────────────────────────────────────────────────

const SheetHeader = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => (
    <View ref={ref} style={[{ padding: 16, paddingBottom: 8 }, props.style]}>
      {props.children}
    </View>
  ),
)
SheetHeader.displayName = 'Sheet.Header'

// ─── Title ──────────────────────────────────────────────────────────────────

const SheetTitle = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => (
    <RNText ref={ref as any} accessibilityRole="header" style={[{ fontSize: 20, fontWeight: '600' }, props.style]}>
      {props.children}
    </RNText>
  ),
)
SheetTitle.displayName = 'Sheet.Title'

// ─── Description ────────────────────────────────────────────────────────────

const SheetDescription = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => (
    <RNText ref={ref as any} style={[{ fontSize: 14, color: '$neutral7' }, props.style]}>
      {props.children}
    </RNText>
  ),
)
SheetDescription.displayName = 'Sheet.Description'

// ─── Footer ─────────────────────────────────────────────────────────────────

const SheetFooter = styled(View, {
  flexDirection: 'row',
  gap: 8,
  padding: 16,
  paddingTop: 8,
  justifyContent: 'flex-end',
}, 'SheetFooter')

// ─── Overlay (no-op — Modal provides) ───────────────────────────────────────

const SheetOverlay = forwardRef<View, { children?: ReactNode }>(() => null)
SheetOverlay.displayName = 'Sheet.Overlay'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Sheet = Object.assign(SheetRoot, {
  Root: SheetRoot,
  Trigger: SheetTrigger,
  Overlay: SheetOverlay,
  Content: SheetContent,
  Handle: SheetHandle,
  Header: SheetHeader,
  Title: SheetTitle,
  Description: SheetDescription,
  Footer: SheetFooter,
})
