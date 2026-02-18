import type { GetProps } from 'tamagui'
import { XStack, styled } from 'tamagui'

const PresenceIndicatorFrame = styled(XStack, {})

export type PresenceIndicatorProps = GetProps<typeof PresenceIndicatorFrame>

export const PresenceIndicator = PresenceIndicatorFrame
