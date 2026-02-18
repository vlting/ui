import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PageHeaderFrame = styled(YStack, {})

export type PageHeaderProps = GetProps<typeof PageHeaderFrame>

export const PageHeader = PageHeaderFrame
