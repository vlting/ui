import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MapPinFrame = styled(YStack, {})

export type MapPinProps = GetProps<typeof MapPinFrame>

export const MapPin = MapPinFrame
