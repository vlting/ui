import type { GetProps } from 'tamagui'
import { XStack, styled } from 'tamagui'

const BreadcrumbsFrame = styled(XStack, {})

export type BreadcrumbsProps = GetProps<typeof BreadcrumbsFrame>

export const Breadcrumbs = BreadcrumbsFrame
