import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ProgressBarFrame = styled(YStack, {})

export type ProgressBarProps = GetProps<typeof ProgressBarFrame>

export const ProgressBar = ProgressBarFrame
