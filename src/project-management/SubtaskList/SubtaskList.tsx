import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SubtaskListFrame = styled(YStack, {})

export type SubtaskListProps = GetProps<typeof SubtaskListFrame>

export const SubtaskList = SubtaskListFrame
