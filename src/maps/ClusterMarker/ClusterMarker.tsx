import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ClusterMarkerFrame = styled(YStack, {})

export type ClusterMarkerProps = GetProps<typeof ClusterMarkerFrame>

export const ClusterMarker = ClusterMarkerFrame
