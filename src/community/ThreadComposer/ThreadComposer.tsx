import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ThreadComposerFrame = styled(YStack, {})

export type ThreadComposerProps = GetProps<typeof ThreadComposerFrame>

export const ThreadComposer = ThreadComposerFrame
