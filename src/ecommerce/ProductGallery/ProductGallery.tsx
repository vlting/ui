import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ProductGalleryFrame = styled(YStack, {})

export type ProductGalleryProps = GetProps<typeof ProductGalleryFrame>

export const ProductGallery = ProductGalleryFrame
