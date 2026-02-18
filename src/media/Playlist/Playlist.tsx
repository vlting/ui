import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PlaylistFrame = styled(YStack, {})

export type PlaylistProps = GetProps<typeof PlaylistFrame>

export const Playlist = PlaylistFrame
