import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ActivityLogListFrame = styled(YStack, {})

export type ActivityLogListProps = GetProps<typeof ActivityLogListFrame>

export const ActivityLogList = ActivityLogListFrame
