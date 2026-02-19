# Component Contract — Combobox

## 1. Public API

### Base Props

`Combobox` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: FieldWrapper, form sections, filter bars, page headers.

May contain: an input slot, a trailing icon slot (clear, chevron), a dropdown/popover slot with a listbox of option items, a no-results slot, a loading slot.

---

## 2. Behavioral Guarantees

- Idle (closed): input shows selected value or placeholder.
  - Open: dropdown is visible; options are filtered by the current input value.
  - Typing: input value changes; option list filters in real time.
  - Option highlighted: keyboard or pointer-highlighted option receives a distinct background token.
  - Option selected: selected option is highlighted in the list and its label appears in the input.
  - No results: when filtering yields no matches, a "No results" message occupies the dropdown.
  - Disabled: input is non-interactive and visually de-emphasized.
  - Error: input displays an error border and error token styling.
  - Loading: if options are fetched asynchronously, a loading indicator appears in the dropdown.
- Controlled vs uncontrolled: value and open state may be controlled (via props) or uncontrolled (internal state).
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
- Reduced motion: dropdown animation is suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: input background, input border (default, focus, error), input text, placeholder text, dropdown background, option background (default, hover, selected), option text, secondary text, no-results text, loading indicator color, focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode.

- Responsive behavior: on narrow viewports, the dropdown may expand to full-screen or sheet-based picker. Touch targets meet minimum size.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Combobox.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
