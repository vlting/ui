import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ApprovalWorkflowPanelFrame = styled(YStack, {})

export type ApprovalWorkflowPanelProps = GetProps<typeof ApprovalWorkflowPanelFrame>

export const ApprovalWorkflowPanel = ApprovalWorkflowPanelFrame
