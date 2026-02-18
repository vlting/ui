import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const BillingCycleToggleFrame = styled(YStack, {})

export type BillingCycleToggleProps = GetProps<typeof BillingCycleToggleFrame>

export const BillingCycleToggle = BillingCycleToggleFrame
