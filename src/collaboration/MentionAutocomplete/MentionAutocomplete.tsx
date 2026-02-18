import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const MentionAutocompleteFrame = styled(YStack, {})

export type MentionAutocompleteProps = GetProps<typeof MentionAutocompleteFrame>

export const MentionAutocomplete = MentionAutocompleteFrame
