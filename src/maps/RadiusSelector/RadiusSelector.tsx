import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const RadiusSelectorFrame = styled(YStack, {})

export type RadiusSelectorProps = GetProps<typeof RadiusSelectorFrame>

export const RadiusSelector = RadiusSelectorFrame
