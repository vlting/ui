import { View, styled } from 'tamagui'
import type { GetProps } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
export const Separator = styled(View, {
  backgroundColor: '$borderColor',
  flexShrink: 0,
  role: 'separator',

  variants: {
    orientation: {
      horizontal: {
        height: 1,
        width: '100%',
        // @ts-expect-error web-only ARIA attribute
        'aria-orientation': 'horizontal',
      },
      vertical: {
        width: 1,
        height: '100%',
        // @ts-expect-error web-only ARIA attribute
        'aria-orientation': 'vertical',
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
