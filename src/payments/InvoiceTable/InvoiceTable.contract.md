# Component Contract — InvoiceTable

## 1. Public API

### Base Props

`InvoiceTable` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: billing settings pages, account management sections, admin dashboards.

May contain: rows composed of invoice number, date, amount, status badge, and action buttons (View, Download).

---

## 2. Behavioral Guarantees

- Idle: table populated with invoice rows.
  - Empty: empty-state message when there are no invoices.
  - Loading: skeleton rows while data is loading.
  - Row hover: background shifts to hover token.
  - Downloading: the Download button for that row shows a brief loading state.
- Controlled vs uncontrolled: data, sort state, and pagination are controlled by the parent. Callbacks: `onRowClick(invoiceId)`, `onDownload(invoiceId)`, `onSortChange`, `onPageChange`.
- Keyboard behavior:
- Screen reader behavior: proper table semantics (`<table>`, `<th scope="col">`). Sortable headers have `aria-sort`. Status badges convey status via text. Row action buttons have descriptive labels including the invoice number.
- Motion rules: row hover transition is a subtle background color shift. Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: table has an accessible label. Sortable column headers have `aria-sort`. Per-row action buttons use `aria-label` that includes the invoice number (e.g., "Download invoice INV-001").
- Focus rules: tab order progresses through interactive elements in reading order. Pagination controls are keyboard-reachable.
- Contrast expectations: all text and status badge labels meet WCAG AA.
- Reduced motion behavior: row hover animation is instant under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: surface, surface-raised, hover state, border, primary text, secondary text, semantic status tokens, space tokens, radius tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based sizes, no hardcoded font sizes.
- Dark mode expectations: table header, row backgrounds, and border tokens resolve to appropriate dark-mode values. Status badge tokens maintain correct semantics and contrast in dark mode.

- Responsive behavior: on narrow viewports, secondary columns (e.g., due date) may be hidden. The Invoice Number, Amount, and Status columns are always visible. On mobile, a card-per-invoice layout may replace the table.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `InvoiceTable.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
