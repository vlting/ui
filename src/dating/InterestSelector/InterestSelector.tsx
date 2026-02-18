import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const InterestSelectorFrame = styled(YStack, {})

export type InterestSelectorProps = GetProps<typeof InterestSelectorFrame>

export const InterestSelector = InterestSelectorFrame
