# Component Contract — Select

## 1. Public API

### Base Props

`Select` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: forms, filter bars, settings sections, InviteUserModal (role selector), PaymentMethodForm (country selector).

May contain: a trigger element (shows current value/placeholder) and a dropdown panel containing grouped or flat option items. Options may include an icon, label, and optional description.

---

## 2. Behavioral Guarantees

- Closed/idle: trigger shows selected value or placeholder.
  - Focused (trigger): accent border/ring on trigger.
  - Open: dropdown panel visible; trigger remains visible.
  - Option hover: option background shifts to hover token.
  - Option focused: keyboard-focused option has focus indicator.
  - Option selected: checkmark or highlighted background.
  - Disabled option: muted appearance; not interactive.
  - Disabled trigger: muted trigger; not interactive.
  - Error: error border on trigger; error message below.
- Controlled vs uncontrolled: controlled via `value` / `onValueChange`. Uncontrolled via `defaultValue`.
- Keyboard behavior:
- Screen reader behavior: trigger has `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`. Dropdown has `role="listbox"` with an accessible label. Each option has `role="option"`, `aria-selected`, and an accessible name. Disabled options have `aria-disabled="true"`.
- Motion rules: dropdown open/close uses a short fade and slide from motion tokens. Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="combobox"` on trigger, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls` pointing to the listbox. `role="listbox"` on the dropdown panel with `aria-label`. Each option `role="option"` with `aria-selected`. Error message associated via `aria-describedby` on the trigger.
- Focus rules: Tab focuses the trigger. On open, focus moves to the selected option (or first option if none selected). Escape returns focus to the trigger without selection change. On selection, focus returns to the trigger.
- Contrast expectations: trigger text and border meet WCAG AA. Option text meets WCAG AA. Selected option indicator meets non-text contrast (3:1). Placeholder text meets 3:1 minimum.
- Reduced motion behavior: dropdown transition is instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: input surface (trigger), border (default, focus, error), accent (focus border, selected option), hover-state (option hover), selected-state (option selected background), elevated surface (dropdown panel), shadow, primary text, muted text (placeholder, disabled), space tokens, radius tokens, type scale.
- Prohibited hardcoded values: no raw hex colors, no pixel-based trigger height or dropdown width, no hardcoded font sizes.
- Dark mode expectations: trigger surface must be distinguishable from the page. Dropdown panel must appear elevated in dark mode. Selected option must remain visually distinct.

- Responsive behavior: trigger is full-width or content-width based on layout. On mobile, the dropdown may be replaced by a native picker or a bottom sheet.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Select.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
