import {
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Dimensions,
  Modal,
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  Text as RNText,
  View,
} from 'react-native'
import type { LayoutRectangle, ViewStyle } from 'react-native'
import { styled } from '../stl-native/src/config'

// ─── Styled Primitives ──────────────────────────────────────────────────────

export const MenuContentView = styled(View, {
  backgroundColor: '$surface1',
  borderRadius: 8,
  paddingVertical: 4,
  minWidth: 220,
  borderWidth: 1,
  borderColor: '$neutral5',
  shadowColor: '$min',
  shadowOpacity: 0.15,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 },
  elevation: 4,
}, {}, 'NativeMenuContent')

export const MenuItemView = styled(RNPressable, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  paddingHorizontal: 8,
  paddingVertical: 6,
  borderRadius: 2,
  marginHorizontal: 4,
  hovered: { backgroundColor: '$neutral4' },
  pressed: { backgroundColor: '$neutral4' },
}, {
  disabled: {
    true: { opacity: 0.5 },
  },
}, 'NativeMenuItem')

export const MenuItemText = styled(RNText, {
  fontSize: '$p',
  color: '$defaultBody',
}, {}, 'NativeMenuItemText')

export const MenuLabelView = styled(View, {
  paddingHorizontal: 8,
  paddingVertical: 4,
  marginHorizontal: 4,
}, {}, 'NativeMenuLabel')

export const MenuLabelText = styled(RNText, {
  fontSize: '$14',
  fontWeight: '600',
  color: '$neutral9',
}, {}, 'NativeMenuLabelText')

export const MenuSeparatorView = styled(View, {
  height: 1,
  backgroundColor: '$neutral4',
  marginVertical: 4,
}, {}, 'NativeMenuSeparator')

export const CheckIndicatorView = styled(View, {
  width: 16,
  height: 16,
  alignItems: 'center',
  justifyContent: 'center',
}, {}, 'NativeMenuCheckIndicator')

// ─── Menu Content Context ───────────────────────────────────────────────────

interface MenuContentContextValue {
  onClose: () => void
}

const MenuContentContext = createContext<MenuContentContextValue | null>(null)

export function useMenuContentContext() {
  const ctx = useContext(MenuContentContext)
  if (!ctx) throw new Error('Menu item components must be used within a menu content')
  return ctx
}

// ─── Radio Group Context ────────────────────────────────────────────────────

interface RadioGroupContextValue {
  value: string
  onValueChange: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export function useRadioGroupContext() {
  return useContext(RadioGroupContext)
}

export const NativeRadioGroupProvider = forwardRef<View, {
  children: ReactNode
  value: string
  onValueChange: (value: string) => void
  style?: ViewStyle
}>(
  ({ children, value, onValueChange, ...rest }, ref) => (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <View ref={ref} accessibilityRole="radiogroup" {...rest}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  ),
)
NativeRadioGroupProvider.displayName = 'NativeRadioGroupProvider'

// ─── Overlay Content ────────────────────────────────────────────────────────

export interface NativeMenuOverlayProps {
  children: ReactNode
  visible: boolean
  onClose: () => void
  triggerLayout: LayoutRectangle | null
  style?: ViewStyle
}

export const NativeMenuOverlay = forwardRef<View, NativeMenuOverlayProps>(
  ({ children, visible, onClose, triggerLayout, style }, ref) => {
    const { width: screenW } = Dimensions.get('window')

    if (!visible) return null

    const tl = triggerLayout
    const posStyle: ViewStyle = tl
      ? { top: tl.y + tl.height + 8, left: Math.min(tl.x, screenW - 240), maxWidth: screenW - 32 }
      : {}

    return (
      <Modal visible transparent animationType="fade" onRequestClose={onClose}>
        <RNPressable style={{ flex: 1 }} onPress={onClose}>
          <View style={{ flex: 1 }} />
        </RNPressable>
        <MenuContentContext.Provider value={{ onClose }}>
          <MenuContentView
            ref={ref}
            style={{ position: 'absolute', ...posStyle, ...style } as ViewStyle}
            accessibilityRole="menu"
          >
            <RNScrollView bounces={false} showsVerticalScrollIndicator={false}>
              {children}
            </RNScrollView>
          </MenuContentView>
        </MenuContentContext.Provider>
      </Modal>
    )
  },
)
NativeMenuOverlay.displayName = 'NativeMenuOverlay'

// ─── Context Menu Overlay (positioned at x,y) ──────────────────────────────

export interface NativeContextMenuOverlayProps {
  children: ReactNode
  visible: boolean
  onClose: () => void
  position: { x: number; y: number }
  style?: ViewStyle
}

export const NativeContextMenuOverlay = forwardRef<View, NativeContextMenuOverlayProps>(
  ({ children, visible, onClose, position, style }, ref) => {
    const { width: screenW } = Dimensions.get('window')

    if (!visible) return null

    const posStyle: ViewStyle = {
      top: position.y,
      left: Math.min(position.x, screenW - 240),
      maxWidth: screenW - 32,
    }

    return (
      <Modal visible transparent animationType="fade" onRequestClose={onClose}>
        <RNPressable style={{ flex: 1 }} onPress={onClose}>
          <View style={{ flex: 1 }} />
        </RNPressable>
        <MenuContentContext.Provider value={{ onClose }}>
          <MenuContentView
            ref={ref}
            style={{ position: 'absolute', ...posStyle, ...style } as ViewStyle}
            accessibilityRole="menu"
          >
            <RNScrollView bounces={false} showsVerticalScrollIndicator={false}>
              {children}
            </RNScrollView>
          </MenuContentView>
        </MenuContentContext.Provider>
      </Modal>
    )
  },
)
NativeContextMenuOverlay.displayName = 'NativeContextMenuOverlay'
