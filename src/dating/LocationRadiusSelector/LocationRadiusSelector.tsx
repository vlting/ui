import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const LocationRadiusSelectorFrame = styled(YStack, {})

export type LocationRadiusSelectorProps = GetProps<typeof LocationRadiusSelectorFrame>

export const LocationRadiusSelector = LocationRadiusSelectorFrame
