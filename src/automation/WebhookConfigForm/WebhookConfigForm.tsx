import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const WebhookConfigFormFrame = styled(YStack, {})

export type WebhookConfigFormProps = GetProps<typeof WebhookConfigFormFrame>

export const WebhookConfigForm = WebhookConfigFormFrame
