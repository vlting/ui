import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const VirtualizedListFrame = styled(YStack, {})

export type VirtualizedListProps = GetProps<typeof VirtualizedListFrame>

export const VirtualizedList = VirtualizedListFrame
