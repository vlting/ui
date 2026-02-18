import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const EventCardFrame = styled(YStack, {})

const EventCardTime = styled(YStack, {})

const EventCardTitle = styled(YStack, {})

const EventCardLocation = styled(YStack, {})

export const EventCard = withStaticProperties(EventCardFrame, {
  Time: EventCardTime,
  Title: EventCardTitle,
  Location: EventCardLocation,
})

export type EventCardProps = GetProps<typeof EventCardFrame>
