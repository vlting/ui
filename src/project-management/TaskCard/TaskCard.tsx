import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const TaskCardFrame = styled(YStack, {})

const TaskCardTitle = styled(YStack, {})

const TaskCardAssignee = styled(YStack, {})

const TaskCardStatus = styled(YStack, {})

const TaskCardDueDate = styled(YStack, {})

export const TaskCard = withStaticProperties(TaskCardFrame, {
  Title: TaskCardTitle,
  Assignee: TaskCardAssignee,
  Status: TaskCardStatus,
  DueDate: TaskCardDueDate,
})

export type TaskCardProps = GetProps<typeof TaskCardFrame>
