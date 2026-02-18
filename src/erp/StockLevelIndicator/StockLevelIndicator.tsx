import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const StockLevelIndicatorFrame = styled(YStack, {})

export type StockLevelIndicatorProps = GetProps<typeof StockLevelIndicatorFrame>

export const StockLevelIndicator = StockLevelIndicatorFrame
