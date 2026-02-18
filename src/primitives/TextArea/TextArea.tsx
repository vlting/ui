import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const TextAreaFrame = styled(YStack, {})

export type TextAreaProps = GetProps<typeof TextAreaFrame>

export const TextArea = TextAreaFrame
