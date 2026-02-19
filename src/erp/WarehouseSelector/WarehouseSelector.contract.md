# Component Contract — WarehouseSelector

## 1. Public API

### Base Props

`WarehouseSelector` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

| Category | Examples |
|----------|---------|
| Layout | `width`, `height`, `minWidth`, `maxWidth`, `flex`, `flexDirection` |
| Spacing | `padding`, `paddingHorizontal`, `margin`, `gap` (space tokens) |
| Visual | `backgroundColor`, `borderColor`, `borderRadius`, `opacity` |
| Theme | `theme`, `themeInverse` |
| Animation | `animation`, `enterStyle`, `exitStyle` |
| Accessibility | `accessible`, `accessibilityLabel`, `accessibilityRole`, `aria-*` |
| Events | `onPress`, `onHoverIn`, `onHoverOut`, `onFocus`, `onBlur` |

### Component-Specific Props

No additional props are defined in the current stub implementation. Props specific to the component's behavior (e.g., data, state, callbacks) are to be defined when behavioral logic is implemented per the `.spec.md`.

### Composition Context

Intended to be wrapped by: form sections, filter bars, page headers, FieldWrapper.

May contain: a trigger slot, a dropdown/popover slot containing a list of warehouse option items, an optional search input, an optional loading slot, an optional empty state slot.

---

## 2. Behavioral Guarantees

- Idle (closed): trigger shows selected value or placeholder.
  - Open: dropdown/popover is visible; first option or selected option is focused.
  - Hover: hovered option receives a background color shift via tokens.
  - Focus: keyboard-focused option receives a visible focus ring.
  - Selected: selected option receives a selected background and/or check indicator.
  - Disabled: disabled trigger is non-interactive and visually de-emphasized.
  - Loading: if warehouse options are fetched asynchronously, a loading indicator appears within the dropdown.
  - Empty: if no warehouses are available, an empty state message appears within the dropdown.
- Controlled vs uncontrolled: selection state may be controlled (via value/onChange props) or uncontrolled (internal state).
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: dropdown open/close animation respects reduced-motion preferences.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus must be visible and never trapped.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: open/close animations are suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: trigger background, trigger border (default, focus, open), trigger text, placeholder text, dropdown background, option background (default, hover, selected), option text, selected indicator color, focus ring color, loading indicator color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode.

- Responsive behavior: on narrow viewports, the selector may expand to a full-screen or sheet-based picker. Touch targets for options meet minimum size requirements.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `WarehouseSelector.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
