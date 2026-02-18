import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const PipelineBoardFrame = styled(YStack, {})

export type PipelineBoardProps = GetProps<typeof PipelineBoardFrame>

export const PipelineBoard = PipelineBoardFrame
