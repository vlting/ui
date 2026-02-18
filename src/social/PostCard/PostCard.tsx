import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const PostCardFrame = styled(YStack, {})

const PostCardHeader = styled(YStack, {})

const PostCardContent = styled(YStack, {})

const PostCardMedia = styled(YStack, {})

const PostCardActions = styled(YStack, {})

export const PostCard = withStaticProperties(PostCardFrame, {
  Header: PostCardHeader,
  Content: PostCardContent,
  Media: PostCardMedia,
  Actions: PostCardActions,
})

export type PostCardProps = GetProps<typeof PostCardFrame>
