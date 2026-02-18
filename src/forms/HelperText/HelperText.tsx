import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const HelperTextFrame = styled(YStack, {})

export type HelperTextProps = GetProps<typeof HelperTextFrame>

export const HelperText = HelperTextFrame
