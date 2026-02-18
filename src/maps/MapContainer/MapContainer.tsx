import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const MapContainerFrame = styled(YStack, {})

export type MapContainerProps = GetProps<typeof MapContainerFrame>

export const MapContainer = MapContainerFrame
