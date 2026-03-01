import {
  Toast as TamaguiToast,
  ToastProvider as TamaguiToastProvider,
  ToastViewport as TamaguiToastViewport,
  useToastController,
  useToastState,
} from '@tamagui/toast'
import type React from 'react'
import type { ComponentType } from 'react'
import { Text, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const StyledTitle = styled(Text, {
  fontFamily: '$heading',
  fontWeight: '$4',
  fontSize: '$4',
  color: '$color',
})

// @ts-expect-error Tamagui v2 RC
const StyledDescription = styled(Text, {
  fontFamily: '$body',
  fontSize: '$3',
  color: '$colorSubtitle',
})

// Tamagui v2 RC GetProps bug — cast for JSX usage
const ToastRoot = TamaguiToast as ComponentType<Record<string, unknown>>
const ToastTitle = TamaguiToast.Title as ComponentType<Record<string, unknown>>
const ToastDescription = TamaguiToast.Description as ComponentType<
  Record<string, unknown>
>
const ToastAction = TamaguiToast.Action as ComponentType<Record<string, unknown>>
const ToastClose = TamaguiToast.Close as ComponentType<Record<string, unknown>>
const ToastProvider = TamaguiToastProvider as ComponentType<Record<string, unknown>>
const ToastViewportFrame = TamaguiToastViewport as ComponentType<Record<string, unknown>>
const TitleText = StyledTitle as ComponentType<Record<string, unknown>>
const DescText = StyledDescription as ComponentType<Record<string, unknown>>

const VARIANT_STYLES = {
  default: {
    backgroundColor: '$background',
    borderColor: '$borderColor',
  },
  success: {
    backgroundColor: '$green2',
    borderColor: '$green6',
  },
  error: {
    backgroundColor: '$red2',
    borderColor: '$red6',
  },
  warning: {
    backgroundColor: '$yellow2',
    borderColor: '$yellow6',
  },
} as const

export interface ToastRootProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'error' | 'warning'
  duration?: number
}

function Root({ children, variant = 'default', duration }: ToastRootProps) {
  const styles = VARIANT_STYLES[variant]
  return (
    <ToastRoot
      backgroundColor={styles.backgroundColor}
      borderColor={styles.borderColor}
      borderWidth={1}
      borderRadius="$4"
      padding="$3"
      gap="$2"
      animation="medium"
      duration={duration}
      enterStyle={{ opacity: 0, x: 100 }}
      exitStyle={{ opacity: 0, x: 100 }}
      elevation="$3"
    >
      {children}
    </ToastRoot>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <ToastTitle>
      <TitleText>{children}</TitleText>
    </ToastTitle>
  )
}

function Description({ children }: { children: React.ReactNode }) {
  return (
    <ToastDescription>
      <DescText>{children}</DescText>
    </ToastDescription>
  )
}

function Action({ children, altText }: { children: React.ReactNode; altText: string }) {
  return (
    <ToastAction asChild altText={altText}>
      {children}
    </ToastAction>
  )
}

function Close({ children }: { children?: React.ReactNode }) {
  return <ToastClose asChild>{children}</ToastClose>
}

export interface ToastViewportProps {
  hotkey?: string[]
  multipleToasts?: boolean
}

function Viewport({ hotkey, multipleToasts }: ToastViewportProps) {
  return (
    <ToastViewportFrame
      hotkey={hotkey}
      multipleToasts={multipleToasts}
      top={0}
      right={0}
      flexDirection="column"
      gap="$2"
      padding="$4"
      zIndex="$7"
    />
  )
}

export interface ToastProviderProps {
  children: React.ReactNode
  swipeDirection?: 'up' | 'down' | 'left' | 'right'
  duration?: number
}

function Provider({
  children,
  swipeDirection = 'right',
  duration = 5000,
}: ToastProviderProps) {
  return (
    <ToastProvider swipeDirection={swipeDirection} duration={duration}>
      {children}
    </ToastProvider>
  )
}

export const Toast = { Root, Title, Description, Action, Close, Viewport, Provider }
export { useToastController, useToastState }
