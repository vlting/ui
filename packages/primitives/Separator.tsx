import { View, styled } from 'tamagui'
import type { GetProps } from 'tamagui'

export const Separator = styled(View, {
  backgroundColor: '$borderColor',
  flexShrink: 0,
  role: 'separator',

  variants: {
    orientation: {
      horizontal: {
        height: 1,
        width: '100%',
        // web-only ARIA attribute
        'aria-orientation': 'horizontal',
      },
      vertical: {
        width: 1,
        height: '100%',
        // web-only ARIA attribute
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
} as any)

export type SeparatorProps = GetProps<typeof Separator>
