import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const CancellationFlowDialogFrame = styled(YStack, {})

export type CancellationFlowDialogProps = GetProps<typeof CancellationFlowDialogFrame>

export const CancellationFlowDialog = CancellationFlowDialogFrame
