import { AlertDialog as TamaguiAlertDialog } from '@tamagui/alert-dialog'
import type React from 'react'
import type { ComponentType } from 'react'
import { Text, XStack, styled } from 'tamagui'

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

// @ts-expect-error Tamagui v2 RC
const StyledFooter = styled(XStack, {
  justifyContent: 'flex-end',
  gap: '$2',
  paddingTop: '$2',
})

// Tamagui v2 RC GetProps bug — cast for JSX usage
const AlertRoot = TamaguiAlertDialog as ComponentType<Record<string, unknown>>
const AlertTrigger = TamaguiAlertDialog.Trigger as ComponentType<Record<string, unknown>>
const AlertPortal = TamaguiAlertDialog.Portal as ComponentType<Record<string, unknown>>
const AlertOverlay = TamaguiAlertDialog.Overlay as ComponentType<Record<string, unknown>>
const AlertContent = TamaguiAlertDialog.Content as ComponentType<Record<string, unknown>>
const AlertTitle = TamaguiAlertDialog.Title as ComponentType<Record<string, unknown>>
const AlertDescription = TamaguiAlertDialog.Description as ComponentType<
  Record<string, unknown>
>
const AlertCancel = TamaguiAlertDialog.Cancel as ComponentType<Record<string, unknown>>
const AlertAction = TamaguiAlertDialog.Action as ComponentType<Record<string, unknown>>
const TitleText = StyledTitle as ComponentType<Record<string, unknown>>
const DescText = StyledDescription as ComponentType<Record<string, unknown>>
const FooterFrame = StyledFooter as ComponentType<Record<string, unknown>>

export interface AlertDialogRootProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function Root({ children, open, defaultOpen, onOpenChange }: AlertDialogRootProps) {
  return (
    <AlertRoot open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </AlertRoot>
  )
}

function Trigger({ children }: { children: React.ReactNode }) {
  return <AlertTrigger asChild>{children}</AlertTrigger>
}

function Overlay({ children }: { children?: React.ReactNode }) {
  return (
    <AlertPortal>
      <AlertOverlay
        backgroundColor="$overlayBackground"
        animation="medium"
        opacity={1}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex="$4"
        display="flex"
        alignItems="center"
        justifyContent="center"
      />
      {children}
    </AlertPortal>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <AlertPortal>
      <AlertContent
        backgroundColor="$background"
        borderRadius="$6"
        padding="$5"
        width="90%"
        maxWidth="$dialogMd"
        maxHeight="85%"
        animation="medium"
        gap="$3"
        enterStyle={{ opacity: 0, scale: 0.95 }}
        exitStyle={{ opacity: 0, scale: 0.95 }}
        zIndex="$5"
        style={{ boxShadow: 'var(--shadowXl)' }}
      >
        {children}
      </AlertContent>
    </AlertPortal>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <AlertTitle>
      <TitleText>{children}</TitleText>
    </AlertTitle>
  )
}

function Description({ children }: { children: React.ReactNode }) {
  return (
    <AlertDescription>
      <DescText>{children}</DescText>
    </AlertDescription>
  )
}

function Footer({ children }: { children: React.ReactNode }) {
  return <FooterFrame>{children}</FooterFrame>
}

function Cancel({ children }: { children?: React.ReactNode }) {
  return <AlertCancel asChild>{children}</AlertCancel>
}

function Action({ children }: { children?: React.ReactNode }) {
  return <AlertAction asChild>{children}</AlertAction>
}

export const AlertDialog = {
  Root,
  Trigger,
  Overlay,
  Content,
  Title,
  Description,
  Footer,
  Cancel,
  Action,
}
