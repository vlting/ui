import type { GetProps } from 'tamagui'
import { styled, View } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
export const Box = styled(View, {
  variants: {
    centered: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  } as const,
})

export type BoxProps = GetProps<typeof Box>
