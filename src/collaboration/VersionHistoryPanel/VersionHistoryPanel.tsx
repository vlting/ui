import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const VersionHistoryPanelFrame = styled(YStack, {})

export type VersionHistoryPanelProps = GetProps<typeof VersionHistoryPanelFrame>

export const VersionHistoryPanel = VersionHistoryPanelFrame
