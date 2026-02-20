import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const ConnectionCardFrame = styled(YStack, {})

const ConnectionCardPhoto = styled(YStack, {})

const ConnectionCardName = styled(YStack, {})

const ConnectionCardLastMessage = styled(YStack, {})

export const ConnectionCard = withStaticProperties(ConnectionCardFrame, {
  Photo: ConnectionCardPhoto,
  Name: ConnectionCardName,
  LastMessage: ConnectionCardLastMessage,
})

export type ConnectionCardProps = GetProps<typeof ConnectionCardFrame>
