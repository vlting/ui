import React, { createContext, useContext } from 'react'
import type { ViewStyle } from 'react-native'
import { Pressable, Text as RNText, View } from 'react-native'
import type {
  Toast as ToastType,
  UseToastQueueReturn,
} from '../../headless/src/useToastQueue'
import { useToastQueue } from '../../headless/src/useToastQueue'
import { styled } from '../../stl-native/src/config/styled'

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const ToastViewportFrame = styled(
  View,
  {
    position: 'absolute',
    top: 56,
    left: 16,
    right: 16,
    gap: 8,
  },
  'ToastViewport',
)

const ToastRootFrame = styled(
  View,
  {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '$min',
    borderRadius: '$3',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '$neutral4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  'ToastRoot',
)

const ToastTitleFrame = styled(
  RNText,
  {
    fontSize: 14,
    fontWeight: '600',
    color: '$defaultBody',
  },
  'ToastTitle',
)

const ToastDescriptionFrame = styled(
  RNText,
  {
    fontSize: 12,
    color: '$color3',
    marginTop: 2,
  },
  'ToastDescription',
)

const ToastCloseFrame = styled(
  Pressable,
  {
    marginLeft: 'auto',
    paddingLeft: 12,
    pressed: { opacity: 0.85 },
  },
  'ToastClose',
)

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface ToastContextValue {
  toasts: ToastType[]
  add: UseToastQueueReturn['add']
  remove: UseToastQueueReturn['remove']
}

const ToastContext = createContext<ToastContextValue>({
  toasts: [],
  add: () => '',
  remove: () => {},
})

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useNativeToast() {
  const { add, remove } = useContext(ToastContext)
  return { add, remove }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ToastProvider({ children }: { children: React.ReactNode }) {
  const queue = useToastQueue()
  return <ToastContext.Provider value={queue}>{children}</ToastContext.Provider>
}

function ToastRoot({
  children,
  toast,
  style,
}: {
  children?: React.ReactNode
  toast?: ToastType
  style?: ViewStyle
}) {
  return (
    <ToastRootFrame
      style={style}
      accessibilityRole="alert"
      accessibilityState={{ busy: false }}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </ToastRootFrame>
  )
}

function ToastTitle({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return <ToastTitleFrame style={style}>{children}</ToastTitleFrame>
}

function ToastDescription({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return <ToastDescriptionFrame style={style}>{children}</ToastDescriptionFrame>
}

function ToastClose({
  children,
  toastId,
  style,
}: {
  children?: React.ReactNode
  toastId?: string
  style?: ViewStyle
}) {
  const { remove } = useContext(ToastContext)
  return (
    <ToastCloseFrame
      onPress={() => toastId && remove(toastId)}
      style={style}
      accessibilityRole="button"
      accessibilityLabel="Dismiss notification"
    >
      {children ?? <RNText style={{ fontSize: 14, color: '$color3' }}>✕</RNText>}
    </ToastCloseFrame>
  )
}

function ToastViewport({
  style,
  renderToast,
}: {
  style?: ViewStyle
  renderToast?: (toast: ToastType) => React.ReactNode
}) {
  const { toasts, remove } = useContext(ToastContext)

  if (toasts.length === 0) return null

  return (
    <ToastViewportFrame style={style} pointerEvents="box-none">
      {toasts.map((toast) =>
        renderToast ? (
          <React.Fragment key={toast.id}>{renderToast(toast)}</React.Fragment>
        ) : (
          <ToastRootFrame key={toast.id} accessibilityRole="alert">
            <View style={{ flex: 1 }}>
              <ToastTitleFrame>{toast.message}</ToastTitleFrame>
            </View>
            <ToastCloseFrame
              onPress={() => remove(toast.id)}
              accessibilityRole="button"
              accessibilityLabel="Dismiss notification"
            >
              <RNText style={{ fontSize: 14, color: '$color3' }}>✕</RNText>
            </ToastCloseFrame>
          </ToastRootFrame>
        ),
      )}
    </ToastViewportFrame>
  )
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const Toast = Object.assign(ToastProvider, {
  Provider: ToastProvider,
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Close: ToastClose,
  Viewport: ToastViewport,
})
