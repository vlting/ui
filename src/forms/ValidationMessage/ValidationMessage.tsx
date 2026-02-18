import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ValidationMessageFrame = styled(YStack, {})

export type ValidationMessageProps = GetProps<typeof ValidationMessageFrame>

export const ValidationMessage = ValidationMessageFrame
