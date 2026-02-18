import type { GetProps } from 'tamagui'
import { XStack, styled } from 'tamagui'

const BottomTabsFrame = styled(XStack, {})

export type BottomTabsProps = GetProps<typeof BottomTabsFrame>

export const BottomTabs = BottomTabsFrame
