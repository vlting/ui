import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const PodViewFrame = styled(YStack, {})

const PodViewHeader = styled(YStack, {})

const PodViewMemberGrid = styled(YStack, {})

const PodViewActivity = styled(YStack, {})

const PodViewCountdown = styled(YStack, {})

export const PodView = withStaticProperties(PodViewFrame, {
  Header: PodViewHeader,
  MemberGrid: PodViewMemberGrid,
  Activity: PodViewActivity,
  Countdown: PodViewCountdown,
})

export type PodViewProps = GetProps<typeof PodViewFrame>
