import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const AccordionFrame = styled(YStack, {})

export type AccordionProps = GetProps<typeof AccordionFrame>

export const Accordion = AccordionFrame
