import React from 'react'
import { styled, Text, View, YStack } from 'tamagui'
import { Dialog as HeadlessDialog } from '../../headless/Dialog'
import type {
  DialogRootProps,
  DialogTriggerProps,
  DialogCloseProps,
} from '../../headless/Dialog'

// @ts-expect-error Tamagui v2 RC
const StyledOverlay = styled(View, {
  position: 'absolute' as const,
  backgroundColor: 'rgba(0,0,0,0.4)',
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

  variants: {
    size: {
      sm: { maxWidth: 400, padding: '$4' },
      md: { maxWidth: 500, padding: '$5' },
      lg: { maxWidth: 640, padding: '$6' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
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

// Compose headless + styled
function Root(props: DialogRootProps) {
  return <HeadlessDialog.Root {...props} />
}

function Trigger(props: DialogTriggerProps) {
  return <HeadlessDialog.Trigger {...props} />
}

interface StyledDialogOverlayProps {
  children?: React.ReactNode
}

function Overlay({ children }: StyledDialogOverlayProps) {
  return (
    <HeadlessDialog.Overlay
      style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
    >
      {/* @ts-expect-error Tamagui v2 RC */}
      <StyledOverlay
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
      />
      {children}
    </HeadlessDialog.Overlay>
  )
}

interface StyledDialogContentProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  onEscapeKeyDown?: () => void
}

function Content({ children, size = 'md', onEscapeKeyDown }: StyledDialogContentProps) {
  return (
    <HeadlessDialog.Content onEscapeKeyDown={onEscapeKeyDown} style={{ position: 'relative', zIndex: 51 }}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <StyledContent size={size}>{children}</StyledContent>
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

function Close(props: DialogCloseProps) {
  return <HeadlessDialog.Close {...props} />
}

export const Dialog = { Root, Trigger, Overlay, Content, Title, Description, Close }
