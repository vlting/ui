import type { GetProps } from 'tamagui'
import { View, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
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
})

export type DividerProps = GetProps<typeof Divider>
