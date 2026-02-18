import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const FieldWrapperFrame = styled(YStack, {})

const FieldWrapperLabel = styled(YStack, {})

const FieldWrapperInput = styled(YStack, {})

const FieldWrapperError = styled(YStack, {})

const FieldWrapperHelper = styled(YStack, {})

export const FieldWrapper = withStaticProperties(FieldWrapperFrame, {
  Label: FieldWrapperLabel,
  Input: FieldWrapperInput,
  Error: FieldWrapperError,
  Helper: FieldWrapperHelper,
})

export type FieldWrapperProps = GetProps<typeof FieldWrapperFrame>
