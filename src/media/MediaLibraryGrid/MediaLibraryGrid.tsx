import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MediaLibraryGridFrame = styled(YStack, {})

export type MediaLibraryGridProps = GetProps<typeof MediaLibraryGridFrame>

export const MediaLibraryGrid = MediaLibraryGridFrame
