import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const ErrorBoundaryFrame = styled(YStack, {})

export type ErrorBoundaryProps = GetProps<typeof ErrorBoundaryFrame>

export const ErrorBoundary = ErrorBoundaryFrame
