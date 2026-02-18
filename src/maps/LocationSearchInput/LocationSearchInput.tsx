import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const LocationSearchInputFrame = styled(YStack, {})

export type LocationSearchInputProps = GetProps<typeof LocationSearchInputFrame>

export const LocationSearchInput = LocationSearchInputFrame
