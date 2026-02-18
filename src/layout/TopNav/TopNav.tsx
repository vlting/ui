import type { GetProps } from 'tamagui'
import { XStack, styled } from 'tamagui'

const TopNavFrame = styled(XStack, {})

export type TopNavProps = GetProps<typeof TopNavFrame>

export const TopNav = TopNavFrame
