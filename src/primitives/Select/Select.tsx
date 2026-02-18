import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SelectFrame = styled(YStack, {})

export type SelectProps = GetProps<typeof SelectFrame>

export const Select = SelectFrame
