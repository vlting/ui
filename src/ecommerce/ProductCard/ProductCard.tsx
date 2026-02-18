import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const ProductCardFrame = styled(YStack, {})

const ProductCardImage = styled(YStack, {})

const ProductCardTitle = styled(YStack, {})

const ProductCardPrice = styled(YStack, {})

const ProductCardActions = styled(YStack, {})

export const ProductCard = withStaticProperties(ProductCardFrame, {
  Image: ProductCardImage,
  Title: ProductCardTitle,
  Price: ProductCardPrice,
  Actions: ProductCardActions,
})

export type ProductCardProps = GetProps<typeof ProductCardFrame>
