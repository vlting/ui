import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const WeekEndReviewFrame = styled(YStack, {})

const WeekEndReviewMemberList = styled(YStack, {})

const WeekEndReviewMatchPrompt = styled(YStack, {})

const WeekEndReviewSummary = styled(YStack, {})

export const WeekEndReview = withStaticProperties(WeekEndReviewFrame, {
  MemberList: WeekEndReviewMemberList,
  MatchPrompt: WeekEndReviewMatchPrompt,
  Summary: WeekEndReviewSummary,
})

export type WeekEndReviewProps = GetProps<typeof WeekEndReviewFrame>
