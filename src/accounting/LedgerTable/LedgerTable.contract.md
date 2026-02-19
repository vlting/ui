# Component Contract — LedgerTable

## 1. Public API

### Base Props

`LedgerTable` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a card, panel, page section, or the accounting module's main content area.

May contain: a header row with column labels, data rows with cell content (text, currency values, badges, action buttons), a footer row for totals, empty/error state slots, and a pagination control slot.

---

## 2. Behavioral Guarantees

- In `idle` state: rows fully rendered with data.
- In `row hover` state: row background shifts to the hover token.
- In `row selected` state: row background shifts to the selected token; a checkbox or indicator marks the row.
- In `row focus` state: focus ring visible on the row or interactive cell.
- In `loading` state: skeleton rows occupy the table body.
- In `empty` state: an empty-state message spans the full table width.
- In `error` state: an error-state message spans the full table width.
- Controlled vs uncontrolled: selected rows and sort state may be controlled externally via props; hover state is uncontrolled.
- Keyboard behavior: Tab moves between interactive rows or cells; arrow keys navigate between rows when the table has row-level focus; Enter or Space activates a row action.
- Screen reader behavior: the table uses semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` roles (or ARIA equivalents for custom rendering); column headers have `scope="col"`; sortable headers announce the current sort direction via `aria-sort`.
- Motion rules: row hover transitions use `duration.fast` tokens; skeleton loading animation respects `prefers-reduced-motion`.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: `role="table"` (or native `<table>`) with `aria-label` describing the ledger context; sortable column headers expose `aria-sort`; row-level checkboxes have `aria-label` identifying the row.
- Focus rules: focus is visible on any interactive row or cell; focus order follows the visual left-to-right, top-to-bottom sequence.
- Contrast expectations: table header text meets WCAG AA (4.5:1) against the header background; body text meets AA against the row background; row borders meet 3:1 non-text contrast.
- Reduced motion behavior: skeleton shimmer and row hover transitions are disabled; static styles are applied immediately.

---

## 4. Styling Guarantees

- Required tokens: table background, header background, header text color, body text color, row border color, row hover background, row selected background, empty/error state text color, skeleton background.
- Prohibited hardcoded values: no raw hex codes, pixel values for cell padding, or hardcoded font sizes.
- Dark mode expectations: row borders and alternating backgrounds must remain distinguishable against the table background in dark mode; selected and hover states must be visually distinct from each other and from idle rows.
- Layout rules: full-width table with defined column widths; numeric/currency columns are right-aligned; text description columns are left-aligned; date columns may be center or left-aligned per convention.
- Responsive behavior: on narrow viewports, the table may scroll horizontally within its container; column priority determines which columns remain visible at each breakpoint; the description column is typically the last to be hidden.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `LedgerTable.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
