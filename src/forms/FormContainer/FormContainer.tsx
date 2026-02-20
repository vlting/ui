import type { GetProps } from 'tamagui'
import { Text, XStack, YStack, styled, withStaticProperties } from 'tamagui'

// @ts-expect-error Tamagui v2 RC: styled() token defaults type inference bug
const FormContainerFrame = styled(YStack, {
  padding: '$4',
  gap: '$6',
})

// @ts-expect-error Tamagui v2 RC: styled() token defaults type inference bug
const FormContainerTitle = styled(Text, {
  fontSize: '$6',
  fontWeight: '700',
  color: '$color',
  lineHeight: '$6',
})

// @ts-expect-error Tamagui v2 RC: styled() token defaults type inference bug
const FormContainerDescription = styled(Text, {
  fontSize: '$3',
  color: '$color2',
  lineHeight: '$3',
})

// @ts-expect-error Tamagui v2 RC: styled() token defaults type inference bug
const FormContainerActions = styled(XStack, {
  gap: '$3',
  justifyContent: 'flex-end',
})

export const FormContainer = withStaticProperties(FormContainerFrame, {
  Title: FormContainerTitle,
  Description: FormContainerDescription,
  Actions: FormContainerActions,
})

export type FormContainerProps = GetProps<typeof FormContainerFrame>
