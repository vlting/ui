import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MapInfoCardFrame = styled(YStack, {})

export type MapInfoCardProps = GetProps<typeof MapInfoCardFrame>

export const MapInfoCard = MapInfoCardFrame
