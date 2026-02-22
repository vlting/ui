import type { GetProps } from 'tamagui'
import { styled, Text as TText } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
export const Text = styled(TText, {
  fontFamily: '$body',
  color: '$color',

  variants: {
    size: {
      xs: { fontSize: '$1', lineHeight: '$1' },
      sm: { fontSize: '$2', lineHeight: '$2' },
      md: { fontSize: '$4', lineHeight: '$4' },
      lg: { fontSize: '$6', lineHeight: '$6' },
      xl: { fontSize: '$8', lineHeight: '$8' },
    },
    tone: {
      neutral: { color: '$color' },
      muted: { color: '$colorSubtitle' },
      primary: { color: '$color10' },
      success: { color: '$green10' },
      warning: { color: '$orange10' },
      danger: { color: '$red10' },
    },
    weight: {
      light: { fontWeight: '300' },
      normal: { fontWeight: '400' },
      medium: { fontWeight: '500' },
      semibold: { fontWeight: '600' },
      bold: { fontWeight: '700' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

export type TextProps = GetProps<typeof Text>
