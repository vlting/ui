import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ChatThreadFrame = styled(YStack, {})

export type ChatThreadProps = GetProps<typeof ChatThreadFrame>

export const ChatThread = ChatThreadFrame
