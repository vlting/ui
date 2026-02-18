import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const QuickAddPanelFrame = styled(YStack, {})

export type QuickAddPanelProps = GetProps<typeof QuickAddPanelFrame>

export const QuickAddPanel = QuickAddPanelFrame
