import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

// TODO: implement behavioral logic (gestures, state, etc.)
const SharedCursorOverlayFrame = styled(YStack, {})

export type SharedCursorOverlayProps = GetProps<typeof SharedCursorOverlayFrame>

export const SharedCursorOverlay = SharedCursorOverlayFrame
