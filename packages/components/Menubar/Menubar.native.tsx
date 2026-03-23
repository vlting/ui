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
import { Pressable, ScrollView, Text as RNText, View } from 'react-native'
import type { LayoutRectangle, ViewStyle } from 'react-native'
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

interface MenubarContextValue {
  openMenuId: string | null
  setOpenMenuId: (id: string | null) => void
}

const MenubarContext = createContext<MenubarContextValue | null>(null)

function useMenubarContext() {
  const ctx = useContext(MenubarContext)
  if (!ctx) throw new Error('Menubar compounds must be used within Menubar.Root')
  return ctx
}

interface MenubarMenuContextValue {
  menuId: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<View | null>
  triggerLayout: React.MutableRefObject<LayoutRectangle | null>
}

const MenubarMenuContext = createContext<MenubarMenuContextValue | null>(null)

function useMenubarMenuContext() {
  const ctx = useContext(MenubarMenuContext)
  if (!ctx) throw new Error('Menubar.Trigger/Content must be used within Menubar.Menu')
  return ctx
}

interface SubMenuContextValue {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const SubMenuContext = createContext<SubMenuContextValue | null>(null)

function useSubMenuContext() {
  const ctx = useContext(SubMenuContext)
  if (!ctx) throw new Error('Menubar.SubTrigger/SubContent must be used within Menubar.Sub')
  return ctx
}

// ─── Styled ─────────────────────────────────────────────────────────────────

const StyledRoot = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  backgroundColor: '$surface1',
  borderRadius: 8,
  padding: 4,
  borderWidth: 1,
  borderColor: '$neutral5',
}, {}, 'MenubarRoot')

const StyledTrigger = styled(Pressable, {
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 4,
  hovered: { backgroundColor: '$neutral4' },
  pressed: { backgroundColor: '$neutral4' },
}, {
  active: {
    true: { backgroundColor: '$neutral4' },
  },
}, 'MenubarTrigger')

const StyledTriggerText = styled(RNText, {
  fontSize: 13,
  fontWeight: '500',
  color: '$neutralText3',
}, {}, 'MenubarTriggerText')

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
}, {}, 'MenubarSubTrigger')

// ─── Root ───────────────────────────────────────────────────────────────────

let menuCounter = 0

const MenubarRoot = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)

    const ctx = useMemo(
      () => ({ openMenuId, setOpenMenuId }),
      [openMenuId],
    )

    return (
      <MenubarContext.Provider value={ctx}>
        <StyledRoot ref={ref} accessibilityRole="menubar" {...rest}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 4 }}>
            {children}
          </ScrollView>
        </StyledRoot>
      </MenubarContext.Provider>
    )
  },
)
MenubarRoot.displayName = 'Menubar.Root'

// ─── Menu ───────────────────────────────────────────────────────────────────

const MenubarMenu = forwardRef<View, { children: ReactNode }>(
  ({ children }, _ref) => {
    const menuId = useRef(`menubar-menu-${++menuCounter}`).current
    const barCtx = useMenubarContext()
    const triggerRef = useRef<View>(null)
    const triggerLayout = useRef<LayoutRectangle | null>(null)
    const isOpen = barCtx.openMenuId === menuId

    const onOpenChange = useCallback(
      (next: boolean) => barCtx.setOpenMenuId(next ? menuId : null),
      [barCtx, menuId],
    )

    const ctx = useMemo(
      () => ({ menuId, isOpen, onOpenChange, triggerRef, triggerLayout }),
      [menuId, isOpen, onOpenChange],
    )

    return <MenubarMenuContext.Provider value={ctx}>{children}</MenubarMenuContext.Provider>
  },
)
MenubarMenu.displayName = 'Menubar.Menu'

// ─── Trigger ────────────────────────────────────────────────────────────────

const MenubarTrigger = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => {
    const menuCtx = useMenubarMenuContext()

    const handlePress = useCallback(() => {
      menuCtx.triggerRef.current?.measureInWindow((x, y, w, h) => {
        menuCtx.triggerLayout.current = { x, y, width: w, height: h }
        menuCtx.onOpenChange(!menuCtx.isOpen)
      })
    }, [menuCtx])

    return (
      <StyledTrigger
        ref={(node: View | null) => {
          ;(menuCtx.triggerRef as any).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as any).current = node
        }}
        onPress={handlePress}
        active={menuCtx.isOpen}
        accessibilityRole="button"
        accessibilityState={{ expanded: menuCtx.isOpen }}
        {...rest}
      >
        {typeof children === 'string' ? <StyledTriggerText>{children}</StyledTriggerText> : children}
      </StyledTrigger>
    )
  },
)
MenubarTrigger.displayName = 'Menubar.Trigger'

