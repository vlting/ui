import type { GetProps } from 'tamagui'
import { YStack, styled } from 'tamagui'

const PlaceAutocompleteDropdownFrame = styled(YStack, {})

export type PlaceAutocompleteDropdownProps = GetProps<
  typeof PlaceAutocompleteDropdownFrame
>

export const PlaceAutocompleteDropdown = PlaceAutocompleteDropdownFrame
