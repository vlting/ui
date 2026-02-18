import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const LeaveRequestCardFrame = styled(YStack, {})

export type LeaveRequestCardProps = GetProps<typeof LeaveRequestCardFrame>

export const LeaveRequestCard = LeaveRequestCardFrame
