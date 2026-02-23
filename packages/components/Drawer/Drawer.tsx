import type { ComponentType } from 'react'
import React from 'react'
import { View, styled } from 'tamagui'
import { Dialog as TamaguiDialog } from '@tamagui/dialog'

type AnyFC = ComponentType<Record<string, unknown>>

// Cast for JSX usage — v2 RC GetFinalProps bug
const DialogRoot = TamaguiDialog as AnyFC
const DialogTrigger = TamaguiDialog.Trigger as AnyFC
const DialogPortal = TamaguiDialog.Portal as AnyFC
const DialogOverlay = TamaguiDialog.Overlay as AnyFC
const DialogContent = TamaguiDialog.Content as AnyFC
const DialogTitle = TamaguiDialog.Title as AnyFC
const DialogDescription = TamaguiDialog.Description as AnyFC
const DialogClose = TamaguiDialog.Close as AnyFC
const ViewJsx = View as AnyFC

// @ts-expect-error Tamagui v2 RC
const HandleBar = styled(View, {
  width: 48,
  height: 4,
  backgroundColor: '$color6',
  borderRadius: 9999,
  alignSelf: 'center',
  marginTop: 8,
  marginBottom: 8,
})

// @ts-expect-error Tamagui v2 RC
const DrawerHeaderFrame = styled(View, {
  paddingLeft: '$3.5',
  paddingRight: '$3.5',
  paddingTop: '$2',
  paddingBottom: '$2',
})

// @ts-expect-error Tamagui v2 RC
const DrawerFooterFrame = styled(View, {
  paddingLeft: '$3.5',
  paddingRight: '$3.5',
  paddingTop: '$2',
  paddingBottom: '$3.5',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: '$1.5',
})

const HandleBarJsx = HandleBar as AnyFC
const DrawerHeaderJsx = DrawerHeaderFrame as AnyFC
const DrawerFooterJsx = DrawerFooterFrame as AnyFC

const DIRECTION_STYLES = {
  bottom: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: '90vh',
  },
  top: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxHeight: '90vh',
  },
  left: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    bottom: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    maxWidth: '90vw',
    width: 360,
  },
  right: {
    position: 'fixed' as const,
    top: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    maxWidth: '90vw',
    width: 360,
  },
}

export interface DrawerRootProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  direction?: 'bottom' | 'top' | 'left' | 'right'
}

export interface DrawerContentProps {
  children: React.ReactNode
  direction?: 'bottom' | 'top' | 'left' | 'right'
}

const DrawerContext = React.createContext<{ direction: 'bottom' | 'top' | 'left' | 'right' }>({
  direction: 'bottom',
})

function Root({ children, open, onOpenChange, direction = 'bottom' }: DrawerRootProps) {
  return (
    <DrawerContext.Provider value={{ direction }}>
      <DialogRoot open={open} onOpenChange={onOpenChange} modal>
        {children}
      </DialogRoot>
    </DrawerContext.Provider>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  return <DialogTrigger asChild>{children}</DialogTrigger>
}

function Content({ children, direction: directionProp }: DrawerContentProps) {
  const ctx = React.useContext(DrawerContext)
  const direction = directionProp ?? ctx.direction
  const isVertical = direction === 'bottom' || direction === 'top'

  return (
    <DialogPortal>
      <DialogOverlay
        backgroundColor="rgba(0,0,0,0.4)"
        animation="medium"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <DialogContent
        backgroundColor="$background"
        borderWidth={1}
        borderColor="$borderColor"
        animation="medium"
        aria-describedby={undefined}
        style={DIRECTION_STYLES[direction]}
      >
        {isVertical && <HandleBarJsx />}
        {children}
      </DialogContent>
    </DialogPortal>
  )
}

function Header({ children }: { children: React.ReactNode }) {
  return <DrawerHeaderJsx>{children}</DrawerHeaderJsx>
}

function Footer({ children }: { children: React.ReactNode }) {
  return <DrawerFooterJsx>{children}</DrawerFooterJsx>
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <DialogTitle>
      <ViewJsx fontSize={20} fontWeight="600" fontFamily="$heading" color="$color">
        {children}
      </ViewJsx>
    </DialogTitle>
  )
}

function Description({ children }: { children: React.ReactNode }) {
  return (
    <DialogDescription>
      <ViewJsx fontSize={13} color="$colorSubtitle" fontFamily="$body">
        {children}
      </ViewJsx>
    </DialogDescription>
  )
}

function Close({ children }: { children: React.ReactNode }) {
  return <DialogClose asChild>{children}</DialogClose>
}

export const Drawer = { Root, Trigger, Content, Header, Footer, Title, Description, Close }
