import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const CardFrame = styled(YStack, {})

const CardHeader = styled(YStack, {})

const CardContent = styled(YStack, {})

const CardFooter = styled(YStack, {})

export const Card = withStaticProperties(CardFrame, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
})

export type CardProps = GetProps<typeof CardFrame>
