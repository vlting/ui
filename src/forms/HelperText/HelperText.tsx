import type { GetProps } from 'tamagui'
import { Text, styled } from 'tamagui'

// @ts-expect-error Tamagui v2 RC: styled() token defaults type inference bug
const HelperTextFrame = styled(Text, {
  fontSize: '$3',
  color: '$color2',
  lineHeight: '$3',
})

export type HelperTextProps = GetProps<typeof HelperTextFrame>

export const HelperText = HelperTextFrame
