import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SpinnerFrame = styled(YStack, {})

export type SpinnerProps = GetProps<typeof SpinnerFrame>

export const Spinner = SpinnerFrame
