import type { GetProps } from 'tamagui'
import { XStack, styled } from 'tamagui'

const AssignmentAvatarStackFrame = styled(XStack, {})

export type AssignmentAvatarStackProps = GetProps<typeof AssignmentAvatarStackFrame>

export const AssignmentAvatarStack = AssignmentAvatarStackFrame
