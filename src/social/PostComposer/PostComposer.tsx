import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PostComposerFrame = styled(YStack, {})

export type PostComposerProps = GetProps<typeof PostComposerFrame>

export const PostComposer = PostComposerFrame
