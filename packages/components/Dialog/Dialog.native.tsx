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

interface DialogContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialogContext() {
  const ctx = useContext(DialogContext)
  if (!ctx) throw new Error('Dialog compounds must be used within Dialog.Root')
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface DialogRootProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const DialogRoot = forwardRef<View, DialogRootProps>(
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
      <DialogContext.Provider value={{ isOpen: disclosure.isOpen, onOpenChange }}>
        {children}
      </DialogContext.Provider>
    )
  },
)
DialogRoot.displayName = 'Dialog.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

export interface DialogTriggerProps {
  children: ReactNode
  style?: ViewStyle
}

const DialogTrigger = forwardRef<View, DialogTriggerProps>(
  ({ children, ...rest }, ref) => {
    const { onOpenChange } = useDialogContext()

    return (
      <Pressable ref={ref} onPress={() => onOpenChange(true)} accessibilityRole="button" {...rest}>
        {children}
      </Pressable>
    )
  },
)
DialogTrigger.displayName = 'Dialog.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface DialogContentProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  style?: ViewStyle
}

const SIZE_MAP = { sm: 340, md: 420, lg: 540 }

const DialogContent = forwardRef<View, DialogContentProps>(
  ({ children, size = 'md', style, ...rest }, ref) => {
    const { isOpen, onOpenChange } = useDialogContext()
    const maxW = Math.min(SIZE_MAP[size], Dimensions.get('window').width - 32)

    return (
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => onOpenChange(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: '$overlayBackground',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}
          onPress={() => onOpenChange(false)}
        >
          <Pressable onPress={() => {}} style={{ maxWidth: maxW, width: '100%' }}>
            <View
              ref={ref}
              accessibilityRole="none"
              accessibilityViewIsModal
              style={[
                {
                  backgroundColor: '$surface1',
                  borderRadius: 12,
                  padding: 24,
                  width: '100%',
                  maxHeight: '85%',
                },
                style,
              ]}
              {...rest}
            >
              {children}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    )
  },
)
DialogContent.displayName = 'Dialog.Content'

// ─── Header ─────────────────────────────────────────────────────────────────

const DialogHeader = styled(View, {
  gap: 4,
  paddingBottom: 16,
}, 'DialogHeader')

// ─── Title ──────────────────────────────────────────────────────────────────

const DialogTitle = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => (
    <RNText ref={ref as any} accessibilityRole="header" style={[{ fontSize: 20, fontWeight: '600' }, props.style]}>
      {props.children}
    </RNText>
  ),
)
DialogTitle.displayName = 'Dialog.Title'

// ─── Description ────────────────────────────────────────────────────────────

const DialogDescription = styled(RNText, {
  fontSize: 14,
  color: '$neutralText4',
  marginTop: 4,
}, 'DialogDescription')

// ─── Footer ─────────────────────────────────────────────────────────────────

const DialogFooter = styled(View, {
  flexDirection: 'row',
  gap: 8,
  paddingTop: 16,
  justifyContent: 'flex-end',
}, 'DialogFooter')

// ─── Close ──────────────────────────────────────────────────────────────────

const DialogClose = forwardRef<View, { children?: ReactNode; style?: ViewStyle; onPress?: () => void }>(
  ({ children, onPress, ...rest }, ref) => {
    const { onOpenChange } = useDialogContext()

    return (
      <Pressable
        ref={ref}
        onPress={() => {
          onOpenChange(false)
          onPress?.()
        }}
        accessibilityRole="button"
        accessibilityLabel="Close dialog"
        style={[
          {
            position: 'absolute',
            top: 12,
            right: 12,
            padding: 4,
            borderRadius: 4,
          },
          rest.style,
        ]}
      >
        {children || <RNText style={{ fontSize: 16, color: '$neutralText4' }}>✕</RNText>}
      </Pressable>
    )
  },
)
DialogClose.displayName = 'Dialog.Close'

// ─── Overlay (no-op on native — Modal provides it) ─────────────────────────

const DialogOverlay = forwardRef<View, { children?: ReactNode }>(() => null)
DialogOverlay.displayName = 'Dialog.Overlay'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
})
