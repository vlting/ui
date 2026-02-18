import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ABTestVariantCardFrame = styled(YStack, {})

export type ABTestVariantCardProps = GetProps<typeof ABTestVariantCardFrame>

export const ABTestVariantCard = ABTestVariantCardFrame
