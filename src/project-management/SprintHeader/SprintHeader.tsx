import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SprintHeaderFrame = styled(YStack, {})

export type SprintHeaderProps = GetProps<typeof SprintHeaderFrame>

export const SprintHeader = SprintHeaderFrame
