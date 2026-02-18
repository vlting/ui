import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ToastFrame = styled(YStack, {})

export type ToastProps = GetProps<typeof ToastFrame>

export const Toast = ToastFrame
