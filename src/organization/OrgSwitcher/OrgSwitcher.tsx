import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const OrgSwitcherFrame = styled(YStack, {})

export type OrgSwitcherProps = GetProps<typeof OrgSwitcherFrame>

export const OrgSwitcher = OrgSwitcherFrame
