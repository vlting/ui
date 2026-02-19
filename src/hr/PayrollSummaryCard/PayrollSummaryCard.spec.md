# Component Spec — PayrollSummaryCard

## 1. Purpose

Presents a concise summary of payroll figures for a given period — such as gross pay, deductions, and net pay — in a compact card format. Used in employee self-service pay stubs views, HR payroll dashboards, and finance reporting summaries.

Do NOT use this component for detailed payroll breakdowns with line-by-line deduction editing (use a full payroll detail page), for historical trend charts (use a chart component), or for payroll configuration (use an admin form).

---

## 2. UX Intent

- Primary interaction goal: give employees and HR professionals an immediate understanding of the key payroll figures for a pay period without navigating to a full detail view.
- Expected user mental model: a financial summary tile similar to a bank statement snapshot — displaying headline numbers (gross, deductions, net) prominently with a clear period label.
- UX laws applied:
  - Gestalt (Hierarchy, Proximity): net pay is the most important figure and receives visual prominence. Gross and deductions are grouped as supporting detail.
  - Aesthetic-Usability Effect: a clean, well-structured card increases confidence in the displayed financial data.
  - Jakob's Law: numeric formatting (currency symbols, thousands separators) follows locale-aware conventions familiar from payroll and banking apps.
  - Fitts's Law: if the card navigates to a full detail view, the entire card surface is the touch target.

---

## 3. Visual Behavior

- Layout: a card containing a header (pay period label, e.g., "March 1–15, 2026"), a prominent net pay figure, and a secondary section listing gross pay and total deductions. An optional footer may show payment date or payment method.
- Spacing: card padding, gap between figure rows, and gap between header and body all use space tokens.
- Typography: pay period label uses a caption token. Gross and deductions labels use a small body token; their values use a body token. Net pay label uses a subheading scale token; its value uses a large display/heading scale token to ensure visual prominence.
- Token usage: card background, border, shadow, figure label text, value text, divider color, header text, and footer text must all use design tokens. Deduction values may use a semantic muted or danger token to indicate they reduce pay.
- Responsive behavior: card fills its container width. On very narrow screens, the layout remains single-column. Net pay remains visually prominent at all breakpoints.

---

## 4. Interaction Behavior

- States:
  - Default (non-interactive): purely presentational.
  - Hoverable/Pressable (if interactive, navigates to full detail): card surface shows hover background token; cursor becomes a pointer.
  - Focused (if interactive): visible focus ring on the card.
  - Loading: skeleton placeholders replace figure values and the period label while data is pending.
  - Error: error state message replaces the card body when data cannot be loaded (managed by parent).
- Controlled vs uncontrolled: purely display-driven by props. All payroll figures are passed as formatted strings or numeric values with locale/currency configuration.
- Keyboard behavior: if interactive, the card is focusable and activated by Enter or Space. Non-interactive cards are not in the Tab order.
- Screen reader behavior: the card announces as a named region or article. Key figures (pay period, gross, deductions, net pay) are read in a logical top-to-bottom order. Currency values are announced with their currency label. If interactive, the card announces as a button or link labeled with the pay period.
- Motion rules: hover background transition uses a short duration token suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA: non-interactive card uses `role="article"` or equivalent. Interactive card uses `role="button"` or wraps in an anchor. Financial figures use plain text with visible labels — do not rely on color alone to convey the meaning of deductions.
- Focus rules: interactive cards reachable via Tab and activated by Enter/Space. Non-interactive cards excluded from Tab order.
- Contrast: all text (labels and values) must meet WCAG AA contrast against the card background using design tokens.
- Reduced motion: suppress hover transition.

---

## 6. Theming Rules

- Required tokens: card background, border, shadow, header text, figure label text, figure value text, deduction value color (semantic muted or danger token), net pay text (prominent heading token), hover background, focus ring, space tokens, radius token, typography scale tokens.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references must resolve correctly in dark mode; financial data must remain fully legible against dark card surfaces.

---

## 7. Composition Rules

- What can wrap it: payroll dashboard grids, employee self-service portals, finance reporting panels, drawer side panels. Must be a descendant of the design system Provider.
- What it may contain: a pay period header, a net pay prominence section, a gross/deductions breakdown section, and an optional footer (payment date, payment method indicator). All sections are driven by props.
- Anti-patterns:
  - Do not perform payroll calculations inside this component — accept pre-computed figures as props.
  - Do not use this card to display editable payroll fields.
  - Do not display multiple pay periods within a single card instance.

---

## 8. Performance Constraints

- Memoization: the card should be memoized; re-renders occur only when payroll data props change.
- Virtualization: when displaying many pay period cards in a history list, the parent list must virtualize.
- Render boundaries: currency formatting and locale logic must be computed outside the component and passed as formatted string props.

---

## 9. Test Requirements

- Rendering: renders correctly with all payroll fields populated and with optional fields omitted.
- Figure display: gross pay, deductions, net pay, and pay period are all displayed as provided.
- Interactive variant: card is focusable, hoverable, and activated by keyboard.
- Non-interactive variant: card is not in the Tab order.
- Loading/skeleton: skeleton placeholders appear when data is pending.
- Accessibility: article or button role as appropriate; readable figure order; labels always accompany values.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no hover transition animation when motion is reduced.
