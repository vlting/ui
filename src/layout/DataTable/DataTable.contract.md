# Component Contract — DataTable

## 1. Public API

### Base Props

`DataTable` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: page-level admin views, tabbed content panels, report sections. Must be a descendant of the design system Provider.

May contain: - `DataTable.Header` — the header row containing column header cells with sort controls.

---

## 2. Behavioral Guarantees

- Default: all rows visible, no active sort.
  - Sorted: active sort column shows directional indicator; rows reorder.
  - Row hover: row background changes to hover token; cursor becomes pointer if rows are pressable.
  - Row selected (if selection enabled): row background changes to selected token; checkbox is checked.
  - Loading: skeleton rows appear while data is being fetched.
  - Empty: empty state message replaces the table body when no rows exist.
  - Error: error message replaces the table body when data cannot be displayed.
- Controlled vs uncontrolled: column sort state, row selection, and pagination state all support controlled and uncontrolled patterns via value props and change callbacks.
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
- Focus rules: table is reachable via Tab; interior navigation uses arrow keys. Individual row action controls (checkboxes, action menus) are separately focusable.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress row hover background transition.

---

## 4. Styling Guarantees

- Required tokens: header background, header text, row background, alternating row background (optional), row hover background, selected row background, divider color, sort arrow color, empty/error state text, focus ring, space tokens, size tokens (row height, cell padding), typography scale tokens.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; row separators and hover/selected states must remain distinguishable against dark surfaces.

- Responsive behavior: on small screens, the table scrolls horizontally. Columns may be hidden below certain breakpoints. A card-per-row mobile variant may be offered as an explicit alternate prop mode.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `DataTable.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
