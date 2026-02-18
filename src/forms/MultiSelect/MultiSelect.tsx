import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MultiSelectFrame = styled(YStack, {})

export type MultiSelectProps = GetProps<typeof MultiSelectFrame>

export const MultiSelect = MultiSelectFrame
