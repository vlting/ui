import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const OTPInputFrame = styled(YStack, {})

export type OTPInputProps = GetProps<typeof OTPInputFrame>

export const OTPInput = OTPInputFrame
