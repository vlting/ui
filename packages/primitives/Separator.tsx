import { View, styled } from 'tamagui'
import type { GetProps } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
export const Separator = styled(View, {
  backgroundColor: '$borderColor',
  flexShrink: 0,
  accessibilityRole: 'separator',

  variants: {
    orientation: {
      horizontal: {
        height: 1,
        width: '100%',
      },
      vertical: {
        width: 1,
        height: '100%',
      },
    },
    decorative: {
      true: {
        accessibilityRole: 'none',
      },
    },
  } as const,

  defaultVariants: {
    orientation: 'horizontal',
  },
})

export type SeparatorProps = GetProps<typeof Separator>
