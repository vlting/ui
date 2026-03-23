import {
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useRef,
} from 'react'
import {
  Dimensions,
  Modal,
  Pressable,
  Text as RNText,
  View,
} from 'react-native'
import type { LayoutRectangle, ViewStyle } from 'react-native'
import { useDisclosure } from '../../headless/src/useDisclosure'

// ─── Types ──────────────────────────────────────────────────────────────────

type Placement = 'top' | 'bottom' | 'left' | 'right'

// ─── Context ────────────────────────────────────────────────────────────────

interface PopoverContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  placement: Placement
  triggerLayout: React.MutableRefObject<LayoutRectangle | null>
  triggerRef: React.RefObject<View | null>
}

const PopoverContext = createContext<PopoverContextValue | null>(null)

function usePopoverContext() {
  const ctx = useContext(PopoverContext)
  if (!ctx) throw new Error('Popover compounds must be used within Popover.Root')
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface PopoverRootProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: Placement
}

const PopoverRoot = forwardRef<View, PopoverRootProps>(
  ({ children, open, defaultOpen, onOpenChange: onOpenChangeProp, placement = 'bottom' }, _ref) => {
    const disclosure = useDisclosure({ open, defaultOpen, onOpenChange: onOpenChangeProp })
    const triggerLayout = useRef<LayoutRectangle | null>(null)
    const triggerRef = useRef<View>(null)

    const onOpenChange = useCallback(
      (next: boolean) => {
        if (next) disclosure.onOpen()
        else disclosure.onClose()
      },
      [disclosure],
    )

    return (
      <PopoverContext.Provider
        value={{ isOpen: disclosure.isOpen, onOpenChange, placement, triggerLayout, triggerRef }}
      >
        {children}
      </PopoverContext.Provider>
    )
  },
)
PopoverRoot.displayName = 'Popover.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

const PopoverTrigger = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => {
    const { isOpen, onOpenChange, triggerLayout, triggerRef } = usePopoverContext()

    const handlePress = useCallback(() => {
      triggerRef.current?.measureInWindow((x, y, w, h) => {
        triggerLayout.current = { x, y, width: w, height: h }
        onOpenChange(!isOpen)
      })
    }, [isOpen, onOpenChange, triggerLayout, triggerRef])

    return (
      <Pressable
        ref={(node) => {
          (triggerRef as any).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as any).current = node
        }}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        {...rest}
      >
        {children}
      </Pressable>
    )
  },
)
PopoverTrigger.displayName = 'Popover.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

export interface PopoverContentProps {
  children: ReactNode
  style?: ViewStyle
}

const PopoverContent = forwardRef<View, PopoverContentProps>(
  ({ children, style, ...rest }, ref) => {
    const { isOpen, onOpenChange, placement, triggerLayout } = usePopoverContext()
    const { width: screenW, height: screenH } = Dimensions.get('window')

    if (!isOpen) return null

    const tl = triggerLayout.current
    let posStyle: ViewStyle = {}
    if (tl) {
      switch (placement) {
        case 'bottom':
          posStyle = { top: tl.y + tl.height + 8, left: tl.x, maxWidth: screenW - 32 }
          break
        case 'top':
          posStyle = { bottom: screenH - tl.y + 8, left: tl.x, maxWidth: screenW - 32 }
          break
        case 'left':
          posStyle = { top: tl.y, right: screenW - tl.x + 8, maxWidth: screenW - 32 }
          break
        case 'right':
          posStyle = { top: tl.y, left: tl.x + tl.width + 8, maxWidth: screenW - 32 }
          break
      }
    }

    return (
      <Modal
        visible
        transparent
        animationType="fade"
        onRequestClose={() => onOpenChange(false)}
      >
        <Pressable style={{ flex: 1 }} onPress={() => onOpenChange(false)}>
          <View style={{ flex: 1 }} />
        </Pressable>
        <View
          ref={ref}
          style={[
            {
              position: 'absolute',
              backgroundColor: '$surface1',
              borderRadius: 8,
              padding: 16,
              borderWidth: 1,
              borderColor: '$neutral5',
              shadowColor: '$min',
              shadowOpacity: 0.15,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
              minWidth: 200,
            },
            posStyle,
            style,
          ]}
          {...rest}
        >
          {children}
        </View>
      </Modal>
    )
  },
)
PopoverContent.displayName = 'Popover.Content'

// ─── Close ──────────────────────────────────────────────────────────────────

const PopoverClose = forwardRef<View, { children?: ReactNode; onPress?: () => void; style?: ViewStyle }>(
  ({ children, onPress, ...rest }, ref) => {
    const { onOpenChange } = usePopoverContext()

    return (
      <Pressable
        ref={ref}
        onPress={() => {
          onOpenChange(false)
          onPress?.()
        }}
        accessibilityRole="button"
        accessibilityLabel="Close popover"
        style={[{ position: 'absolute', top: 8, right: 8, padding: 4 }, rest.style]}
      >
        {children || <RNText style={{ fontSize: 14, color: '$neutralText4' }}>✕</RNText>}
      </Pressable>
    )
  },
)
PopoverClose.displayName = 'Popover.Close'

// ─── Arrow (no-op on native) ────────────────────────────────────────────────

const PopoverArrow = forwardRef<View, { style?: ViewStyle }>(() => null)
PopoverArrow.displayName = 'Popover.Arrow'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Arrow: PopoverArrow,
  Close: PopoverClose,
})
