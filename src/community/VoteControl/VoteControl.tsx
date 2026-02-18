import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const VoteControlFrame = styled(YStack, {})

export type VoteControlProps = GetProps<typeof VoteControlFrame>

export const VoteControl = VoteControlFrame
