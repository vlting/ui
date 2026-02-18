import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ConfirmDialogFrame = styled(YStack, {})

export type ConfirmDialogProps = GetProps<typeof ConfirmDialogFrame>

export const ConfirmDialog = ConfirmDialogFrame
