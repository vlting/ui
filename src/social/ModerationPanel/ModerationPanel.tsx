import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ModerationPanelFrame = styled(YStack, {})

export type ModerationPanelProps = GetProps<typeof ModerationPanelFrame>

export const ModerationPanel = ModerationPanelFrame
