import { Text, styled } from 'tamagui'
import type { GetProps } from 'tamagui'

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
      // shadcn: "default" — solid primary background
      default: {
        backgroundColor: '$color6',
        color: '$color1',
      },
      // Backwards compat alias
      solid: {
        backgroundColor: '$color6',
        color: '$color1',
      },
      // shadcn: "secondary" — muted background
      secondary: {
        backgroundColor: '$color3',
        color: '$color',
      },
      // shadcn: "destructive" — red background
      destructive: {
        backgroundColor: '$red10',
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
    variant: 'default',
    size: 'md',
  },
} as any)

export type BadgeProps = GetProps<typeof Badge>
