import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const MediaCardFrame = styled(YStack, {})

const MediaCardThumbnail = styled(YStack, {})

const MediaCardTitle = styled(YStack, {})

const MediaCardMeta = styled(YStack, {})

export const MediaCard = withStaticProperties(MediaCardFrame, {
  Thumbnail: MediaCardThumbnail,
  Title: MediaCardTitle,
  Meta: MediaCardMeta,
})

export type MediaCardProps = GetProps<typeof MediaCardFrame>
