import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const VariantSelectorFrame = styled(YStack, {})

export type VariantSelectorProps = GetProps<typeof VariantSelectorFrame>

export const VariantSelector = VariantSelectorFrame
