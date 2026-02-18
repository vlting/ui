import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const TooltipFrame = styled(YStack, {})

export type TooltipProps = GetProps<typeof TooltipFrame>

export const Tooltip = TooltipFrame
