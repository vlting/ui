import type { GetProps } from 'tamagui'
import { Checkbox as TamaguiCheckbox, Text, XStack, YStack, styled, withStaticProperties } from 'tamagui'

// ---------------------------------------------------------------------------
// Checkbox primitive — binary/tri-state selection control
//
// Spec: Checkbox.spec.md
// For independent boolean options and multi-select lists.
// NOT for mutually exclusive options (use RadioGroup) or immediate settings
// toggles (use Switch).
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// CheckboxControl — the native Tamagui checkbox
// Handles checked / unchecked / indeterminate states and keyboard behavior.
// ---------------------------------------------------------------------------

const CheckboxControl = styled(TamaguiCheckbox, {
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$2',
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

  variants: {
    error: {
      true: {
        borderColor: '$red10',
      },
    },
  } as const,
})

const CheckboxIndicator = TamaguiCheckbox.Indicator

// ---------------------------------------------------------------------------
// CheckboxRow — outer horizontal layout containing control + label group
// The full row is tappable to meet Fitts's Law 44pt minimum.
// ---------------------------------------------------------------------------

const CheckboxRow = styled(XStack, {
  alignItems: 'flex-start',
  gap: '$2',
  cursor: 'pointer',
  minHeight: 44,
})

// ---------------------------------------------------------------------------
// CheckboxLabelGroup — vertical stack for label + description
// ---------------------------------------------------------------------------

const CheckboxLabelGroup = styled(YStack, {
  gap: '$0.5',
  flex: 1,
})

// ---------------------------------------------------------------------------
// CheckboxLabel — primary label text
// ---------------------------------------------------------------------------

const CheckboxLabel = styled(Text, {
  fontSize: '$3',
  lineHeight: '$3',
  fontWeight: '$2' as '400',
  color: '$color',
  fontFamily: '$body',
  userSelect: 'none' as const,
})

// ---------------------------------------------------------------------------
// CheckboxDescription — secondary descriptive text
// ---------------------------------------------------------------------------

const CheckboxDescription = styled(Text, {
  fontSize: '$2',
  lineHeight: '$2',
  color: '$color2',
  fontFamily: '$body',
  userSelect: 'none' as const,
})

// ---------------------------------------------------------------------------
// CheckboxError — error message below the checkbox
// ---------------------------------------------------------------------------

const CheckboxError = styled(Text, {
  fontSize: '$2',
  lineHeight: '$2',
  color: '$red10',
  fontFamily: '$body',
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const Checkbox = withStaticProperties(CheckboxControl, {
  Indicator: CheckboxIndicator,
  Row: CheckboxRow,
  LabelGroup: CheckboxLabelGroup,
  Label: CheckboxLabel,
  Description: CheckboxDescription,
  Error: CheckboxError,
})

export type CheckboxProps = GetProps<typeof CheckboxControl>
