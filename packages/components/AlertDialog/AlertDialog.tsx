import type React from 'react'
import { Text, View, XStack, YStack, styled } from 'tamagui'
import { Dialog as HeadlessDialog } from '../../headless/Dialog'
import type { DialogCloseProps, DialogRootProps } from '../../headless/Dialog'

// @ts-expect-error Tamagui v2 RC
const StyledOverlay = styled(View, {
  position: 'absolute' as const,
  backgroundColor: 'rgba(0,0,0,0.5)',
  animation: 'medium',
  opacity: 1,
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
})

// @ts-expect-error Tamagui v2 RC
const StyledContent = styled(YStack, {
  backgroundColor: '$background',
  borderRadius: '$6',
  padding: '$5',
  width: '90%',
  maxWidth: 500,
  maxHeight: '85%',
  animation: 'medium',
  gap: '$3',
  enterStyle: { opacity: 0, scale: 0.95 },
  exitStyle: { opacity: 0, scale: 0.95 },
})

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

function Root(props: DialogRootProps) {
  return <HeadlessDialog.Root {...props} />
}

function Trigger({ children }: { children: React.ReactElement }) {
  return <HeadlessDialog.Trigger>{children}</HeadlessDialog.Trigger>
}

function Overlay({ children }: { children?: React.ReactNode }) {
  return (
    <HeadlessDialog.Overlay
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <StyledOverlay position="absolute" top={0} left={0} right={0} bottom={0} />
      {children}
    </HeadlessDialog.Overlay>
  )
}

interface AlertDialogContentProps {
  children: React.ReactNode
}

function Content({ children }: AlertDialogContentProps) {
  return (
    <HeadlessDialog.Content style={{ position: 'relative', zIndex: 51 }}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <StyledContent>{children}</StyledContent>
    </HeadlessDialog.Content>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <HeadlessDialog.Title>
      {/* @ts-expect-error Tamagui v2 RC */}
      <StyledTitle>{children}</StyledTitle>
    </HeadlessDialog.Title>
  )
}

function Description({ children }: { children: React.ReactNode }) {
  return (
    <HeadlessDialog.Description>
      {/* @ts-expect-error Tamagui v2 RC */}
      <StyledDescription>{children}</StyledDescription>
    </HeadlessDialog.Description>
  )
}

function Footer({ children }: { children: React.ReactNode }) {
  // @ts-expect-error Tamagui v2 RC
  return <StyledFooter>{children}</StyledFooter>
}

function Cancel(props: DialogCloseProps) {
  return <HeadlessDialog.Close {...props} />
}

function Action({ children }: { children: React.ReactElement }) {
  return <HeadlessDialog.Close>{children}</HeadlessDialog.Close>
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
