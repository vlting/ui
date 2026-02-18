import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const RadioGroupFrame = styled(YStack, {})

export type RadioGroupProps = GetProps<typeof RadioGroupFrame>

export const RadioGroup = RadioGroupFrame
