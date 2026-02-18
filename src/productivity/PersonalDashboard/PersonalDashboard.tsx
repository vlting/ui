import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PersonalDashboardFrame = styled(YStack, {})

export type PersonalDashboardProps = GetProps<typeof PersonalDashboardFrame>

export const PersonalDashboard = PersonalDashboardFrame
