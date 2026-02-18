import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PasswordStrengthMeterFrame = styled(YStack, {})

export type PasswordStrengthMeterProps = GetProps<typeof PasswordStrengthMeterFrame>

export const PasswordStrengthMeter = PasswordStrengthMeterFrame
