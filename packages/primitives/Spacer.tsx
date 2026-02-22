import type { GetProps } from 'tamagui'
import { View, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC
export const Spacer = styled(View, {
  flex: 1,
  variants: {
    size: {
      xs: { flex: 0, width: '$0.5', height: '$0.5' },
      sm: { flex: 0, width: '$1', height: '$1' },
      md: { flex: 0, width: '$2', height: '$2' },
      lg: { flex: 0, width: '$4', height: '$4' },
      xl: { flex: 0, width: '$6', height: '$6' },
    },
  } as const,
})

export type SpacerProps = GetProps<typeof Spacer>
