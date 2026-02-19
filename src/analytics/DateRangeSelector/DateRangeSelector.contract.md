# Component Contract — DateRangeSelector

## 1. Public API

### Base Props

`DateRangeSelector` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: `AnalyticsFilterBar`, a chart header actions slot, a report configuration panel.

May contain: a trigger element, a popover/sheet container, a preset options list, a calendar grid (or two for dual-month range selection), and a confirm/cancel action row.

---

## 2. Behavioral Guarantees

- In `idle / closed` state: trigger displays the current range label.
- In `open` state: popover/sheet is visible with preset list and calendar.
- In `preset selected` state: the corresponding preset is highlighted; calendar updates to reflect the range.
  - **custom range — start selected**: first date highlighted; user can now select the end date.
  - **custom range — range selected**: the range between start and end is shaded in the calendar.
- In `disabled` state: trigger is non-interactive and visually dimmed.
- Controlled vs uncontrolled: selected range value is always controlled externally via props; open/closed state may be uncontrolled internally or controlled via props.
- Keyboard behavior: Enter or Space opens the popover; within the popover, arrow keys navigate calendar days; Enter selects a date; Escape closes the popover and returns focus to the trigger; Tab moves through the preset list and calendar controls.
- Screen reader behavior: trigger announces the current range; calendar grid has `aria-label` for the month; each day cell has `aria-label` with the full date; selected dates have `aria-selected="true"`; the range between start and end cells has `aria-selected="true"` and descriptive labels.
- Motion rules: popover open/close uses `duration.fast`; calendar month transitions use `duration.fast`; reduced motion disables all animations.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: trigger has `aria-haspopup="dialog"` and `aria-expanded`; the popover has `role="dialog"` with `aria-label`; calendar grid has `role="grid"`; day cells have `role="gridcell"` with `aria-label` and `aria-selected`.
- Focus rules: on open, focus moves to the first focusable element inside the popover; on close, focus returns to the trigger; focus must be trapped within the popover while it is open.
- Contrast expectations: selected range background meets WCAG AA 3:1 non-text contrast against the calendar background; day number text meets AA (4.5:1) in all states.
- Reduced motion behavior: popover open/close and calendar transitions are disabled; state changes are reflected immediately.

---

## 4. Styling Guarantees

- Required tokens: trigger background, trigger border, trigger text color, popover background, popover border, popover shadow, calendar day hover token, calendar selection fill token, today marker token, preset list item hover token, confirm action button tokens.
- Prohibited hardcoded values: no raw hex codes, pixel dimensions for day cells, or font sizes.
- Dark mode expectations: calendar selection and hover states must remain distinguishable against the dark popover background; today marker must remain visible.
- Layout rules: the trigger is an inline-flex element displaying the current range label and a calendar icon; the popover/sheet presents preset options in a list on one side and a calendar grid on the other (or stacked vertically on mobile).
- Responsive behavior: on mobile, the picker opens in a full-screen sheet with stacked layout; on desktop, it appears as a popover beneath the trigger.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `DateRangeSelector.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
