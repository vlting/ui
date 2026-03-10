import React, { createContext, useContext } from 'react'
import { View, Text as RNText, Pressable, Modal } from 'react-native'
import type { ViewStyle } from 'react-native'
import { styled } from '../../stl-native/src/config/styled'
import { useDisclosure } from '../../stl-headless/src/useDisclosure'
import type { UseDisclosureProps } from '../../stl-headless/src/useDisclosure'

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const SheetOverlayFrame = styled(
  View,
  {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  'SheetOverlay',
)

const SheetContentFrame = styled(
  View,
  {
    backgroundColor: '$background',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  'SheetContent',
)

const SheetHandleFrame = styled(
  View,
  {
    width: 36,
    height: 4,
    borderRadius: '$3',
    backgroundColor: '$color3',
    alignSelf: 'center',
    marginBottom: 12,
  },
  'SheetHandle',
)

const SheetHeaderFrame = styled(
  View,
  {
    marginBottom: 12,
  },
  'SheetHeader',
)

const SheetFooterFrame = styled(
  View,
  {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  'SheetFooter',
)

const SheetTitleFrame = styled(
  RNText,
  {
    fontSize: 18,
    fontWeight: '600',
    color: '$defaultBody',
  },
  'SheetTitle',
)

const SheetDescriptionFrame = styled(
  RNText,
  {
    fontSize: 14,
    color: '$color3',
    marginTop: 4,
  },
  'SheetDescription',
)

const SheetCloseFrame = styled(
  Pressable,
  {
    alignSelf: 'flex-end',
    padding: 4,
    pressed: { opacity: 0.85 },
  },
  'SheetClose',
)

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface SheetContextValue {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

const SheetContext = createContext<SheetContextValue>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  onToggle: () => {},
})

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SheetRoot({
  children,
  ...disclosureProps
}: { children: React.ReactNode } & UseDisclosureProps) {
  const disclosure = useDisclosure(disclosureProps)
  return <SheetContext.Provider value={disclosure}>{children}</SheetContext.Provider>
}

function SheetTrigger({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  const { onOpen } = useContext(SheetContext)
  return (
    <Pressable onPress={onOpen} style={style} accessibilityRole="button">
      {children}
    </Pressable>
  )
}

function SheetContent({
  children,
  showHandle = true,
  style,
}: {
  children?: React.ReactNode
  showHandle?: boolean
  style?: ViewStyle
}) {
  const { isOpen, onClose } = useContext(SheetContext)
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <SheetOverlayFrame>
        <Pressable
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          onPress={onClose}
          accessibilityRole="none"
        />
        <SheetContentFrame style={style}>
          {showHandle && <SheetHandleFrame />}
          {children}
        </SheetContentFrame>
      </SheetOverlayFrame>
    </Modal>
  )
}

function SheetHeader({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return <SheetHeaderFrame style={style}>{children}</SheetHeaderFrame>
}

function SheetFooter({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return <SheetFooterFrame style={style}>{children}</SheetFooterFrame>
}

function SheetTitle({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return (
    <SheetTitleFrame style={style} accessibilityRole="header">
      {children}
    </SheetTitleFrame>
  )
}

function SheetDescription({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return <SheetDescriptionFrame style={style}>{children}</SheetDescriptionFrame>
}

function SheetClose({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  const { onClose } = useContext(SheetContext)
  return (
    <SheetCloseFrame
      onPress={onClose}
      style={style}
      accessibilityRole="button"
      accessibilityLabel="Close sheet"
    >
      {children ?? <RNText style={{ fontSize: 16, color: '$defaultBody' }}>✕</RNText>}
    </SheetCloseFrame>
  )
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const Sheet = Object.assign(SheetRoot, {
  Root: SheetRoot,
  Trigger: SheetTrigger,
  Content: SheetContent,
  Header: SheetHeader,
  Footer: SheetFooter,
  Title: SheetTitle,
  Description: SheetDescription,
  Close: SheetClose,
})
