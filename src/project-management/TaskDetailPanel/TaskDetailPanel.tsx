import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const TaskDetailPanelFrame = styled(YStack, {})

export type TaskDetailPanelProps = GetProps<typeof TaskDetailPanelFrame>

export const TaskDetailPanel = TaskDetailPanelFrame
