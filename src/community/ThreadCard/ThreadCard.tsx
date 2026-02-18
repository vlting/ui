import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ThreadCardFrame = styled(YStack, {})

export type ThreadCardProps = GetProps<typeof ThreadCardFrame>

export const ThreadCard = ThreadCardFrame
