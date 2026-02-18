import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PrivacySettingsPanelFrame = styled(YStack, {})

export type PrivacySettingsPanelProps = GetProps<typeof PrivacySettingsPanelFrame>

export const PrivacySettingsPanel = PrivacySettingsPanelFrame
