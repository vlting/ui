import type React from 'react'
import type { ComponentType } from 'react'
import { Sheet as TamaguiSheet } from '@tamagui/sheet'

// Tamagui v2 RC GetProps bug — cast for JSX usage
const SheetRoot = TamaguiSheet as ComponentType<Record<string, unknown>>
const SheetFrame = TamaguiSheet.Frame as ComponentType<Record<string, unknown>>
const SheetHandle = TamaguiSheet.Handle as ComponentType<Record<string, unknown>>
const SheetOverlay = TamaguiSheet.Overlay as ComponentType<Record<string, unknown>>
const SheetScrollView = TamaguiSheet.ScrollView as ComponentType<Record<string, unknown>>

export interface SheetRootProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  snapPoints?: number[]
  position?: number
  defaultPosition?: number
  modal?: boolean
  dismissOnOverlayPress?: boolean
  dismissOnSnapToBottom?: boolean
}

function Root({
  children,
  open,
  onOpenChange,
  snapPoints,
  position,
  defaultPosition,
  modal = true,
  dismissOnOverlayPress = true,
  dismissOnSnapToBottom = true,
}: SheetRootProps) {
  return (
    <SheetRoot
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
      position={position}
      defaultPosition={defaultPosition}
      modal={modal}
      dismissOnOverlayPress={dismissOnOverlayPress}
      dismissOnSnapToBottom={dismissOnSnapToBottom}
    >
      {children}
    </SheetRoot>
  )
}

function Overlay() {
  return (
    <SheetOverlay
      backgroundColor="$overlayBackground"
      animation="medium"
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
    />
  )
}

function Handle() {
  return <SheetHandle backgroundColor="$color6" opacity={0.5} />
}

interface SheetFrameProps {
  children: React.ReactNode
}

function Frame({ children }: SheetFrameProps) {
  return (
    <SheetFrame
      backgroundColor="$background"
      borderTopLeftRadius="$6"
      borderTopRightRadius="$6"
      padding="$4"
    >
      {children}
    </SheetFrame>
  )
}

function ScrollView({ children }: { children: React.ReactNode }) {
  return <SheetScrollView>{children}</SheetScrollView>
}

export const Sheet = { Root, Overlay, Handle, Frame, ScrollView }
