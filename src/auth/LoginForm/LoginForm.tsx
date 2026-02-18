import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const LoginFormFrame = styled(YStack, {})

export type LoginFormProps = GetProps<typeof LoginFormFrame>

export const LoginForm = LoginFormFrame
