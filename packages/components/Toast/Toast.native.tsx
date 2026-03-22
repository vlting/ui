import {
  type ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import {
  Animated,
  Pressable,
  Text as RNText,
  View,
} from 'react-native'
import type { ViewStyle } from 'react-native'
import { useImperativeToasts, toast as toastApi } from './toast-imperative'
import type { ToastData, ToastVariant } from './toast-imperative'

// ─── Variant colors ─────────────────────────────────────────────────────────

const VARIANT_BORDER: Record<ToastVariant, string> = {
  neutral: 'transparent',
  success: '#30a46c',
  error: '#e5484d',
  warning: '#f5a623',
  info: '#6e56cf',
}

// ─── Toast Root ─────────────────────────────────────────────────────────────

export interface ToastRootProps {
  children?: ReactNode
  theme?: ToastVariant
  style?: ViewStyle
}

const Root = forwardRef<View, ToastRootProps>(
  ({ children, theme = 'neutral', style, ...rest }, ref) => (
    <View
      ref={ref}
      accessibilityRole="alert"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 12,
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 16,
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.1)',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
          maxWidth: 420,
          width: '100%',
          borderLeftWidth: theme !== 'neutral' ? 4 : 1,
          borderLeftColor: VARIANT_BORDER[theme],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  ),
)
Root.displayName = 'Toast.Root'

// ─── Title ──────────────────────────────────────────────────────────────────

const Title = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => (
    <RNText ref={ref as any} style={[{ fontWeight: '600', fontSize: 14 }, props.style]}>
      {props.children}
    </RNText>
  ),
)
Title.displayName = 'Toast.Title'

// ─── Description ────────────────────────────────────────────────────────────

const Description = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => (
    <RNText ref={ref as any} style={[{ fontSize: 13, color: '#666', marginTop: 2 }, props.style]}>
      {props.children}
    </RNText>
  ),
)
Description.displayName = 'Toast.Description'

// ─── Action ─────────────────────────────────────────────────────────────────

const Action = forwardRef<View, { children: ReactNode; onPress?: () => void; style?: ViewStyle }>(
  ({ children, onPress, style, ...rest }, ref) => (
    <Pressable ref={ref} onPress={onPress} style={[{ marginTop: 8 }, style]} {...rest}>
      {typeof children === 'string' ? (
        <RNText style={{ fontSize: 13, fontWeight: '500', color: '#0066ff' }}>{children}</RNText>
      ) : (
        children
      )}
    </Pressable>
  ),
)
Action.displayName = 'Toast.Action'

// ─── Close ──────────────────────────────────────────────────────────────────

const Close = forwardRef<View, { onClose?: () => void; style?: ViewStyle }>(
  ({ onClose, style }, ref) => (
    <Pressable
      ref={ref}
      onPress={onClose}
      accessibilityRole="button"
      accessibilityLabel="Dismiss"
      style={[{ padding: 4 }, style]}
    >
      <RNText style={{ fontSize: 14, color: '#666' }}>✕</RNText>
    </Pressable>
  ),
)
Close.displayName = 'Toast.Close'

// ─── ToastItem ──────────────────────────────────────────────────────────────

function ToastItem({ data, onDismiss }: { data: ToastData; onDismiss: (id: string) => void }) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const slideAnim = useRef(new Animated.Value(50)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()

    timerRef.current = setTimeout(() => onDismiss(data.id), data.duration)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [data.id, data.duration, onDismiss, slideAnim, opacityAnim])

  return (
    <Animated.View style={{ transform: [{ translateY: slideAnim }], opacity: opacityAnim }}>
      <Root theme={data.variant}>
        <View style={{ flex: 1 }}>
          <Title>{data.title}</Title>
          {data.description && <Description>{data.description}</Description>}
          {data.action && (
            <Action onPress={data.action.onClick}>{data.action.label}</Action>
          )}
        </View>
        <Close onClose={() => onDismiss(data.id)} />
      </Root>
    </Animated.View>
  )
}

// ─── Toaster ────────────────────────────────────────────────────────────────

export type ToasterPosition = 'top' | 'bottom'

export interface ToasterProps {
  position?: ToasterPosition
}

export function Toaster({ position = 'bottom' }: ToasterProps) {
  const toasts = useImperativeToasts()

  const handleDismiss = useCallback((id: string) => {
    toastApi.dismiss(id)
  }, [])

  if (toasts.length === 0) return null

  return (
    <View
      style={{
        position: 'absolute',
        [position === 'top' ? 'top' : 'bottom']: 60,
        left: 16,
        right: 16,
        alignItems: 'center',
        gap: 8,
        zIndex: 9999,
        pointerEvents: 'box-none',
      }}
      accessibilityRole="none"
      accessibilityLiveRegion="polite"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} data={t} onDismiss={handleDismiss} />
      ))}
    </View>
  )
}

// ─── Export ──────────────────────────────────────────────────────────────────

export const Toast = { Root, Title, Description, Action, Close }

export { toast } from './toast-imperative'
export type { ToastData, ToastVariant } from './toast-imperative'

// Backward-compat alias
export const useNativeToast = () => ({
  add: ({ message, duration }: { message: string; duration?: number }) => {
    toastApi(message)
  },
  remove: () => {},
})
