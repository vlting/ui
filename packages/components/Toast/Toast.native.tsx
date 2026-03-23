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
import { styled } from '../../stl-native/src/config'
import { useTokens } from '../../stl-native/src/hooks/useTokens'
import { useImperativeToasts, toast as toastApi } from './toast-imperative'
import type { ToastData, ToastVariant } from './toast-imperative'

// ─── Variant border token keys ──────────────────────────────────────────────

const VARIANT_BORDER_TOKEN: Record<ToastVariant, string> = {
  neutral: 'transparent',
  success: '$grass9',
  error: '$tomato9',
  warning: '$amber9',
  info: '$iris9',
}

// ─── Styled ─────────────────────────────────────────────────────────────────

const RootBase = styled(View, {
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 12,
  backgroundColor: '$surface1',
  borderRadius: 8,
  padding: 16,
  borderWidth: 1,
  borderColor: '$neutral5',
  shadowColor: '$max',
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
  maxWidth: 420,
  width: '100%',
}, {}, 'ToastRoot')

const TitleText = styled(RNText, {
  fontWeight: '$semiBold',
  fontSize: '$14',
}, {}, 'ToastTitle')

const DescriptionText = styled(RNText, {
  fontSize: '$13',
  color: '$neutralText4',
  marginTop: 2,
}, {}, 'ToastDescription')

const ActionBase = styled(Pressable, {
  marginTop: 8,
}, {}, 'ToastAction')

const ActionText = styled(RNText, {
  fontSize: '$13',
  fontWeight: '$medium',
  color: '$primary9',
}, {}, 'ToastActionText')

const CloseBase = styled(Pressable, {
  padding: 4,
}, {}, 'ToastClose')

const CloseText = styled(RNText, {
  fontSize: '$14',
  color: '$neutralText4',
}, {}, 'ToastCloseText')

// ─── Toast Root ─────────────────────────────────────────────────────────────

export interface ToastRootProps {
  children?: ReactNode
  theme?: ToastVariant
  style?: ViewStyle
}

const Root = forwardRef<View, ToastRootProps>(
  ({ children, theme = 'neutral', style, ...rest }, ref) => {
    const { tokenValue } = useTokens()
    const borderToken = VARIANT_BORDER_TOKEN[theme]
    const borderLeftColor = borderToken === 'transparent'
      ? 'transparent'
      : tokenValue.color[borderToken as keyof typeof tokenValue.color] ?? borderToken

    return (
      <RootBase
        ref={ref}
        accessibilityRole="alert"
        css={{
          borderLeftWidth: theme !== 'neutral' ? 4 : 1,
          shadowOffset: { width: 0, height: 4 },
        }}
        style={[
          { borderLeftColor },
          style,
        ]}
        {...rest}
      >
        {children}
      </RootBase>
    )
  },
)
Root.displayName = 'Toast.Root'

// ─── Title ──────────────────────────────────────────────────────────────────

const Title = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => (
    <TitleText ref={ref as any} style={props.style}>
      {props.children}
    </TitleText>
  ),
)
Title.displayName = 'Toast.Title'

// ─── Description ────────────────────────────────────────────────────────────

const Description = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => (
    <DescriptionText ref={ref as any} style={props.style}>
      {props.children}
    </DescriptionText>
  ),
)
Description.displayName = 'Toast.Description'

// ─── Action ─────────────────────────────────────────────────────────────────

const Action = forwardRef<View, { children: ReactNode; onPress?: () => void; style?: ViewStyle }>(
  ({ children, onPress, style, ...rest }, ref) => (
    <ActionBase ref={ref} onPress={onPress} style={style} {...rest}>
      {typeof children === 'string' ? (
        <ActionText>{children}</ActionText>
      ) : (
        children
      )}
    </ActionBase>
  ),
)
Action.displayName = 'Toast.Action'

// ─── Close ──────────────────────────────────────────────────────────────────

const Close = forwardRef<View, { onClose?: () => void; style?: ViewStyle }>(
  ({ onClose, style }, ref) => (
    <CloseBase
      ref={ref}
      onPress={onClose}
      accessibilityRole="button"
      accessibilityLabel="Dismiss"
      style={style}
    >
      <CloseText>✕</CloseText>
    </CloseBase>
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
