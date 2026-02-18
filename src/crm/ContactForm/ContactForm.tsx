import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const ContactFormFrame = styled(YStack, {})

export type ContactFormProps = GetProps<typeof ContactFormFrame>

export const ContactForm = ContactFormFrame
