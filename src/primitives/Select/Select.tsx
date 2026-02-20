import type { GetProps } from 'tamagui'
import { Select as TamaguiSelect, withStaticProperties } from 'tamagui'

// ---------------------------------------------------------------------------
// Select primitive — dropdown selection control
//
// Spec: Select.spec.md
// Compact dropdown for selecting one option from a list of 4+ items.
// NOT for 2–3 mutually exclusive options (use RadioGroup), for multi-select
// (use a multi-select variant), or for navigation.
//
// This component re-exports the full Tamagui Select compound API while
// making it the design system's canonical Select — consistent theming and
// token usage are enforced via the TamaguiProvider configuration.
// ---------------------------------------------------------------------------

export const Select = withStaticProperties(TamaguiSelect, {
  // Trigger — the visible button that opens the dropdown
  Trigger: TamaguiSelect.Trigger,
  // Value — displays the currently selected value inside the trigger
  Value: TamaguiSelect.Value,
  // Content — the dropdown panel
  Content: TamaguiSelect.Content,
  // Scroll controls inside the dropdown panel
  ScrollUpButton: TamaguiSelect.ScrollUpButton,
  ScrollDownButton: TamaguiSelect.ScrollDownButton,
  // Viewport — the scrollable option list
  Viewport: TamaguiSelect.Viewport,
  // Item — an individual selectable option
  Item: TamaguiSelect.Item,
  // ItemText — the visible text inside an Item
  ItemText: TamaguiSelect.ItemText,
  // ItemIndicator — checkmark or similar indicator on the selected item
  ItemIndicator: TamaguiSelect.ItemIndicator,
  // Group — logical grouping of options
  Group: TamaguiSelect.Group,
  // Label — a group header label
  Label: TamaguiSelect.Label,
  // Sheet — bottom sheet fallback on mobile
  Sheet: TamaguiSelect.Sheet,
})

export type SelectProps = GetProps<typeof TamaguiSelect>
