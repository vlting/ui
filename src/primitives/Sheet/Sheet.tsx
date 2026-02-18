import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SheetFrame = styled(YStack, {})

export type SheetProps = GetProps<typeof SheetFrame>

export const Sheet = SheetFrame
