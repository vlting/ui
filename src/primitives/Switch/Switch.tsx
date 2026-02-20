import type { GetProps } from 'tamagui'
import { Switch as TamaguiSwitch, Text, XStack, YStack, styled, withStaticProperties } from 'tamagui'

// ---------------------------------------------------------------------------
// Switch primitive — immediate binary toggle
//
// Spec: Switch.spec.md
// For settings that take effect immediately on change (notifications, dark
// mode, feature flags, privacy toggles).
// NOT for options requiring form submit (use Checkbox), mutually exclusive
// choices (use RadioGroup), or non-binary multi-state controls.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// SwitchControl — the pill-shaped toggle track + thumb
// ---------------------------------------------------------------------------

const SwitchControl = styled(TamaguiSwitch, {
  cursor: 'pointer',

  focusStyle: {
    outlineWidth: 2,
    outlineOffset: 2,
    outlineColor: '$outlineColor',
    outlineStyle: 'solid',
  },

  variants: {
    switchSize: {
      sm: { width: 36, height: 20 },
      md: { width: 44, height: 24 },
      lg: { width: 52, height: 28 },
    },
  } as const,

  defaultVariants: {
    switchSize: 'md',
  },
})

const SwitchThumb = TamaguiSwitch.Thumb

// ---------------------------------------------------------------------------
// SwitchRow — horizontal row with label on one side, control on the other
// Full row meets Fitts's Law touch target requirements.
// ---------------------------------------------------------------------------

const SwitchRow = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$2',
  minHeight: 44,
})

// ---------------------------------------------------------------------------
// SwitchLabelGroup — vertical stack containing label + description
// ---------------------------------------------------------------------------

const SwitchLabelGroup = styled(YStack, {
  gap: '$0.5',
  flex: 1,
})

// ---------------------------------------------------------------------------
// SwitchLabel — primary label text for the toggle
// ---------------------------------------------------------------------------

const SwitchLabel = styled(Text, {
  fontSize: '$3',
  lineHeight: '$3',
  fontWeight: '$2' as '400',
  color: '$color',
  fontFamily: '$body',
  userSelect: 'none' as const,
})

// ---------------------------------------------------------------------------
// SwitchDescription — supplemental descriptive text
// ---------------------------------------------------------------------------

const SwitchDescription = styled(Text, {
  fontSize: '$2',
  lineHeight: '$2',
  color: '$color2',
  fontFamily: '$body',
  userSelect: 'none' as const,
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const Switch = withStaticProperties(SwitchControl, {
  Thumb: SwitchThumb,
  Row: SwitchRow,
  LabelGroup: SwitchLabelGroup,
  Label: SwitchLabel,
  Description: SwitchDescription,
})

export type SwitchProps = GetProps<typeof SwitchControl>
