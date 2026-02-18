import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const SavedPaymentMethodsListFrame = styled(YStack, {})

export type SavedPaymentMethodsListProps = GetProps<typeof SavedPaymentMethodsListFrame>

export const SavedPaymentMethodsList = SavedPaymentMethodsListFrame
