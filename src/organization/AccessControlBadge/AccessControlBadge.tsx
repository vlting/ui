import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const AccessControlBadgeFrame = styled(YStack, {})

export type AccessControlBadgeProps = GetProps<typeof AccessControlBadgeFrame>

export const AccessControlBadge = AccessControlBadgeFrame
