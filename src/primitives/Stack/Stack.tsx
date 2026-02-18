import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const StackFrame = styled(YStack, {})

export type StackProps = GetProps<typeof StackFrame>

export const Stack = StackFrame
