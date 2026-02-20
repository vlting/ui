import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const PodIntroFrame = styled(YStack, {})

const PodIntroWelcome = styled(YStack, {})

const PodIntroMembers = styled(YStack, {})

const PodIntroFirstActivity = styled(YStack, {})

export const PodIntro = withStaticProperties(PodIntroFrame, {
  Welcome: PodIntroWelcome,
  Members: PodIntroMembers,
  FirstActivity: PodIntroFirstActivity,
})

export type PodIntroProps = GetProps<typeof PodIntroFrame>
