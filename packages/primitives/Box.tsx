import type { GetProps } from 'tamagui'
import { View, styled } from 'tamagui'

export const Box = styled(View, {
  variants: {
    centered: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  } as const,
} as any)

export type BoxProps = GetProps<typeof Box>
