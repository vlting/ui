import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PaginationFrame = styled(YStack, {})

export type PaginationProps = GetProps<typeof PaginationFrame>

export const Pagination = PaginationFrame
