import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const CheckboxFrame = styled(YStack, {})

export type CheckboxProps = GetProps<typeof CheckboxFrame>

export const Checkbox = CheckboxFrame
