import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ResizablePanelFrame = styled(YStack, {})

export type ResizablePanelProps = GetProps<typeof ResizablePanelFrame>

export const ResizablePanel = ResizablePanelFrame
