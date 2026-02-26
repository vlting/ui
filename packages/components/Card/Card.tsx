import { CardFrame as TamaguiCardFrame } from '@tamagui/card'
import type React from 'react'
import type { GetProps } from 'tamagui'
import { Text, YStack, styled, withStaticProperties } from 'tamagui'

// Extend Tamagui's Card frame with our custom variants.
// Tamagui's Card provides a YStack-based container with theme support
// and size→borderRadius token mapping via createStyledContext.
const CardFrame = styled(TamaguiCardFrame, {
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  overflow: 'hidden',

  variants: {
    size: {
      // @ts-expect-error Tamagui v2 RC
      sm: { padding: '$2' },
      // @ts-expect-error Tamagui v2 RC
      md: { padding: '$0' },
      // @ts-expect-error Tamagui v2 RC
      lg: { padding: '$0' },
    },
    elevated: {
      // @ts-expect-error Tamagui v2 RC
      true: {
        borderWidth: 0,
      },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        tabIndex: 0,
        role: 'button',
        // @ts-expect-error Tamagui v2 RC
        hoverStyle: { backgroundColor: '$backgroundHover' },
        // @ts-expect-error Tamagui v2 RC
        pressStyle: { backgroundColor: '$backgroundPress', scale: 0.99 },
        // @ts-expect-error Tamagui v2 RC
        focusStyle: {
          outlineWidth: 2,
          outlineOffset: 2,
          outlineColor: '$outlineColor',
          outlineStyle: 'solid',
        },
        // @ts-expect-error Tamagui v2 RC
        animation: 'fast',
      },
    },
  } as const,

  defaultVariants: {
    // @ts-expect-error Tamagui v2 RC
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const CardHeader = styled(YStack, {
  paddingHorizontal: '$4',
  paddingTop: '$4',
  paddingBottom: '$2',
  gap: '$1',
  flexShrink: 0,
})

// @ts-expect-error Tamagui v2 RC
const CardContent = styled(YStack, {
  paddingHorizontal: '$4',
  paddingVertical: '$2',
  flex: 1,
  overflow: 'hidden',
})

// @ts-expect-error Tamagui v2 RC
const CardFooter = styled(YStack, {
  paddingHorizontal: '$4',
  paddingTop: '$2',
  paddingBottom: '$4',
  flexShrink: 0,
})

const CardTitleText = styled(Text, {
  fontFamily: '$heading',
  fontWeight: '$4',

  variants: {
    size: {
      // @ts-expect-error Tamagui v2 RC
      sm: { fontSize: '$4' },
      // @ts-expect-error Tamagui v2 RC
      md: { fontSize: '$5' },
      // @ts-expect-error Tamagui v2 RC
      lg: { fontSize: '$6' },
    },
  } as const,

  defaultVariants: {
    // @ts-expect-error Tamagui v2 RC
    size: 'md',
  },
})

function CardTitle({
  children,
  size,
  ...props
}: { children?: React.ReactNode; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <h3 style={{ margin: 0 }}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <CardTitleText size={size} {...props}>
        {children}
      </CardTitleText>
    </h3>
  )
}

const CardDescription = styled(Text, {
  fontFamily: '$body',
  color: '$colorSubtitle',

  variants: {
    size: {
      // @ts-expect-error Tamagui v2 RC
      sm: { fontSize: '$2' },
      // @ts-expect-error Tamagui v2 RC
      md: { fontSize: '$3' },
      // @ts-expect-error Tamagui v2 RC
      lg: { fontSize: '$4' },
    },
  } as const,

  defaultVariants: {
    // @ts-expect-error Tamagui v2 RC
    size: 'md',
  },
})

export const Card = withStaticProperties(CardFrame, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
})

export type CardProps = GetProps<typeof CardFrame>
