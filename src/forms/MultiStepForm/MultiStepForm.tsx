import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const MultiStepFormFrame = styled(YStack, {})

export type MultiStepFormProps = GetProps<typeof MultiStepFormFrame>

export const MultiStepForm = MultiStepFormFrame