// ─── Content ────────────────────────────────────────────────────────────────

const MenubarContent = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => {
    const menuCtx = useMenubarMenuContext()

    return (
      <NativeMenuOverlay
        ref={ref}
        visible={menuCtx.isOpen}
        onClose={() => menuCtx.onOpenChange(false)}
        triggerLayout={menuCtx.triggerLayout.current}
        {...rest}
      >
        {children}
      </NativeMenuOverlay>
    )
  },
)
MenubarContent.displayName = 'Menubar.Content'

// ─── Item ───────────────────────────────────────────────────────────────────

const MenubarItem = forwardRef<View, { children: ReactNode; onSelect?: () => void; disabled?: boolean; style?: ViewStyle }>(
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
MenubarItem.displayName = 'Menubar.Item'

// ─── CheckboxItem ───────────────────────────────────────────────────────────

const MenubarCheckboxItem = forwardRef<View, { children: ReactNode; checked: boolean; onCheckedChange: (c: boolean) => void; disabled?: boolean; style?: ViewStyle }>(
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
MenubarCheckboxItem.displayName = 'Menubar.CheckboxItem'

// ─── RadioGroup ─────────────────────────────────────────────────────────────

const MenubarRadioGroup = forwardRef<View, { children: ReactNode; value: string; onValueChange: (v: string) => void; style?: ViewStyle }>(
  (props, ref) => <NativeRadioGroupProvider ref={ref} {...props} />,
)
MenubarRadioGroup.displayName = 'Menubar.RadioGroup'

// ─── RadioItem ──────────────────────────────────────────────────────────────

const MenubarRadioItem = forwardRef<View, { children: ReactNode; value: string; disabled?: boolean; style?: ViewStyle }>(
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
MenubarRadioItem.displayName = 'Menubar.RadioItem'

// ─── Group ──────────────────────────────────────────────────────────────────

const MenubarGroup = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  (props, ref) => <View ref={ref} accessibilityRole="none" {...props} />,
)
MenubarGroup.displayName = 'Menubar.Group'

// ─── Label ──────────────────────────────────────────────────────────────────

const MenubarLabel = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
  ({ children, ...rest }, ref) => (
    <MenuLabelView ref={ref} {...rest}>
      {typeof children === 'string' ? <MenuLabelText>{children}</MenuLabelText> : children}
    </MenuLabelView>
  ),
)
MenubarLabel.displayName = 'Menubar.Label'

// ─── Separator ──────────────────────────────────────────────────────────────

const MenubarSeparator = forwardRef<View, { style?: ViewStyle }>(
  (props, ref) => <MenuSeparatorView ref={ref} accessibilityRole="none" {...props} />,
)
MenubarSeparator.displayName = 'Menubar.Separator'

// ─── Shortcut (web-only) ───────────────────────────────────────────────────

const MenubarShortcut = forwardRef<View>((_props, _ref) => {
  if (__DEV__) console.warn('Menubar.Shortcut is web-only on React Native')
  return null
})
MenubarShortcut.displayName = 'Menubar.Shortcut'

// ─── Sub ────────────────────────────────────────────────────────────────────

const MenubarSub = forwardRef<View, { children: ReactNode }>(
  ({ children }, _ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const ctx = useMemo(() => ({ isOpen, onOpenChange: setIsOpen }), [isOpen])
    return <SubMenuContext.Provider value={ctx}>{children}</SubMenuContext.Provider>
  },
)
MenubarSub.displayName = 'Menubar.Sub'

// ─── SubTrigger ─────────────────────────────────────────────────────────────

const MenubarSubTrigger = forwardRef<View, { children: ReactNode; disabled?: boolean; style?: ViewStyle }>(
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
MenubarSubTrigger.displayName = 'Menubar.SubTrigger'

// ─── SubContent ─────────────────────────────────────────────────────────────

const MenubarSubContent = forwardRef<View, { children: ReactNode; style?: ViewStyle }>(
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
MenubarSubContent.displayName = 'Menubar.SubContent'

// ─── Export ─────────────────────────────────────────────────────────────────

export const Menubar = Object.assign(MenubarRoot, {
  Root: MenubarRoot,
  Menu: MenubarMenu,
  Trigger: MenubarTrigger,
  Content: MenubarContent,
  Item: MenubarItem,
  CheckboxItem: MenubarCheckboxItem,
  RadioGroup: MenubarRadioGroup,
  RadioItem: MenubarRadioItem,
  Group: MenubarGroup,
  Label: MenubarLabel,
  Separator: MenubarSeparator,
  Shortcut: MenubarShortcut,
  Sub: MenubarSub,
  SubTrigger: MenubarSubTrigger,
  SubContent: MenubarSubContent,
})
