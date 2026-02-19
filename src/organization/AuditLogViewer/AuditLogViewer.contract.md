# Component Contract — AuditLogViewer

## 1. Public API

### Base Props

`AuditLogViewer` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: page-level layout containers, admin settings sections, full-page routes.

May contain: a filter bar (may use Input, Select, and DateRangePicker primitives), a data table of audit rows, expandable row detail panels, pagination controls.

---

## 2. Behavioral Guarantees

- Idle: table populated with audit events.
  - Loading: skeleton rows while data is being received from parent.
  - Empty: clear empty-state message when no events match the current filters.
  - Error: error state display provided by the parent; the component accepts an error prop.
- Controlled vs uncontrolled: filter state may be controlled (via props) or uncontrolled (internal state); both patterns must be supported.
- Keyboard behavior:
- Screen reader behavior: the table uses proper `<table>`, `<thead>`, `<th scope="col">`, and `<tbody>` semantics (or equivalent ARIA roles). Sort and filter state changes announce to assistive technology via live regions.
- Motion rules: row hover transitions use a subtle background color transition (duration from motion tokens). Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: table must have an accessible label (via `aria-label` or `aria-labelledby`). Sortable columns must use `aria-sort`. Filter changes that update results must trigger an `aria-live` announcement of the result count.
- Focus rules: after applying a filter, focus remains on the filter control. After pagination, focus moves to the first row or table caption.
- Contrast expectations: all text and icon content meets WCAG AA. Severity color indicators must not rely on color alone — include text labels.
- Reduced motion behavior: row hover transitions and any expand/collapse animations are disabled under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: surface, surface-raised, header-surface, primary text, secondary text, border, semantic accent colors (positive, warning, destructive, neutral), space tokens, radius tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel padding, no hardcoded font sizes or weights.
- Dark mode expectations: table headers, row backgrounds, and borders must all resolve to legible dark-mode equivalents. Severity badges must maintain contrast in dark mode.

- Responsive behavior: on narrow viewports, columns may be hidden progressively (least important first); a summary card layout may replace the table for mobile.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `AuditLogViewer.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
