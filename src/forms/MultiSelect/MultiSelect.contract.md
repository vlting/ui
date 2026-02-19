# Component Contract — MultiSelect

## 1. Public API

### Base Props

`MultiSelect` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: form field wrappers, filter bars, modal bodies, page-level filter panels. Must be a descendant of the design system Provider.

May contain: a trigger area (chips + placeholder + chevron), an option panel (option rows with checkmarks), and an optional search/filter input within the panel.

---

## 2. Behavioral Guarantees

- Idle (closed): trigger shows current selection summary or placeholder.
  - Open: option panel is visible; options are individually checkable.
  - Hover (option): option row highlights using token-based hover color.
  - Focus (trigger or option): visible focus ring.
  - Active (option): brief press feedback on selection toggle.
  - Disabled (entire control): non-interactive, reduced opacity.
  - Disabled (individual option): option row non-interactive, visually muted.
  - Error: trigger border changes to error token color; error message rendered below.
- Controlled vs uncontrolled: supports both patterns. Controlled mode accepts a value array and onChange callback. Uncontrolled mode manages internal selection state.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: panel open/close animates with a short fade or slide only when reduced motion is not preferred.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: opening the panel moves focus to the first option or the search input if present. Closing returns focus to the trigger.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress all entrance/exit animations; show/hide panel immediately.

---

## 4. Styling Guarantees

- Required tokens: trigger background, trigger border, trigger text, placeholder text color, option hover background, selected option background, chip background, chip text, chip remove icon color, error border color, disabled opacity.
- Prohibited hardcoded values: no hardcoded colors, spacing values, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; chip and option highlight colors must remain legible against dark backgrounds.

- Responsive behavior: on small screens the option list may render as a bottom sheet or modal instead of an inline popover, preserving usability on narrow viewports.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `MultiSelect.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
