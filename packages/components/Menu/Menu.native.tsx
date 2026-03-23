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
import { Pressable, Text as RNText, View } from 'react-native'
import type { LayoutRectangle, ViewStyle } from 'react-native'
import { useDisclosure } from '../../headless/src/useDisclosure'
import { styled } from '../../stl-native/src/config/styled'
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

interface MenuContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<View | null>
  triggerLayout: React.MutableRefObject<LayoutRectangle | null>
}

const MenuContext = createContext<MenuContextValue | null>(null)

function useMenuContext() {
  const ctx = useContext(MenuContext)
  if (!ctx) throw new Error('Menu compounds must be used within Menu.Root')
  return ctx
}

interface SubMenuContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const SubMenuContext = createContext<SubMenuContextValue | null>(null)

function useSubMenuContext() {
  const ctx = useContext(SubMenuContext)
  if (!ctx) throw new Error('Menu.SubTrigger/SubContent must be used within Menu.Sub')
  return ctx
}

// ─── Styled ─────────────────────────────────────────────────────────────────

const StyledTrigger = styled(Pressable, {
  pressed: { opacity: 0.7 },
}, {}, 'MenuTrigger')

const StyledSubTrigger = styled(Pressable, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  paddingHorizontal: 8,
  paddingVertical: 6,
  marginHorizontal: 4,
  borderRadius: 2,
  hovered: { backgroundColor: '$neutral4' },
  pressed: { backgroundColor: '$neutral4' },
}, {}, 'MenuSubTrigger')

// ─── Root ───────────────────────────────────────────────────────────────────

export interface MenuRootProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const MenuRoot = forwardRef<View, MenuRootProps>(
  ({ children, open, defaultOpen, onOpenChange: onOpenChangeProp }, _ref) => {
    const disclosure = useDisclosure({ open, defaultOpen, onOpenChange: onOpenChangeProp })
    const triggerRef = useRef<View>(null)
    const triggerLayout = useRef<LayoutRectangle | null>(null)

    const onOpenChange = useCallback(
      (next: boolean) => {
        if (next) disclosure.onOpen()
        else disclosure.onClose()
      },
      [disclosure],
    )

    const ctx = useMemo(
      () => ({ isOpen: disclosure.isOpen, onOpenChange, triggerRef, triggerLayout }),
      [disclosure.isOpen, onOpenChange],
    )

    return <MenuContext.Provider value={ctx}>{children}</MenuContext.Provider>
  },
)
MenuRoot.displayName = 'Menu.Root'

// ─── Trigger ────────────────────────────────────────────────────────────────

