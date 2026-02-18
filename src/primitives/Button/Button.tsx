import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ButtonFrame = styled(YStack, {})

export type ButtonProps = GetProps<typeof ButtonFrame>

export const Button = ButtonFrame
