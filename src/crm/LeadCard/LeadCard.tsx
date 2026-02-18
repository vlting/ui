import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const LeadCardFrame = styled(YStack, {})

const LeadCardName = styled(YStack, {})

const LeadCardStatus = styled(YStack, {})

const LeadCardValue = styled(YStack, {})

export const LeadCard = withStaticProperties(LeadCardFrame, {
  Name: LeadCardName,
  Status: LeadCardStatus,
  Value: LeadCardValue,
})

export type LeadCardProps = GetProps<typeof LeadCardFrame>
