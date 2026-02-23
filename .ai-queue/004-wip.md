<!-- auto-queue -->
# Rewrite Checkbox + RadioGroup + Switch + Select using Tamagui official components

## Context

This is part of a broader effort to leverage Tamagui's official component packages instead of building from scratch with `styled(XStack/View)`. Tamagui's components render correct semantic HTML, handle ARIA attributes, and support keyboard navigation out of the box. They all use theme tokens (`$background`, `$borderColor`, etc.) that our brand system provides.

## Implementation

### Checkbox (`packages/components/Checkbox/Checkbox.tsx`)

Replace with `@tamagui/checkbox`.

```tsx
import { Checkbox as TamaguiCheckbox, createCheckbox, CheckboxStyledContext } from '@tamagui/checkbox'
```

1. Tamagui's Checkbox renders `<button>` with a hidden `<input type="checkbox">` for form integration.
2. It supports: `checked`, `defaultChecked`, `onCheckedChange`, `size`, `disabled`, `aria-checked` (including `mixed` for indeterminate).
3. **Two options for customization:**
   - **Option A**: `styled(TamaguiCheckbox, { ...variants })` — extend default Checkbox with our styles.
   - **Option B**: `createCheckbox({ Frame: OurCheckboxFrame, Indicator: OurIndicator })` — factory pattern for deep customization. Use this if we need significantly different visuals.
4. Preserve our compound API: `Checkbox.Root`, `Checkbox.Indicator`.
5. **Remove our headless Checkbox** dependency — Tamagui provides the behavior built-in.
6. Map sizes: `sm → '$3'`, `md → '$4'`, `lg → '$5'`.

### RadioGroup (`packages/components/RadioGroup/RadioGroup.tsx`)

Replace with `@tamagui/radio-group`.

```tsx
import { RadioGroup as TamaguiRadioGroup, createRadioGroup } from '@tamagui/radio-group'
```

1. Tamagui's RadioGroup renders items as `<button>` with hidden `<input type="radio">` for forms.
2. It supports: `value`, `defaultValue`, `onValueChange`, `required`, `disabled`, `name`, `orientation`, `aria-checked`, roving tabindex, arrow-key navigation.
3. Use `createRadioGroup({ Frame, Item, Indicator })` factory if we want custom visuals, or `styled()` wrap the defaults.
4. Preserve our compound API: `RadioGroup.Root`, `RadioGroup.Item` (add `.Indicator` from Tamagui).
5. Remove our custom `useControllableState` usage — Tamagui handles this internally.
6. Map sizes as above.

### Switch (`packages/components/Switch/Switch.tsx`)

Replace with `@tamagui/switch`.

```tsx
import { Switch as TamaguiSwitch, createSwitch } from '@tamagui/switch'
```

1. Tamagui's Switch renders `<button>` with hidden checkbox input for forms.
2. It supports: `checked`, `defaultChecked`, `onCheckedChange`, `size`, `disabled`, `role="switch"`, `aria-checked`.
3. It has a `Switch.Thumb` sub-component with animated toggle.
4. Use `createSwitch({ Frame, Thumb })` for custom visuals, or `styled()` wrap defaults.
5. Preserve our props API: `checked`, `defaultChecked`, `onCheckedChange`, `size`, `disabled`.
6. Add `Switch.Thumb` to our compound export.

### Select (`packages/components/Select/Select.tsx`)

Replace with `@tamagui/select`.

```tsx
import { Select as TamaguiSelect } from '@tamagui/select'
```

1. Tamagui's Select is a comprehensive compound component: `Select.Trigger`, `Select.Content`, `Select.Item`, `Select.ItemText`, `Select.Value`, `Select.Icon`, `Select.Group`, `Select.Label`, `Select.Viewport`, `Select.ScrollUpButton`, `Select.ScrollDownButton`.
2. Trigger renders `<button>` with `role="combobox"`.
3. Supports: `value`, `defaultValue`, `onValueChange`, `open`, `defaultOpen`, `onOpenChange`, `size`, keyboard navigation, Escape to close.
4. Has `native="web"` mode that renders a native `<select>` element.
5. Supports `Adapt` for responsive behavior (Sheet on mobile).
6. `styled()` wrap sub-components for our visual customization.
7. Preserve our simplified API: `Select.Item` with `value` and `children`. Map our API to Tamagui's more granular compound structure.
8. Remove ALL our custom state management (open/close, keyboard nav, click outside, focus management) — Tamagui handles it all.

## Key Patterns

Same as task 003:
1. Import Tamagui component
2. `styled()` wrap with our variants/theme overrides
3. Wrapper React component if needed for API compatibility
4. Export same name and props interface
5. Remove custom hooks/state that Tamagui handles

## Verification

After changes:
- Checkbox: renders `<button>` with hidden `<input type="checkbox">`, `aria-checked` works
- RadioGroup: items render `<button>` with hidden `<input type="radio">`, arrow-key nav works
- Switch: renders `<button role="switch">` with animated thumb
- Select: trigger renders `<button role="combobox">`, dropdown opens/closes, keyboard nav works
- All respond to brand theme changes

## Scope

- `packages/components/Checkbox/Checkbox.tsx`
- `packages/components/RadioGroup/RadioGroup.tsx`
- `packages/components/Switch/Switch.tsx`
- `packages/components/Select/Select.tsx`
