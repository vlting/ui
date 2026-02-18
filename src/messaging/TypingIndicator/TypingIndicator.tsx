import type { GetProps } from 'tamagui'
import { XStack, styled } from 'tamagui'

const TypingIndicatorFrame = styled(XStack, {})

export type TypingIndicatorProps = GetProps<typeof TypingIndicatorFrame>

export const TypingIndicator = TypingIndicatorFrame
