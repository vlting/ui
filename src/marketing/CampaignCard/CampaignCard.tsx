import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const CampaignCardFrame = styled(YStack, {})

const CampaignCardTitle = styled(YStack, {})

const CampaignCardStatus = styled(YStack, {})

const CampaignCardMetrics = styled(YStack, {})

export const CampaignCard = withStaticProperties(CampaignCardFrame, {
  Title: CampaignCardTitle,
  Status: CampaignCardStatus,
  Metrics: CampaignCardMetrics,
})

export type CampaignCardProps = GetProps<typeof CampaignCardFrame>
