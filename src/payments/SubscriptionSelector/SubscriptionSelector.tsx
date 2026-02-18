import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SubscriptionSelectorFrame = styled(YStack, {})

export type SubscriptionSelectorProps = GetProps<typeof SubscriptionSelectorFrame>

export const SubscriptionSelector = SubscriptionSelectorFrame
