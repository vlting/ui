import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const LabelFrame = styled(YStack, {})

export type LabelProps = GetProps<typeof LabelFrame>

export const Label = LabelFrame
