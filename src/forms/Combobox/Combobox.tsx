import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ComboboxFrame = styled(YStack, {})

export type ComboboxProps = GetProps<typeof ComboboxFrame>

export const Combobox = ComboboxFrame
