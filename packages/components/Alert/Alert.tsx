import type React from 'react'
import { Text, XStack, YStack, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const AlertFrame = styled(XStack, {
  borderRadius: '$3',
  borderWidth: 1,
  borderColor: '$borderColor',
  padding: '$3',
  gap: '$2',
  alignItems: 'flex-start',

  variants: {
    variant: {
      default: {
        backgroundColor: '$background',
      },
      destructive: {
        borderColor: '$red8',
        backgroundColor: '$red2',
      },
    },
  } as const,

  defaultVariants: {
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

export interface AlertProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive'
}

function Root({ children, variant = 'default' }: AlertProps) {
  return (
    // @ts-expect-error Tamagui v2 RC
    <AlertFrame variant={variant} role={variant === 'destructive' ? 'alert' : 'status'}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <YStack flex={1} gap="$1">
        {children}
      </YStack>
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

export const Alert = { Root, Title, Description }
