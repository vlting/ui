import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const InputFrame = styled(YStack, {})

export type InputProps = GetProps<typeof InputFrame>

export const Input = InputFrame
