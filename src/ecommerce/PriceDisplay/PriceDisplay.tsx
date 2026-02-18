import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PriceDisplayFrame = styled(YStack, {})

export type PriceDisplayProps = GetProps<typeof PriceDisplayFrame>

export const PriceDisplay = PriceDisplayFrame
