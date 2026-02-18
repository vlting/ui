import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const CommunityHeaderFrame = styled(YStack, {})

export type CommunityHeaderProps = GetProps<typeof CommunityHeaderFrame>

export const CommunityHeader = CommunityHeaderFrame
