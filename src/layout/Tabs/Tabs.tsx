import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const TabsFrame = styled(YStack, {})

export type TabsProps = GetProps<typeof TabsFrame>

export const Tabs = TabsFrame
