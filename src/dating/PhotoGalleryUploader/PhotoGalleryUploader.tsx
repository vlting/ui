import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PhotoGalleryUploaderFrame = styled(YStack, {})

export type PhotoGalleryUploaderProps = GetProps<typeof PhotoGalleryUploaderFrame>

export const PhotoGalleryUploader = PhotoGalleryUploaderFrame
