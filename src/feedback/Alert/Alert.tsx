import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const AlertFrame = styled(YStack, {})

export type AlertProps = GetProps<typeof AlertFrame>

export const Alert = AlertFrame
