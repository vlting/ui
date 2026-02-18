import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const KanbanColumnFrame = styled(YStack, {})

export type KanbanColumnProps = GetProps<typeof KanbanColumnFrame>

export const KanbanColumn = KanbanColumnFrame
