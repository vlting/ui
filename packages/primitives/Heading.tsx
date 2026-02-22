import type { GetProps } from 'tamagui'
import { styled, Text } from 'tamagui'

const HeadingBase = styled(Text, {
  fontFamily: '$heading',
  color: '$color',
  accessibilityRole: 'header',

  variants: {
    level: {
      1: { fontSize: '$10', lineHeight: '$10', fontWeight: '$5' },
      2: { fontSize: '$8', lineHeight: '$8', fontWeight: '$5' },
      3: { fontSize: '$6', lineHeight: '$6', fontWeight: '$4' },
      4: { fontSize: '$5', lineHeight: '$5', fontWeight: '$4' },
      5: { fontSize: '$4', lineHeight: '$4', fontWeight: '$4' },
      6: { fontSize: '$3', lineHeight: '$3', fontWeight: '$4' },
    },
  } as const,

  defaultVariants: {
    level: 2,
  },
})

// @ts-expect-error Tamagui v2 RC
export const Heading = HeadingBase
export type HeadingProps = GetProps<typeof HeadingBase>
