import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const DirectMessageThreadFrame = styled(YStack, {})

const DirectMessageThreadHeader = styled(YStack, {})

const DirectMessageThreadMessages = styled(YStack, {})

const DirectMessageThreadInput = styled(YStack, {})

export const DirectMessageThread = withStaticProperties(DirectMessageThreadFrame, {
  Header: DirectMessageThreadHeader,
  Messages: DirectMessageThreadMessages,
  Input: DirectMessageThreadInput,
})

export type DirectMessageThreadProps = GetProps<typeof DirectMessageThreadFrame>
