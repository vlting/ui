import type React from 'react'
import type { ComponentType } from 'react'
import { Text, View, XStack, styled } from 'tamagui'

type AnyFC = ComponentType<Record<string, unknown>>

const AlertFrame = styled(XStack, {
  borderRadius: '$3',
  borderWidth: 1,
  borderColor: '$borderColor',
  padding: '$3',
  gap: '$2',
  alignItems: 'flex-start',

  variants: {
    variant: {
      // @ts-expect-error Tamagui v2 RC
      default: {
        backgroundColor: '$background',
      },
      // @ts-expect-error Tamagui v2 RC
      destructive: {
        borderColor: '$red8',
        backgroundColor: '$red2',
      },
    },
  } as const,

  defaultVariants: {
    // @ts-expect-error Tamagui v2 RC
    variant: 'default',
  },
})

// @ts-expect-error Tamagui v2 RC
const AlertTitle = styled(Text, {
  fontFamily: '$body',
  fontWeight: '$4',
  fontSize: '$4',
  color: '$color',
})

// @ts-expect-error Tamagui v2 RC
const AlertDescription = styled(Text, {
  fontFamily: '$body',
  fontSize: '$3',
  color: '$colorSubtitle',
})

// @ts-expect-error Tamagui v2 RC
const AlertIconFrame = styled(View, {
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 16,
  height: 16,
  marginTop: 2,
})

const AlertIconJsx = AlertIconFrame as AnyFC

export interface AlertProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive'
}

function Root({ children, variant = 'default' }: AlertProps) {
  return (
    // @ts-expect-error Tamagui v2 RC
    <AlertFrame variant={variant} role={variant === 'destructive' ? 'alert' : 'status'}>
      {children}
    </AlertFrame>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  // @ts-expect-error Tamagui v2 RC
  return <AlertTitle>{children}</AlertTitle>
}

function Description({ children }: { children: React.ReactNode }) {
  // @ts-expect-error Tamagui v2 RC
  return <AlertDescription>{children}</AlertDescription>
}

function Icon({ children }: { children: React.ReactNode }) {
  return <AlertIconJsx>{children}</AlertIconJsx>
}

export const Alert = { Root, Title, Description, Icon }
