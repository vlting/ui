import type { GetProps } from 'tamagui'
import { XStack as TXStack, YStack as TYStack, styled } from 'tamagui'

export const VStack = styled(TYStack, {})
export type VStackProps = GetProps<typeof VStack>

export const HStack = styled(TXStack, {})
export type HStackProps = GetProps<typeof HStack>

/** Alias for VStack — default vertical layout */
export const Stack = VStack
export type StackProps = VStackProps
