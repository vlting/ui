import {
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
} from 'react'
import {
  Dimensions,
  Modal,
  Pressable,
  Text as RNText,
  View,
} from 'react-native'
import type { ViewStyle } from 'react-native'
import { useDisclosure } from '../../headless/src/useDisclosure'
import { styled } from '../../stl-native/src/config'

// ─── Context ────────────────────────────────────────────────────────────────

interface AlertDialogContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null)

function useAlertDialogContext() {
  const ctx = useContext(AlertDialogContext)
  if (!ctx) throw new Error('AlertDialog compounds must be used within AlertDialog.Root')
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface AlertDialogRootProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const AlertDialogRoot = forwardRef<View, AlertDialogRootProps>(
  ({ children, open, defaultOpen, onOpenChange: onOpenChangeProp }, _ref) => {
    const disclosure = useDisclosure({ open, defaultOpen, onOpenChange: onOpenChangeProp })

    const onOpenChange = useCallback(
      (next: boolean) => {
        if (next) disclosure.onOpen()
        else disclosure.onClose()
      },
      [disclosure],
    )

    return (
      <AlertDialogContext.Provider value={{ isOpen: disclosure.isOpen, onOpenChange }}>
        {children}
      </AlertDialogContext.Provider>
    )
  },
)
AlertDialogRoot.displayName = 'AlertDialog.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

const AlertDialogTrigger = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => {
    const { onOpenChange } = useAlertDialogContext()

    return (
      <Pressable ref={ref} onPress={() => onOpenChange(true)} accessibilityRole="button" {...rest}>
        {children}
      </Pressable>
    )
  },
)
AlertDialogTrigger.displayName = 'AlertDialog.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface AlertDialogContentProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  style?: ViewStyle
}

const SIZE_MAP = { sm: 340, md: 420, lg: 540 }

const AlertDialogContent = forwardRef<View, AlertDialogContentProps>(
  ({ children, size = 'md', style, ...rest }, ref) => {
    const { isOpen, onOpenChange } = useAlertDialogContext()
    const maxW = Math.min(SIZE_MAP[size], Dimensions.get('window').width - 32)

    return (
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => onOpenChange(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '$overlayBackground',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}
        >
          <View
            ref={ref}
            accessibilityRole="alert"
            accessibilityViewIsModal
            style={[
              {
                backgroundColor: '$surface1',
                borderRadius: 12,
                padding: 24,
                width: '100%',
                maxWidth: maxW,
                maxHeight: '85%',
              },
              style,
            ]}
            {...rest}
          >
            {children}
          </View>
        </View>
      </Modal>
    )
  },
)
AlertDialogContent.displayName = 'AlertDialog.Content'

// ─── Title ──────────────────────────────────────────────────────────────────

const AlertDialogTitle = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => (
    <RNText ref={ref as any} accessibilityRole="header" style={[{ fontSize: 20, fontWeight: '600' }, props.style]}>
      {props.children}
    </RNText>
  ),
)
AlertDialogTitle.displayName = 'AlertDialog.Title'

// ─── Description ────────────────────────────────────────────────────────────

const AlertDialogDescription = styled(RNText, {
  fontSize: 14,
  color: '$neutral7',
  marginTop: 4,
}, 'AlertDialogDescription')

// ─── Footer ─────────────────────────────────────────────────────────────────

const AlertDialogFooter = styled(View, {
  flexDirection: 'row',
  gap: 8,
  paddingTop: 16,
  justifyContent: 'flex-end',
}, 'AlertDialogFooter')

// ─── Cancel ─────────────────────────────────────────────────────────────────

const AlertDialogCancel = forwardRef<View, { children: ReactNode; onPress?: () => void; style?: ViewStyle }>(
  ({ children, onPress, ...rest }, ref) => {
    const { onOpenChange } = useAlertDialogContext()

    return (
      <Pressable
        ref={ref}
        onPress={() => {
          onOpenChange(false)
          onPress?.()
        }}
        accessibilityRole="button"
        {...rest}
      >
        {children}
      </Pressable>
    )
  },
)
AlertDialogCancel.displayName = 'AlertDialog.Cancel'

// ─── Action ─────────────────────────────────────────────────────────────────

const AlertDialogAction = forwardRef<View, { children: ReactNode; onPress?: () => void; style?: ViewStyle }>(
  ({ children, onPress, ...rest }, ref) => {
    const { onOpenChange } = useAlertDialogContext()

    return (
      <Pressable
        ref={ref}
        onPress={() => {
          onOpenChange(false)
          onPress?.()
        }}
        accessibilityRole="button"
        {...rest}
      >
        {children}
      </Pressable>
    )
  },
)
AlertDialogAction.displayName = 'AlertDialog.Action'

// ─── Overlay (no-op on native) ──────────────────────────────────────────────

const AlertDialogOverlay = forwardRef<View, { children?: ReactNode }>(() => null)
AlertDialogOverlay.displayName = 'AlertDialog.Overlay'

// ─── Export ─────────────────────────────────────────────────────────────────

export const AlertDialog = Object.assign(AlertDialogRoot, {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Overlay: AlertDialogOverlay,
  Content: AlertDialogContent,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Footer: AlertDialogFooter,
  Cancel: AlertDialogCancel,
  Action: AlertDialogAction,
})
