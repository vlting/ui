import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SplitViewFrame = styled(YStack, {})

export type SplitViewProps = GetProps<typeof SplitViewFrame>

export const SplitView = SplitViewFrame
