# Component Contract — DateRangePicker

## 1. Public API

### Base Props

`DateRangePicker` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: FieldWrapper, form sections, analytics filter bars, dashboard toolbars.

May contain: a start date input slot, an end date input slot, a calendar trigger, a calendar popover with a dual-month or single-month grid.

---

## 2. Behavioral Guarantees

- Idle (closed): start and end inputs show selected dates or placeholders.
  - Open (selecting start): calendar is open; user selects the start date.
  - Open (selecting end): start is committed; user hovers/navigates to select the end date; range preview highlights.
  - Range committed: both dates are selected; range is highlighted.
  - Day hover (end selection phase): preview range highlights from start to hovered date.
  - Day disabled: dates outside allowed range are non-interactive and muted.
  - Input error: invalid date entry triggers error state on the affected input.
- Controlled vs uncontrolled: start and end date values may be controlled (via props) or uncontrolled (internal state).
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: range highlight extension and calendar open/close animations respect reduced-motion preferences.

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
- Reduced motion: range highlight preview animation and calendar animation are suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: all DatePicker tokens, plus: range fill background, start cap background, end cap background, hover preview background.
- Prohibited hardcoded values: no hardcoded hex colors, pixel sizes, or font sizes.
- Dark mode: range highlight tokens must remain visually distinct and accessible in dark mode.

- Responsive behavior: on narrow viewports, a single-month calendar is used; navigation allows moving between months. Bottom-sheet presentation on mobile.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `DateRangePicker.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
