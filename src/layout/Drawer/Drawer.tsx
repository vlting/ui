import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const DrawerFrame = styled(YStack, {})

export type DrawerProps = GetProps<typeof DrawerFrame>

export const Drawer = DrawerFrame
