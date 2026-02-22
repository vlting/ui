import type { GetProps } from 'tamagui'
import { styled, Text, withStaticProperties, YStack } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
const CardFrame = styled(YStack, {
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  overflow: 'hidden',

  variants: {
    size: {
      sm: { padding: '$2' },
      md: { padding: '$0' },
      lg: { padding: '$0' },
    },
    elevated: {
      true: {
        borderWidth: 0,
      },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        hoverStyle: { backgroundColor: '$backgroundHover' },
        pressStyle: { backgroundColor: '$backgroundPress', scale: 0.99 },
        animation: 'fast',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const CardHeader = styled(YStack, {
  paddingHorizontal: '$4',
  paddingTop: '$4',
  paddingBottom: '$2',
  gap: '$1',
})

// @ts-expect-error Tamagui v2 RC
const CardContent = styled(YStack, {
  paddingHorizontal: '$4',
  paddingVertical: '$2',
  flex: 1,
})

// @ts-expect-error Tamagui v2 RC
const CardFooter = styled(YStack, {
  paddingHorizontal: '$4',
  paddingTop: '$2',
  paddingBottom: '$4',
})

// @ts-expect-error Tamagui v2 RC
const CardTitle = styled(Text, {
  fontFamily: '$heading',
  fontWeight: '$4',

  variants: {
    size: {
      sm: { fontSize: '$4' },
      md: { fontSize: '$5' },
      lg: { fontSize: '$6' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const CardDescription = styled(Text, {
  fontFamily: '$body',
  color: '$colorSubtitle',

  variants: {
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$4' },
    },
  } as const,

  defaultVariants: {
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
