import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ThreadListFrame = styled(YStack, {})

export type ThreadListProps = GetProps<typeof ThreadListFrame>

export const ThreadList = ThreadListFrame
