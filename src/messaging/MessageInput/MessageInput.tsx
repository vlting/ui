import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MessageInputFrame = styled(YStack, {})

export type MessageInputProps = GetProps<typeof MessageInputFrame>

export const MessageInput = MessageInputFrame
