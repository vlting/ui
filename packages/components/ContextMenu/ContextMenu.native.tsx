import {
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { Pressable, Text as RNText, View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { useContextMenu } from '../../headless/src/useContextMenu.native'
import {
  CheckIndicatorView,
  MenuItemText,
  MenuItemView,
  MenuLabelText,
  MenuLabelView,
  MenuSeparatorView,
  NativeContextMenuOverlay,
  useMenuContentContext,
} from '../_NativeMenuPrimitives'

// ─── Context ────────────────────────────────────────────────────────────────

interface ContextMenuContextValue {
  isOpen: boolean
  position: { x: number; y: number }
  close: () => void
  getTriggerProps: () => {
    onLongPress: (e: { nativeEvent: { pageX: number; pageY: number } }) => void
  }
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

function useContextMenuContext() {
  const ctx = useContext(ContextMenuContext)
  if (!ctx) throw new Error('ContextMenu compounds must be used within ContextMenu.Root')
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface ContextMenuRootProps {
  children: ReactNode
  onOpenChange?: (open: boolean) => void
}

const ContextMenuRoot = forwardRef<View, ContextMenuRootProps>(
  ({ children, onOpenChange: onOpenChangeProp }, _ref) => {
    const contextMenu = useContextMenu({ onOpenChange: onOpenChangeProp })

    const ctx = useMemo(
      () => ({
        isOpen: contextMenu.isOpen,
        position: contextMenu.position,
        close: contextMenu.close,
        getTriggerProps: contextMenu.getTriggerProps,
      }),
      [contextMenu.isOpen, contextMenu.position, contextMenu.close, contextMenu.getTriggerProps],
    )

    return <ContextMenuContext.Provider value={ctx}>{children}</ContextMenuContext.Provider>
  },
)
ContextMenuRoot.displayName = 'ContextMenu.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

const ContextMenuTrigger = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => {
    const { getTriggerProps } = useContextMenuContext()
    const triggerProps = getTriggerProps()

    return (
      <Pressable ref={ref} {...triggerProps} {...rest}>
        {children}
      </Pressable>
    )
  },
)
ContextMenuTrigger.displayName = 'ContextMenu.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

const ContextMenuContent = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => {
    const { isOpen, position, close } = useContextMenuContext()

    return (
      <NativeContextMenuOverlay
        ref={ref}
        visible={isOpen}
        onClose={close}
        position={position}
        {...rest}
      >
        {children}
      </NativeContextMenuOverlay>
    )
  },
)
ContextMenuContent.displayName = 'ContextMenu.Content'

// ─── Item ───────────────────────────────────────────────────────────────────

const ContextMenuItem = forwardRef<View, { children: ReactNode; onSelect?: () => void; disabled?: boolean; style?: ViewStyle }>(
  ({ children, onSelect, disabled = false, ...rest }, ref) => {
    const contentCtx = useMenuContentContext()

    const handlePress = useCallback(() => {
      if (disabled) return
      onSelect?.()
      contentCtx.onClose()
    }, [disabled, onSelect, contentCtx])

    return (
      <MenuItemView ref={ref} onPress={handlePress} disabled={disabled} accessibilityRole="menuitem" accessibilityState={{ disabled }} {...rest}>
        {typeof children === 'string' ? <MenuItemText>{children}</MenuItemText> : children}
      </MenuItemView>
    )
  },
)
ContextMenuItem.displayName = 'ContextMenu.Item'

// ─── CheckboxItem ───────────────────────────────────────────────────────────

const ContextMenuCheckboxItem = forwardRef<View, { children: ReactNode; checked: boolean; onCheckedChange: (c: boolean) => void; disabled?: boolean; style?: ViewStyle }>(
  ({ children, checked, onCheckedChange, disabled = false, ...rest }, ref) => {
    const handlePress = useCallback(() => {
      if (!disabled) onCheckedChange(!checked)
    }, [disabled, checked, onCheckedChange])

    return (
      <MenuItemView ref={ref} onPress={handlePress} disabled={disabled} accessibilityRole="checkbox" accessibilityState={{ checked, disabled }} {...rest}>
        <CheckIndicatorView>{checked && <RNText style={{ fontSize: 12 }}>✓</RNText>}</CheckIndicatorView>
        {typeof children === 'string' ? <MenuItemText>{children}</MenuItemText> : children}
      </MenuItemView>
    )
  },
)
ContextMenuCheckboxItem.displayName = 'ContextMenu.CheckboxItem'

// ─── Group ──────────────────────────────────────────────────────────────────

const ContextMenuGroup = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => <View ref={ref} accessibilityRole="none" {...props} />,
)
ContextMenuGroup.displayName = 'ContextMenu.Group'

// ─── Label ──────────────────────────────────────────────────────────────────

const ContextMenuLabel = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => (
    <MenuLabelView ref={ref} {...rest}>
      {typeof children === 'string' ? <MenuLabelText>{children}</MenuLabelText> : children}
    </MenuLabelView>
  ),
)
ContextMenuLabel.displayName = 'ContextMenu.Label'

// ─── Separator ──────────────────────────────────────────────────────────────

const ContextMenuSeparator = forwardRef<View, { style?: ViewStyle }>(
  (props, ref) => <MenuSeparatorView ref={ref} accessibilityRole="none" {...props} />,
)
ContextMenuSeparator.displayName = 'ContextMenu.Separator'

// ─── Shortcut (web-only) ───────────────────────────────────────────────────

const ContextMenuShortcut = forwardRef<View>((_props, _ref) => {
  if (__DEV__) console.warn('ContextMenu.Shortcut is web-only on React Native')
  return null
})
ContextMenuShortcut.displayName = 'ContextMenu.Shortcut'

// ─── Export ─────────────────────────────────────────────────────────────────

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Root: ContextMenuRoot,
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  Group: ContextMenuGroup,
  Label: ContextMenuLabel,
  Separator: ContextMenuSeparator,
  Shortcut: ContextMenuShortcut,
})
