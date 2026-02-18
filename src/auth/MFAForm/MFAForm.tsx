import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MFAFormFrame = styled(YStack, {})

export type MFAFormProps = GetProps<typeof MFAFormFrame>

export const MFAForm = MFAFormFrame
