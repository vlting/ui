import {
  type ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  Text as RNText,
  View,
} from 'react-native'
import type { LayoutRectangle, ViewStyle } from 'react-native'

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TooltipProps {
  children: ReactNode
  content: string
  delay?: number
  dismissDelay?: number
  placement?: 'top' | 'bottom'
  style?: ViewStyle
}

// ─── Tooltip ────────────────────────────────────────────────────────────────

export const Tooltip = forwardRef<View, TooltipProps>(
  ({ children, content, delay = 500, dismissDelay = 2000, placement = 'top', style }, ref) => {
    const [visible, setVisible] = useState(false)
    const triggerRef = useRef<View>(null)
    const triggerLayout = useRef<LayoutRectangle | null>(null)
    const opacity = useRef(new Animated.Value(0)).current
    const dismissTimer = useRef<ReturnType<typeof setTimeout>>(null)
    const longPressTimer = useRef<ReturnType<typeof setTimeout>>(null)

    const show = useCallback(() => {
      triggerRef.current?.measureInWindow((x, y, w, h) => {
        triggerLayout.current = { x, y, width: w, height: h }
        setVisible(true)
        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start()
        dismissTimer.current = setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }).start(() => setVisible(false))
        }, dismissDelay)
      })
    }, [opacity, dismissDelay])

    const hide = useCallback(() => {
      if (longPressTimer.current != null) clearTimeout(longPressTimer.current)
      if (dismissTimer.current != null) clearTimeout(dismissTimer.current)
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => setVisible(false))
    }, [opacity])

    useEffect(() => {
      return () => {
        if (longPressTimer.current != null) clearTimeout(longPressTimer.current)
        if (dismissTimer.current != null) clearTimeout(dismissTimer.current)
      }
    }, [])

    const tl = triggerLayout.current
    const { width: screenW } = Dimensions.get('window')
    let posStyle: ViewStyle = {}
    if (tl) {
      const left = Math.max(8, Math.min(tl.x, screenW - 208))
      if (placement === 'top') {
        posStyle = { bottom: Dimensions.get('window').height - tl.y + 8, left }
      } else {
        posStyle = { top: tl.y + tl.height + 8, left }
      }
    }

    return (
      <>
        <Pressable
          ref={(node) => {
            (triggerRef as any).current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as any).current = node
          }}
          onLongPress={show}
          onPressOut={hide}
          delayLongPress={delay}
          accessibilityRole="button"
          style={style}
        >
          {children}
        </Pressable>
        {visible && (
          <Modal transparent visible animationType="none" onRequestClose={hide}>
            <Pressable style={{ flex: 1 }} onPress={hide}>
              <View style={{ flex: 1 }} />
            </Pressable>
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  backgroundColor: 'rgba(0,0,0,0.85)',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                  maxWidth: 200,
                  opacity,
                },
                posStyle,
              ]}
            >
              <RNText style={{ color: '#fff', fontSize: 13 }}>{content}</RNText>
            </Animated.View>
          </Modal>
        )}
      </>
    )
  },
)
Tooltip.displayName = 'Tooltip'
