import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SignupFormFrame = styled(YStack, {})

export type SignupFormProps = GetProps<typeof SignupFormFrame>

export const SignupForm = SignupFormFrame
