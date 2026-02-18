import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const RoleBadgeFrame = styled(YStack, {})

export type RoleBadgeProps = GetProps<typeof RoleBadgeFrame>

export const RoleBadge = RoleBadgeFrame
