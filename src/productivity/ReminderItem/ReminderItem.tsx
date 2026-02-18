import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ReminderItemFrame = styled(YStack, {})

export type ReminderItemProps = GetProps<typeof ReminderItemFrame>

export const ReminderItem = ReminderItemFrame
