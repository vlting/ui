import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const TimeEntryFormFrame = styled(YStack, {})

export type TimeEntryFormProps = GetProps<typeof TimeEntryFormFrame>

export const TimeEntryForm = TimeEntryFormFrame
