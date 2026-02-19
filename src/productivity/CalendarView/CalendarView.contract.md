# Component Contract — CalendarView

## 1. Public API

### Base Props

`CalendarView` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Page-level layout containers, modal/drawer surfaces, or a panel alongside a detail view.

May contain: Day cells may contain small event indicator dots or short event label chips to communicate scheduling density.

---

## 2. Behavioral Guarantees

- Idle: Full grid visible, today highlighted.
  - Hover (web): Day cell shows a subtle background highlight on hover.
  - Focus: Focused day cell shows a clearly visible focus ring (keyboard navigation).
  - Active/Selected: Selected day or range is highlighted with the primary accent token.
  - Disabled: Days outside the allowed selectable range appear de-emphasized and are not interactive.
  - Loading: If event data is loading, event indicators within cells show a placeholder/skeleton state.
- Controlled vs uncontrolled: Supports both. In uncontrolled mode, internal state manages the visible month and selected date. In controlled mode, the parent supplies the current month and selected date.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Month-to-month transitions may animate with a horizontal slide. This animation must be suppressed when the user has enabled reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: Focus is managed within the grid. When the month changes via keyboard, focus moves to the equivalent day in the new month. Focus must not escape the grid unintentionally.
- Contrast expectations: Day number text must meet a minimum 4.5:1 contrast ratio against the cell background. De-emphasized (out-of-month) text must meet at least 3:1.
- Reduced motion behavior: Slide transitions between months are disabled. Month changes are instant.

---

## 4. Styling Guarantees

- Required tokens: background color, surface color, primary accent (for selected state), text primary, text secondary (for out-of-month days and weekday headers), border color, focus ring color, radius.
- Prohibited hardcoded values: No hardcoded hex colors, pixel spacing values, or font sizes. All values must reference design tokens.
- Dark mode expectations: All surface and text tokens must resolve to appropriate dark-mode values automatically when the dark theme is active. Today and selected states must remain clearly distinguishable in dark mode.
- Layout rules:
- Responsive behavior: On narrow viewports, day cells compress but maintain minimum touch target size. In very narrow contexts the component may switch to a week-strip view.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `CalendarView.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
