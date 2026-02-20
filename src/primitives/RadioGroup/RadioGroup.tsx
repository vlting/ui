import type { GetProps } from 'tamagui'
import { RadioGroup as TamaguiRadioGroup, Text, XStack, YStack, styled, withStaticProperties } from 'tamagui'

// ---------------------------------------------------------------------------
// RadioGroup primitive — mutually exclusive selection
//
// Spec: RadioGroup.spec.md
// For choosing exactly one option from a small, known set (2–7 options).
// NOT for independent boolean options (use Checkbox), for 4+ options where
// space is constrained (use Select), or for immediate toggles (use Switch).
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// RadioGroupItem — individual radio option control
// Uses Tamagui's built-in RadioGroup.Item
// ---------------------------------------------------------------------------

const RadioGroupItem = styled(TamaguiRadioGroup.Item, {
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: 9999,
  backgroundColor: '$background',
  width: 20,
  height: 20,
  minWidth: 20,
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  focusStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },
})

const RadioGroupIndicator = TamaguiRadioGroup.Indicator

// ---------------------------------------------------------------------------
// RadioItemRow — horizontal row containing control + label
// Full row is tappable for Fitts's Law compliance.
// ---------------------------------------------------------------------------

const RadioItemRow = styled(XStack, {
  alignItems: 'flex-start',
  gap: '$2',
  cursor: 'pointer',
  minHeight: 44,
})

// ---------------------------------------------------------------------------
// RadioItemLabelGroup — vertical stack for label + description
// ---------------------------------------------------------------------------

const RadioItemLabelGroup = styled(YStack, {
  gap: '$0.5',
  flex: 1,
})

// ---------------------------------------------------------------------------
// RadioItemLabel — label text for an individual radio option
// ---------------------------------------------------------------------------

const RadioItemLabel = styled(Text, {
  fontSize: '$3',
  lineHeight: '$3',
  fontWeight: '$2' as '400',
  color: '$color',
  fontFamily: '$body',
  userSelect: 'none' as const,
})

// ---------------------------------------------------------------------------
// RadioItemDescription — supplemental description for a radio option
// ---------------------------------------------------------------------------

const RadioItemDescription = styled(Text, {
  fontSize: '$2',
  lineHeight: '$2',
  color: '$color2',
  fontFamily: '$body',
  userSelect: 'none' as const,
})

// ---------------------------------------------------------------------------
// RadioGroupLabel — group-level label (legend)
// ---------------------------------------------------------------------------

const RadioGroupLabel = styled(Text, {
  fontSize: '$3',
  lineHeight: '$3',
  fontWeight: '$3' as '500',
  color: '$color',
  fontFamily: '$body',
})

// ---------------------------------------------------------------------------
// RadioGroupError — group-level error message
// ---------------------------------------------------------------------------

const RadioGroupError = styled(Text, {
  fontSize: '$2',
  lineHeight: '$2',
  color: '$red10',
  fontFamily: '$body',
})

// ---------------------------------------------------------------------------
// RadioGroupContainer — vertical stack containing all radio items
// ---------------------------------------------------------------------------

const RadioGroupContainer = styled(YStack, {
  gap: '$1',
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const RadioGroup = withStaticProperties(TamaguiRadioGroup, {
  Item: RadioGroupItem,
  Indicator: RadioGroupIndicator,
  ItemRow: RadioItemRow,
  ItemLabelGroup: RadioItemLabelGroup,
  ItemLabel: RadioItemLabel,
  ItemDescription: RadioItemDescription,
  GroupLabel: RadioGroupLabel,
  Error: RadioGroupError,
  Container: RadioGroupContainer,
})

export type RadioGroupProps = GetProps<typeof TamaguiRadioGroup>
