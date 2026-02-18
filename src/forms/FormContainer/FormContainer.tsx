import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const FormContainerFrame = styled(YStack, {})

const FormContainerTitle = styled(YStack, {})

const FormContainerDescription = styled(YStack, {})

const FormContainerActions = styled(YStack, {})

export const FormContainer = withStaticProperties(FormContainerFrame, {
  Title: FormContainerTitle,
  Description: FormContainerDescription,
  Actions: FormContainerActions,
})

export type FormContainerProps = GetProps<typeof FormContainerFrame>
