import type { GetProps } from 'tamagui'
import { YStack, styled, withStaticProperties } from 'tamagui'

const PreferenceEditorFrame = styled(YStack, {})

const PreferenceEditorAgeRange = styled(YStack, {})

const PreferenceEditorInterests = styled(YStack, {})

const PreferenceEditorLocation = styled(YStack, {})

const PreferenceEditorDealBreakers = styled(YStack, {})

export const PreferenceEditor = withStaticProperties(PreferenceEditorFrame, {
  AgeRange: PreferenceEditorAgeRange,
  Interests: PreferenceEditorInterests,
  Location: PreferenceEditorLocation,
  DealBreakers: PreferenceEditorDealBreakers,
})

export type PreferenceEditorProps = GetProps<typeof PreferenceEditorFrame>
