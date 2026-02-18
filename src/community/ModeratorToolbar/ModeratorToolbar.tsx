import type { GetProps } from 'tamagui'
import { XStack, styled } from 'tamagui'

const ModeratorToolbarFrame = styled(XStack, {})

export type ModeratorToolbarProps = GetProps<typeof ModeratorToolbarFrame>

export const ModeratorToolbar = ModeratorToolbarFrame
