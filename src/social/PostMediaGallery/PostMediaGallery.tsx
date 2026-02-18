import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PostMediaGalleryFrame = styled(YStack, {})

export type PostMediaGalleryProps = GetProps<typeof PostMediaGalleryFrame>

export const PostMediaGallery = PostMediaGalleryFrame
