import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const AutomationStatusBadgeFrame = styled(YStack, {})

export type AutomationStatusBadgeProps = GetProps<typeof AutomationStatusBadgeFrame>

export const AutomationStatusBadge = AutomationStatusBadgeFrame
