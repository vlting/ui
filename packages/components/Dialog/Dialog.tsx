import type React from 'react'
import type { ComponentType } from 'react'
import { Text, styled } from 'tamagui'
import { Dialog as TamaguiDialog } from '@tamagui/dialog'

// @ts-expect-error Tamagui v2 RC
const StyledTitle = styled(Text, {
  fontFamily: '$heading',
  fontWeight: '$4',
  fontSize: '$6',
  color: '$color',
})

// @ts-expect-error Tamagui v2 RC
const StyledDescription = styled(Text, {
  fontFamily: '$body',
  fontSize: '$4',
  color: '$colorSubtitle',
})

// Tamagui v2 RC GetProps bug — cast for JSX usage
const DialogRoot = TamaguiDialog as ComponentType<Record<string, unknown>>
const DialogTrigger = TamaguiDialog.Trigger as ComponentType<Record<string, unknown>>
const DialogPortal = TamaguiDialog.Portal as ComponentType<Record<string, unknown>>
const DialogOverlayFrame = TamaguiDialog.Overlay as ComponentType<Record<string, unknown>>
const DialogContent = TamaguiDialog.Content as ComponentType<Record<string, unknown>>
const DialogTitleFrame = TamaguiDialog.Title as ComponentType<Record<string, unknown>>
const DialogDescriptionFrame = TamaguiDialog.Description as ComponentType<Record<string, unknown>>
const DialogClose = TamaguiDialog.Close as ComponentType<Record<string, unknown>>
const TitleText = StyledTitle as ComponentType<Record<string, unknown>>
const DescText = StyledDescription as ComponentType<Record<string, unknown>>

export interface DialogRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Root({ children, open, defaultOpen, onOpenChange }: DialogRootProps) {
  return (
    <DialogRoot open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </DialogRoot>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  return <DialogTrigger asChild>{children}</DialogTrigger>
}

function Overlay({ children }: { children?: React.ReactNode }) {
  return (
    <DialogPortal>
      <DialogOverlayFrame
        backgroundColor="rgba(0,0,0,0.4)"
        animation="medium"
        opacity={1}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={50}
        display="flex"
        alignItems="center"
        justifyContent="center"
      />
      {children}
    </DialogPortal>
  )
}

interface DialogContentProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_MAX_WIDTH = { sm: 400, md: 500, lg: 640 }
const SIZE_PADDING = { sm: '$4' as const, md: '$5' as const, lg: '$6' as const }

function Content({ children, size = 'md' }: DialogContentProps) {
  return (
    <DialogContent
      backgroundColor="$background"
      borderRadius="$6"
      padding={SIZE_PADDING[size]}
      width="90%"
      maxWidth={SIZE_MAX_WIDTH[size]}
      maxHeight="85%"
      animation="medium"
      gap="$3"
      enterStyle={{ opacity: 0, scale: 0.95 }}
      exitStyle={{ opacity: 0, scale: 0.95 }}
      zIndex={51}
    >
      {children}
    </DialogContent>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <DialogTitleFrame>
      <TitleText>{children}</TitleText>
    </DialogTitleFrame>
  )
}

function Description({ children }: { children: React.ReactNode }) {
  return (
    <DialogDescriptionFrame>
      <DescText>{children}</DescText>
    </DialogDescriptionFrame>
  )
}

function Close({ children }: { children?: React.ReactNode }) {
  return <DialogClose asChild>{children}</DialogClose>
}

export const Dialog = { Root, Trigger, Overlay, Content, Title, Description, Close }
