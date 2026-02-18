import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const NotFoundStateFrame = styled(YStack, {})

export type NotFoundStateProps = GetProps<typeof NotFoundStateFrame>

export const NotFoundState = NotFoundStateFrame
