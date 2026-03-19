import type React from 'react'
import { createContext, useContext } from 'react'
import type { ViewStyle } from 'react-native'
import { Modal, Pressable, Text as RNText, View } from 'react-native'
import type { UseDisclosureProps } from '../../headless/src/useDisclosure'
import { useDisclosure } from '../../headless/src/useDisclosure'
import { styled } from '../../stl-native/src/config/styled'

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const DialogOverlayFrame = styled(
  View,
  {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  'DialogOverlay',
)

const DialogContentFrame = styled(
  View,
  {
    backgroundColor: '$min',
    borderRadius: '$3',
    paddingHorizontal: 24,
    paddingVertical: 20,
    width: '90%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  'DialogContent',
)

const DialogHeaderFrame = styled(
  View,
  {
    marginBottom: 12,
  },
  'DialogHeader',
)

const DialogFooterFrame = styled(
  View,
  {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  'DialogFooter',
)

const DialogTitleFrame = styled(
  RNText,
  {
    fontSize: 18,
    fontWeight: '600',
    color: '$defaultBody',
  },
  'DialogTitle',
)

const DialogDescriptionFrame = styled(
  RNText,
  {
    fontSize: 14,
    color: '$color3',
    marginTop: 4,
  },
  'DialogDescription',
)

const DialogCloseFrame = styled(
  Pressable,
  {
    alignSelf: 'flex-end',
    padding: 4,
    pressed: { opacity: 0.85 },
  },
  'DialogClose',
)

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface DialogContextValue {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

const DialogContext = createContext<DialogContextValue>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  onToggle: () => {},
})

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function DialogRoot({
  children,
  ...disclosureProps
}: { children: React.ReactNode } & UseDisclosureProps) {
  const disclosure = useDisclosure(disclosureProps)
  return <DialogContext.Provider value={disclosure}>{children}</DialogContext.Provider>
}

function DialogTrigger({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  const { onOpen } = useContext(DialogContext)
  return (
    <Pressable onPress={onOpen} style={style} accessibilityRole="button">
      {children}
    </Pressable>
  )
}

function DialogContent({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  const { isOpen, onClose } = useContext(DialogContext)
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <DialogOverlayFrame>
        <Pressable
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          onPress={onClose}
          accessibilityRole="none"
        />
        <DialogContentFrame style={style} accessibilityRole="alert">
          {children}
        </DialogContentFrame>
      </DialogOverlayFrame>
    </Modal>
  )
}

function DialogHeader({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return <DialogHeaderFrame style={style}>{children}</DialogHeaderFrame>
}

function DialogFooter({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return <DialogFooterFrame style={style}>{children}</DialogFooterFrame>
}

function DialogTitle({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return (
    <DialogTitleFrame style={style} accessibilityRole="header">
      {children}
    </DialogTitleFrame>
  )
}

function DialogDescription({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return <DialogDescriptionFrame style={style}>{children}</DialogDescriptionFrame>
}

function DialogClose({
  children,
  style,
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  const { onClose } = useContext(DialogContext)
  return (
    <DialogCloseFrame
      onPress={onClose}
      style={style}
      accessibilityRole="button"
      accessibilityLabel="Close dialog"
    >
      {children ?? <RNText style={{ fontSize: 16, color: '$defaultBody' }}>✕</RNText>}
    </DialogCloseFrame>
  )
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
})
