import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PasswordResetFormFrame = styled(YStack, {})

export type PasswordResetFormProps = GetProps<typeof PasswordResetFormFrame>

export const PasswordResetForm = PasswordResetFormFrame
