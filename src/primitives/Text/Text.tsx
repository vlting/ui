import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const TextFrame = styled(YStack, {})

export type TextProps = GetProps<typeof TextFrame>

export const Text = TextFrame
