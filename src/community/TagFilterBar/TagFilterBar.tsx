import type { GetProps } from 'tamagui'
import { XStack, styled } from 'tamagui'

const TagFilterBarFrame = styled(XStack, {})

export type TagFilterBarProps = GetProps<typeof TagFilterBarFrame>

export const TagFilterBar = TagFilterBarFrame
