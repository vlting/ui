import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ConversionStatCardFrame = styled(YStack, {})

export type ConversionStatCardProps = GetProps<typeof ConversionStatCardFrame>

export const ConversionStatCard = ConversionStatCardFrame
