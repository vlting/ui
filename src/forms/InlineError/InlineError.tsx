import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const InlineErrorFrame = styled(YStack, {})

export type InlineErrorProps = GetProps<typeof InlineErrorFrame>

export const InlineError = InlineErrorFrame
