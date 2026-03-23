import {
  type ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react'
import {
  Pressable as RNPressable,
  Text as RNText,
  View,
} from 'react-native'
import type { LayoutRectangle, ViewStyle } from 'react-native'
import { useDisclosure } from '../../headless/src/useDisclosure'
import { styled } from '../../stl-native/src/config'
import {
  CheckIndicatorView,
  MenuItemText,
  MenuItemView,
  MenuLabelText,
  MenuLabelView,
  MenuSeparatorView,
  NativeMenuOverlay,
  NativeRadioGroupProvider,
  useMenuContentContext,
  useRadioGroupContext,
} from '../_NativeMenuPrimitives'

// ─── Context ────────────────────────────────────────────────────────────────

interface DropdownMenuContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<View | null>
  triggerLayout: React.MutableRefObject<LayoutRectangle | null>
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

function useDropdownMenuContext() {
  const ctx = useContext(DropdownMenuContext)
  if (!ctx) throw new Error('DropdownMenu compounds must be used within DropdownMenu.Root')
  return ctx
}

// ─── Styled ─────────────────────────────────────────────────────────────────

const StyledTrigger = styled(RNPressable, {
  pressed: { opacity: 0.7 },
}, {}, 'DropdownMenuTrigger')

// ─── Root ───────────────────────────────────────────────────────────────────

export interface DropdownMenuRootProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const DropdownMenuRoot = forwardRef<View, DropdownMenuRootProps>(
  ({ children, open, defaultOpen, onOpenChange: onOpenChangeProp }, _ref) => {
    const disclosure = useDisclosure({ open, defaultOpen, onOpenChange: onOpenChangeProp })
    const triggerRef = useRef<View>(null)
    const triggerLayout = useRef<LayoutRectangle | null>(null)

    const onOpenChange = useCallback(
      (next: boolean) => { next ? disclosure.onOpen() : disclosure.onClose() },
      [disclosure],
    )

    const ctx = useMemo(
      () => ({ isOpen: disclosure.isOpen, onOpenChange, triggerRef, triggerLayout }),
      [disclosure.isOpen, onOpenChange],
    )

    return <DropdownMenuContext.Provider value={ctx}>{children}</DropdownMenuContext.Provider>
  },
)
DropdownMenuRoot.displayName = 'DropdownMenu.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

const DropdownMenuTrigger = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => {
    const { isOpen, onOpenChange, triggerRef, triggerLayout } = useDropdownMenuContext()

    const handlePress = useCallback(() => {
      triggerRef.current?.measureInWindow((x, y, w, h) => {
        triggerLayout.current = { x, y, width: w, height: h }
        onOpenChange(!isOpen)
      })
    }, [isOpen, onOpenChange, triggerRef, triggerLayout])

    return (
      <StyledTrigger
        ref={(node: View | null) => {
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
      </StyledTrigger>
    )
  },
)
DropdownMenuTrigger.displayName = 'DropdownMenu.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

const DropdownMenuContent = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => {
    const { isOpen, onOpenChange, triggerLayout } = useDropdownMenuContext()

    return (
      <NativeMenuOverlay
        ref={ref}
        visible={isOpen}
        onClose={() => onOpenChange(false)}
        triggerLayout={triggerLayout.current}
        {...rest}
      >
        {children}
      </NativeMenuOverlay>
    )
  },
)
DropdownMenuContent.displayName = 'DropdownMenu.Content'

// ─── Item ───────────────────────────────────────────────────────────────────

export interface DropdownMenuItemProps {
  children: ReactNode
  disabled?: boolean
  onSelect?: () => void
  style?: ViewStyle
}

const DropdownMenuItem = forwardRef<View, DropdownMenuItemProps>(
  ({ children, disabled = false, onSelect, ...rest }, ref) => {
    const { onClose } = useMenuContentContext()

    return (
      <MenuItemView
        ref={ref}
        disabled={disabled || undefined}
        accessibilityRole="menuitem"
        accessibilityState={{ disabled }}
        onPress={() => {
          if (disabled) return
          onSelect?.()
          onClose()
        }}
        {...rest}
      >
        {typeof children === 'string' ? <MenuItemText>{children}</MenuItemText> : children}
      </MenuItemView>
    )
  },
)
DropdownMenuItem.displayName = 'DropdownMenu.Item'

// ─── CheckboxItem ───────────────────────────────────────────────────────────

export interface DropdownMenuCheckboxItemProps {
  children: ReactNode
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  style?: ViewStyle
}

const DropdownMenuCheckboxItem = forwardRef<View, DropdownMenuCheckboxItemProps>(
  ({ children, checked, onCheckedChange, disabled = false, ...rest }, ref) => (
    <MenuItemView
      ref={ref}
      disabled={disabled || undefined}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      onPress={() => {
        if (disabled) return
        onCheckedChange(!checked)
      }}
      {...rest}
    >
      <CheckIndicatorView>
        {checked && <RNText style={{ fontSize: 12 }}>✓</RNText>}
      </CheckIndicatorView>
      {typeof children === 'string' ? <MenuItemText>{children}</MenuItemText> : children}
    </MenuItemView>
  ),
)
DropdownMenuCheckboxItem.displayName = 'DropdownMenu.CheckboxItem'

// ─── RadioGroup ─────────────────────────────────────────────────────────────

const DropdownMenuRadioGroup = NativeRadioGroupProvider
DropdownMenuRadioGroup.displayName = 'DropdownMenu.RadioGroup'

// ─── RadioItem ──────────────────────────────────────────────────────────────

export interface DropdownMenuRadioItemProps {
  children: ReactNode
  value: string
  disabled?: boolean
  style?: ViewStyle
}

const DropdownMenuRadioItem = forwardRef<View, DropdownMenuRadioItemProps>(
  ({ children, value, disabled = false, ...rest }, ref) => {
    const radioCtx = useRadioGroupContext()
    const isChecked = radioCtx?.value === value

    return (
      <MenuItemView
        ref={ref}
        disabled={disabled || undefined}
        accessibilityRole="radio"
        accessibilityState={{ checked: isChecked, disabled }}
        onPress={() => {
          if (disabled) return
          radioCtx?.onValueChange(value)
        }}
        {...rest}
      >
        <CheckIndicatorView>
          {isChecked && <RNText style={{ fontSize: 10 }}>●</RNText>}
        </CheckIndicatorView>
        {typeof children === 'string' ? <MenuItemText>{children}</MenuItemText> : children}
      </MenuItemView>
    )
  },
)
DropdownMenuRadioItem.displayName = 'DropdownMenu.RadioItem'

// ─── Group ──────────────────────────────────────────────────────────────────

const DropdownMenuGroup = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => <View ref={ref} accessibilityRole="none" {...props} />,
)
DropdownMenuGroup.displayName = 'DropdownMenu.Group'

// ─── Label ──────────────────────────────────────────────────────────────────

const DropdownMenuLabel = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => (
    <MenuLabelView ref={ref} {...rest}>
      {typeof children === 'string' ? <MenuLabelText>{children}</MenuLabelText> : children}
    </MenuLabelView>
  ),
)
DropdownMenuLabel.displayName = 'DropdownMenu.Label'

// ─── Separator ──────────────────────────────────────────────────────────────

const DropdownMenuSeparator = forwardRef<View, { style?: ViewStyle }>(
  (props, ref) => <MenuSeparatorView ref={ref} accessibilityRole="none" {...props} />,
)
DropdownMenuSeparator.displayName = 'DropdownMenu.Separator'

// ─── Shortcut (web-only) ────────────────────────────────────────────────────

const DropdownMenuShortcut = forwardRef<View>((_props, _ref) => {
  if (__DEV__) console.warn('DropdownMenu.Shortcut is web-only on React Native')
  return null
})
DropdownMenuShortcut.displayName = 'DropdownMenu.Shortcut'

// ─── Export ─────────────────────────────────────────────────────────────────

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Group: DropdownMenuGroup,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
})
