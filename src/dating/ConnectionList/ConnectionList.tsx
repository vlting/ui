import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ConnectionListFrame = styled(YStack, {})

export type ConnectionListProps = GetProps<typeof ConnectionListFrame>

export const ConnectionList = ConnectionListFrame
