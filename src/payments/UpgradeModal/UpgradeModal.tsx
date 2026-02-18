import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const UpgradeModalFrame = styled(YStack, {})

export type UpgradeModalProps = GetProps<typeof UpgradeModalFrame>

export const UpgradeModal = UpgradeModalFrame
