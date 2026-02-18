import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MagicLinkFormFrame = styled(YStack, {})

export type MagicLinkFormProps = GetProps<typeof MagicLinkFormFrame>

export const MagicLinkForm = MagicLinkFormFrame
