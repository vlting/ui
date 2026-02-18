import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const DialogFrame = styled(YStack, {})

export type DialogProps = GetProps<typeof DialogFrame>

export const Dialog = DialogFrame
