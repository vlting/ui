import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const AccountSwitcherFrame = styled(YStack, {})

export type AccountSwitcherProps = GetProps<typeof AccountSwitcherFrame>

export const AccountSwitcher = AccountSwitcherFrame
