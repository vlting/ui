import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const DealCardFrame = styled(YStack, {})

const DealCardTitle = styled(YStack, {})

const DealCardValue = styled(YStack, {})

const DealCardStage = styled(YStack, {})

export const DealCard = withStaticProperties(DealCardFrame, {
  Title: DealCardTitle,
  Value: DealCardValue,
  Stage: DealCardStage,
})

export type DealCardProps = GetProps<typeof DealCardFrame>
