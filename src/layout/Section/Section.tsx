import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SectionFrame = styled(YStack, {})

export type SectionProps = GetProps<typeof SectionFrame>

export const Section = SectionFrame
