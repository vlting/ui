import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const KanbanBoardFrame = styled(YStack, {})

export type KanbanBoardProps = GetProps<typeof KanbanBoardFrame>

export const KanbanBoard = KanbanBoardFrame
