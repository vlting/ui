import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MatchListFrame = styled(YStack, {})

export type MatchListProps = GetProps<typeof MatchListFrame>

export const MatchList = MatchListFrame
