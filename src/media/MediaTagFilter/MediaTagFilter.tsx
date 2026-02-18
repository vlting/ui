import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MediaTagFilterFrame = styled(YStack, {})

export type MediaTagFilterProps = GetProps<typeof MediaTagFilterFrame>

export const MediaTagFilter = MediaTagFilterFrame
