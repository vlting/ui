import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const CommandPaletteFrame = styled(YStack, {})

export type CommandPaletteProps = GetProps<typeof CommandPaletteFrame>

export const CommandPalette = CommandPaletteFrame
