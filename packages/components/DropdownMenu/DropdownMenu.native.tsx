import React, { createContext, useCallback, useContext, useRef, useState } from 'react'
import type { LayoutRectangle, ViewStyle } from 'react-native'
import { Modal, Pressable, Text as RNText, View } from 'react-native'
import { styled } from '../../stl-native/src/config/styled'

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const DropdownMenuContentFrame = styled(
  View,
  {
    backgroundColor: '$background',
    borderRadius: '$3',
    borderWidth: 1,
    borderColor: '$borderColor',
    paddingVertical: 4,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  'DropdownMenuContent',
)

const DropdownMenuItemFrame = styled(
  Pressable,
  {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    pressed: { opacity: 0.85 },
  },
  {
    destructive: {
      true: {},
    },
  },
  'DropdownMenuItem',
)

const DropdownMenuItemTextFrame = styled(
  RNText,
  {
    fontSize: 14,
  },
  {
    destructive: {
      true: { color: '$tomato9' },
      false: { color: '$defaultBody' },
    },
  },
  'DropdownMenuItemText',
)

const DropdownMenuLabelFrame = styled(
  RNText,
  {
    fontSize: 12,
    fontWeight: '600',
    color: '$color3',
    paddingHorizontal: 16,
    paddingVertical: 6,
    textTransform: 'uppercase',
  },
  'DropdownMenuLabel',
)

const DropdownMenuSeparatorFrame = styled(
  View,
  {
    height: 1,
    backgroundColor: '$borderColor',
    marginVertical: 4,
    marginHorizontal: 8,
  },
  'DropdownMenuSeparator',
)

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface DropdownMenuContextValue {
  isOpen: boolean
  onClose: () => void
  triggerLayout: LayoutRectangle | null
}

const DropdownMenuContext = createContext<DropdownMenuContextValue>({
  isOpen: false,
  onClose: () => {},
  triggerLayout: null,
})

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function DropdownMenuRoot({
  children,
  style,
}: {
  children: React.ReactNode
  style?: ViewStyle
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null)
  const triggerRef = useRef<View>(null)

  const onOpen = useCallback(() => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height })
      setIsOpen(true)
    })
  }, [])

  const onClose = useCallback(() => setIsOpen(false), [])

  // Separate Trigger from other children
  const triggerChild = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child as React.ReactElement<any>).type === DropdownMenuTrigger,
  )
  const otherChildren = React.Children.toArray(children).filter(
    (child) =>
      !React.isValidElement(child) ||
      (child as React.ReactElement<any>).type !== DropdownMenuTrigger,
  )

  return (
    <DropdownMenuContext.Provider value={{ isOpen, onClose, triggerLayout }}>
      <View ref={triggerRef} style={style}>
        {triggerChild &&
          React.isValidElement(triggerChild) &&
          React.cloneElement(triggerChild as React.ReactElement<any>, {
            onPress: onOpen,
          })}
      </View>
      {otherChildren}
    </DropdownMenuContext.Provider>
  )
}

function DropdownMenuTrigger({
  children,
  onPress,
  style,
}: {
  children?: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
}) {
  return (
    <Pressable
      onPress={onPress}
      style={style}
      accessibilityRole="button"
      accessibilityState={{ expanded: false }}
    >
      {children}
    </Pressable>
  )
}

function DropdownMenuContent({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  const { isOpen, onClose, triggerLayout } = useContext(DropdownMenuContext)

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={{ flex: 1 }} onPress={onClose} accessibilityRole="none">
        <DropdownMenuContentFrame
          style={[
            {
              position: 'absolute',
              left: triggerLayout?.x ?? 0,
              top: (triggerLayout?.y ?? 0) + (triggerLayout?.height ?? 0) + 4,
            },
            style,
          ]}
          accessibilityRole="menu"
        >
          {children}
        </DropdownMenuContentFrame>
      </Pressable>
    </Modal>
  )
}

function DropdownMenuItem({
  children,
  onPress,
  destructive = false,
  disabled = false,
  style,
}: {
  children?: React.ReactNode
  onPress?: () => void
  destructive?: boolean
  disabled?: boolean
  style?: ViewStyle
}) {
  const { onClose } = useContext(DropdownMenuContext)

  const handlePress = useCallback(() => {
    onPress?.()
    onClose()
  }, [onPress, onClose])

  return (
    <DropdownMenuItemFrame
      onPress={disabled ? undefined : handlePress}
      destructive={destructive}
      style={[style, disabled && { opacity: 0.5 }]}
      accessibilityRole="menuitem"
      accessibilityState={{ disabled }}
    >
      {typeof children === 'string' ? (
        <DropdownMenuItemTextFrame destructive={destructive}>
          {children}
        </DropdownMenuItemTextFrame>
      ) : (
        children
      )}
    </DropdownMenuItemFrame>
  )
}

function DropdownMenuSeparator({ style }: { style?: ViewStyle }) {
  return <DropdownMenuSeparatorFrame style={style} />
}

function DropdownMenuLabel({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return <DropdownMenuLabelFrame style={style}>{children}</DropdownMenuLabelFrame>
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Separator: DropdownMenuSeparator,
  Label: DropdownMenuLabel,
})
