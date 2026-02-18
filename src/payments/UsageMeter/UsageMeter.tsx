import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const UsageMeterFrame = styled(YStack, {})

export type UsageMeterProps = GetProps<typeof UsageMeterFrame>

export const UsageMeter = UsageMeterFrame
