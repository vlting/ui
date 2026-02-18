import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const TriggerSelectorFrame = styled(YStack, {})

export type TriggerSelectorProps = GetProps<typeof TriggerSelectorFrame>

export const TriggerSelector = TriggerSelectorFrame
