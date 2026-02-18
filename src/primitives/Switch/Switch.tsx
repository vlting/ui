import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SwitchFrame = styled(YStack, {})

export type SwitchProps = GetProps<typeof SwitchFrame>

export const Switch = SwitchFrame
