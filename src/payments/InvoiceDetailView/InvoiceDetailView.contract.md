# Component Contract — InvoiceDetailView

## 1. Public API

### Base Props

`InvoiceDetailView` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a dedicated invoice detail page, a Sheet or Dialog triggered from InvoiceTable.

May contain: an invoice header section, a line-items table, a totals summary section, a payment method/notes footer, and action buttons (Download, Pay Now).

---

## 2. Behavioral Guarantees

- Display: invoice is shown in full read-only detail.
  - Loading: skeleton layout while data is provided by the parent.
  - Error: error message when invoice data cannot be loaded (passed via prop).
  - Downloading: download action shows a brief loading state on the button.
  - Paying (if applicable): pay action shows a loading state while processing.
- Controlled vs uncontrolled: display-only. Accepts invoice data as props. Action callbacks (`onDownload`, `onPay`) are provided by the parent.
- Keyboard behavior: all action buttons are keyboard-reachable via Tab. No complex keyboard interactions within the read-only content.
- Screen reader behavior: the invoice structure uses semantic heading hierarchy. The line items table uses proper table semantics with column headers. Invoice status badge conveys status via text. Totals are clearly labeled.
- Motion rules: no animations on the static content. Button loading states use a spinner transition from motion tokens; suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: the line items table uses `<table>`, `<th scope="col">`, and `<tbody>` semantics. Invoice status is conveyed via text (not color alone). Action buttons have descriptive labels (e.g., "Download invoice #INV-001 as PDF").
- Focus rules: tab order follows reading order through the document sections and then to action buttons.
- Contrast expectations: all text, status badges, and amounts must meet WCAG AA contrast.
- Reduced motion behavior: button loading spinner animations are instant/minimal under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: document surface, primary text, secondary text, border, semantic status tokens (positive, warning, destructive), space tokens (section padding, table cell padding), radius tokens (card/document corners), shadow tokens (document elevation).
- Prohibited hardcoded values: no raw hex colors, no pixel-based spacing, no hardcoded font sizes.
- Dark mode expectations: the document surface must be visually elevated above the page background in dark mode. Status tokens must remain legible and correctly semantic in dark mode.

- Responsive behavior: on narrow viewports, the invoice header stacks vertically. The line items table scrolls horizontally if needed. Totals remain full-width at the bottom.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `InvoiceDetailView.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
