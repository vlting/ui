# Component Contract — ExportDataButton

## 1. Public API

### Base Props

`ExportDataButton` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: `ChartWrapper` actions slot, `AnalyticsFilterBar`, a dashboard toolbar, a data table header.

May contain: a text label slot, a leading or trailing icon slot, a loading/status indicator slot, and an optional format-selection menu.

---

## 2. Behavioral Guarantees

- In `idle` state: fully interactive, displays the export label and icon.
- In `hover` state: background shifts to the hover variant token.
- In `focus` state: visible focus ring using the focus color token.
- In `active / pressed` state: visual press feedback using the active variant token.
- In `loading` state: label is supplemented by a loading indicator; the button is non-interactive; `aria-busy="true"` is set.
- In `disabled` state: visually dimmed; pointer events removed; `aria-disabled="true"` is set.
- In `success` state: transient success indicator before returning to idle.
- In `error` state: transient error indicator before returning to idle.
- Controlled vs uncontrolled: loading and disabled states are always controlled externally via props.
- Keyboard behavior: activatable with Enter or Space; if a format-selection menu is present, pressing Enter or Space opens it; Escape closes the menu.
- Screen reader behavior: button has a descriptive accessible name (e.g., "Export data as CSV"); `aria-busy="true"` is set during loading; success/error states are announced via `aria-live`.
- Motion rules: loading spinner and success/error transitions use `duration.fast`; reduced motion disables all animations and uses text-only status changes.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: the button has a non-empty `aria-label` or visible text; `aria-disabled="true"` is used in preference to the HTML `disabled` attribute to keep it in the tab order when needed; `aria-busy="true"` is set during loading; a status `aria-live` region announces export completion or failure.
- Focus rules: focus ring is always visible on keyboard navigation; focus is not lost after the export action resolves.
- Contrast expectations: button label and icon meet WCAG AA (4.5:1 for text, 3:1 for button boundary) in all states and in both light and dark themes.
- Reduced motion behavior: loading spinner and state-transition animations are disabled; status is communicated via text changes or `aria-live` only.

---

## 4. Styling Guarantees

- Required tokens: button background (idle, hover, active, disabled), button text color (idle, disabled), button border (if outlined variant), focus ring color, loading indicator color, icon color.
- Prohibited hardcoded values: no raw hex codes, pixel padding, or font sizes.
- Dark mode expectations: all button state tokens must have dark-mode variants; the loading indicator must remain visible against both light and dark button backgrounds.
- Layout rules: renders as an inline-flex element; width is content-driven by default; may accept a full-width prop; includes a leading or trailing icon slot for the export/download icon.
- Responsive behavior: on mobile, the button may expand to full width; icon and label remain horizontally aligned.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `ExportDataButton.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
