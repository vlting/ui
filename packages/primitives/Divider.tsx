import type { GetProps } from 'tamagui'
import { View, styled } from 'tamagui'

export const Divider = styled(View, {
  backgroundColor: '$borderColor',
  flexShrink: 0,

  variants: {
    orientation: {
      horizontal: {
        height: 1,
        width: '100%',
        marginVertical: '$2',
      },
      vertical: {
        width: 1,
        height: '100%',
        marginHorizontal: '$2',
      },
    },
  } as const,

  defaultVariants: {
    orientation: 'horizontal',
  },
} as any)

export type DividerProps = GetProps<typeof Divider>
