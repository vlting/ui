import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const BannerFrame = styled(YStack, {})

export type BannerProps = GetProps<typeof BannerFrame>

export const Banner = BannerFrame
