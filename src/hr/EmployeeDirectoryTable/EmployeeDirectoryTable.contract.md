# Component Contract — EmployeeDirectoryTable

## 1. Public API

### Base Props

`EmployeeDirectoryTable` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: page-level admin views, tabbed content panels, modal drawers. Must be a descendant of the design system Provider.

May contain: a column header row, data rows (each containing cells with employee data), optional inline action menus per row, optional selection checkboxes, and optional pagination controls below the table.

---

## 2. Behavioral Guarantees

- Default: all rows visible, no sort applied.
  - Sorted: the active sort column shows a directional indicator; rows reorder accordingly.
  - Row hover: row background changes to hover token color; cursor becomes a pointer if rows are clickable.
  - Row selected (if selection is enabled): row background changes to selected token color; checkbox or indicator is checked.
  - Loading: a skeleton loader replaces table rows while data is being fetched (data provided by parent).
  - Empty: an empty state illustration and message replaces the table body when no rows match.
  - Error: an error message replaces the table body when data cannot be displayed.
- Controlled vs uncontrolled: this is a presentation-only component. It accepts rows and column definitions as props. Sort state may be controlled (parent manages sort) or uncontrolled (component manages sort locally). Selection state follows the same pattern.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: row hover background transition uses a short duration token suppressed under reduced motion. Sort transitions are immediate.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus rules: the table is reachable via Tab; interior navigation uses arrow keys. Row activation controls (checkboxes, action menus) are individually focusable.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress row hover background transition.

---

## 4. Styling Guarantees

- Required tokens: header background, header text, row background, row hover background, row selected background, divider color, cell text color, muted text color, sort arrow color, empty/error state text color, space tokens, size tokens (row height).
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; row separators and hover states must remain distinguishable against dark backgrounds.

- Responsive behavior: on small screens, the table scrolls horizontally within its container. Columns may be deprioritized or hidden below certain breakpoints. A card-per-row layout may be offered as a mobile alternative prop variant.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `EmployeeDirectoryTable.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
