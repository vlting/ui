import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const WorkflowBuilderCanvasFrame = styled(YStack, {})

export type WorkflowBuilderCanvasProps = GetProps<typeof WorkflowBuilderCanvasFrame>

export const WorkflowBuilderCanvas = WorkflowBuilderCanvasFrame