const MenuTrigger = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => {
    const { isOpen, onOpenChange, triggerRef, triggerLayout } = useMenuContext()

    const handlePress = useCallback(() => {
      triggerRef.current?.measureInWindow((x, y, w, h) => {
        triggerLayout.current = { x, y, width: w, height: h }
        onOpenChange(!isOpen)
      })
    }, [isOpen, onOpenChange, triggerRef, triggerLayout])

    return (
      <StyledTrigger
        ref={(node: View | null) => {
          ;(triggerRef as any).current = node
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
MenuTrigger.displayName = 'Menu.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

const MenuContent = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => {
    const { isOpen, onOpenChange, triggerLayout } = useMenuContext()

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
MenuContent.displayName = 'Menu.Content'

// ─── Item ───────────────────────────────────────────────────────────────────

const MenuItem = forwardRef<View, { children: ReactNode; onSelect?: () => void; disabled?: boolean; style?: ViewStyle }>(
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
MenuItem.displayName = 'Menu.Item'

// ─── CheckboxItem ───────────────────────────────────────────────────────────

const MenuCheckboxItem = forwardRef<View, { children: ReactNode; checked: boolean; onCheckedChange: (c: boolean) => void; disabled?: boolean; style?: ViewStyle }>(
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
MenuCheckboxItem.displayName = 'Menu.CheckboxItem'

// ─── RadioGroup ─────────────────────────────────────────────────────────────

const MenuRadioGroup = forwardRef<View, { children: ReactNode; value: string; onValueChange: (v: string) => void; style?: ViewStyle }>(
  (props, ref) => <NativeRadioGroupProvider ref={ref} {...props} />,
)
MenuRadioGroup.displayName = 'Menu.RadioGroup'

// ─── RadioItem ──────────────────────────────────────────────────────────────

const MenuRadioItem = forwardRef<View, { children: ReactNode; value: string; disabled?: boolean; style?: ViewStyle }>(
  ({ children, value, disabled = false, ...rest }, ref) => {
    const radioCtx = useRadioGroupContext()
    const isChecked = radioCtx?.value === value

    const handlePress = useCallback(() => {
      if (!disabled) radioCtx?.onValueChange(value)
    }, [disabled, radioCtx, value])

    return (
      <MenuItemView ref={ref} onPress={handlePress} disabled={disabled} accessibilityRole="radio" accessibilityState={{ checked: isChecked, disabled }} {...rest}>
        <CheckIndicatorView>{isChecked && <RNText style={{ fontSize: 10 }}>●</RNText>}</CheckIndicatorView>
        {typeof children === 'string' ? <MenuItemText>{children}</MenuItemText> : children}
      </MenuItemView>
    )
  },
)
MenuRadioItem.displayName = 'Menu.RadioItem'

// ─── Group ──────────────────────────────────────────────────────────────────

const MenuGroup = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => <View ref={ref} accessibilityRole="none" {...props} />,
)
MenuGroup.displayName = 'Menu.Group'

// ─── Label ──────────────────────────────────────────────────────────────────

const MenuLabel = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => (
    <MenuLabelView ref={ref} {...rest}>
      {typeof children === 'string' ? <MenuLabelText>{children}</MenuLabelText> : children}
    </MenuLabelView>
  ),
)
MenuLabel.displayName = 'Menu.Label'

// ─── Separator ──────────────────────────────────────────────────────────────

const MenuSeparator = forwardRef<View, { style?: ViewStyle }>(
  (props, ref) => <MenuSeparatorView ref={ref} accessibilityRole="none" {...props} />,
)
MenuSeparator.displayName = 'Menu.Separator'

// ─── Shortcut (web-only) ───────────────────────────────────────────────────

const MenuShortcut = forwardRef<View>((_props, _ref) => {
  if (__DEV__) console.warn('Menu.Shortcut is web-only on React Native')
  return null
})
MenuShortcut.displayName = 'Menu.Shortcut'

// ─── Sub ────────────────────────────────────────────────────────────────────

const MenuSub = forwardRef<View, { children: ReactNode; open?: boolean; defaultOpen?: boolean; onOpenChange?: (o: boolean) => void }>(
  ({ children, open, defaultOpen, onOpenChange: onOpenChangeProp }, _ref) => {
    const disclosure = useDisclosure({ open, defaultOpen, onOpenChange: onOpenChangeProp })
    const ctx = useMemo(
      () => ({
        isOpen: disclosure.isOpen,
        onOpenChange: (next: boolean) => { if (next) disclosure.onOpen(); else disclosure.onClose() },
      }),
      [disclosure],
    )
    return <SubMenuContext.Provider value={ctx}>{children}</SubMenuContext.Provider>
  },
)
MenuSub.displayName = 'Menu.Sub'

// ─── SubTrigger ─────────────────────────────────────────────────────────────

const MenuSubTrigger = forwardRef<View, { children: ReactNode; disabled?: boolean; style?: ViewStyle }>(
  ({ children, disabled = false, ...rest }, ref) => {
    const subCtx = useSubMenuContext()

    const handlePress = useCallback(() => {
      if (!disabled) subCtx.onOpenChange(!subCtx.isOpen)
    }, [disabled, subCtx])

    return (
      <StyledSubTrigger ref={ref} onPress={handlePress} disabled={disabled} accessibilityRole="button" accessibilityState={{ expanded: subCtx.isOpen, disabled }} {...rest}>
        <View style={{ flex: 1 }}>
          {typeof children === 'string' ? <MenuItemText>{children}</MenuItemText> : children}
        </View>
        <RNText style={{ fontSize: 12, color: '$neutral7' }}>▶</RNText>
      </StyledSubTrigger>
    )
  },
)
MenuSubTrigger.displayName = 'Menu.SubTrigger'

// ─── SubContent ─────────────────────────────────────────────────────────────

const MenuSubContent = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, style, ...rest }, ref) => {
    const subCtx = useSubMenuContext()
    if (!subCtx.isOpen) return null
    return (
      <View ref={ref} style={[{ paddingLeft: 12 }, style]} accessibilityRole="menu" {...rest}>
        {children}
      </View>
    )
  },
)
MenuSubContent.displayName = 'Menu.SubContent'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Menu = Object.assign(MenuRoot, {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  CheckboxItem: MenuCheckboxItem,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Group: MenuGroup,
  Label: MenuLabel,
  Separator: MenuSeparator,
  Shortcut: MenuShortcut,
  Sub: MenuSub,
  SubTrigger: MenuSubTrigger,
  SubContent: MenuSubContent,
})
