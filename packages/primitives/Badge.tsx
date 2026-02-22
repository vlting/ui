import { styled, Text } from 'tamagui'
import type { GetProps } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
export const Badge = styled(Text, {
  fontFamily: '$body',
  fontSize: '$1',
  fontWeight: '$4',
  paddingHorizontal: '$2',
  paddingVertical: '$1',
  borderRadius: '$10',
  overflow: 'hidden',
  alignSelf: 'flex-start',

  variants: {
    variant: {
      solid: {
        backgroundColor: '$color6',
        color: '$color1',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        color: '$color',
      },
      subtle: {
        backgroundColor: '$color3',
        color: '$color11',
      },
    },
    tone: {
      neutral: {},
      primary: {},
      success: {},
      warning: {},
      danger: {},
    },
    size: {
      sm: { fontSize: '$1', paddingHorizontal: '$1.5', paddingVertical: '$0.5' },
      md: { fontSize: '$1', paddingHorizontal: '$2', paddingVertical: '$1' },
      lg: { fontSize: '$2', paddingHorizontal: '$2.5', paddingVertical: '$1' },
    },
  } as const,

  defaultVariants: {
    variant: 'subtle',
    size: 'md',
  },
})

export type BadgeProps = GetProps<typeof Badge>
