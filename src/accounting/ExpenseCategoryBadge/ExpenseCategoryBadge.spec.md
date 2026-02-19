# Component Spec — ExpenseCategoryBadge

## 1. Purpose

Displays a compact, labeled badge that identifies the category of an expense (e.g., "Travel", "Software", "Payroll"). Provides an at-a-glance visual signal that helps users scan and group expense entries quickly.

Use when: labeling individual expense records within a list, table row, or card to indicate their accounting category.

Do NOT use when: displaying a full category selector or filter control — use a dedicated select or filter component for that. Do NOT use for status communication (e.g., "Approved", "Pending") — use a status badge component instead.

---

## 2. UX Intent

- Primary interaction goal: reduce cognitive load when scanning lists of expenses by surfacing the category identity without requiring users to read full descriptions.
- Expected user mental model: users recognize badges as passive labels — small, color-coded tags that carry a single piece of categorical metadata.
- UX laws applied:
  - **Jakob's Law** — badge shape and size follow the familiar "chip/tag" pattern common in financial and productivity applications.
  - **Gestalt Law of Similarity** — consistent color-per-category assignment helps users group related expenses across the UI without counting.
  - **Hick's Law** — each badge expresses exactly one category, minimising decision overhead for the viewer.

---

## 3. Visual Behavior

- Layout rules: displays inline or inline-flex; does not break across lines; width is content-driven (label text + padding).
- Spacing expectations: internal horizontal and vertical padding derived from space tokens (compact scale); never occupies more vertical space than the adjacent text line height.
- Typography rules: label text uses the smallest defined body or label type size token; text is always single-line and truncated with ellipsis when the container is constrained.
- Token usage: background and text colors reference semantic or categorical color tokens — not arbitrary values. Border (if present) uses the border color token at reduced opacity.
- Responsive behavior: the badge scales with the surrounding text; it does not reflow to a multi-line form at any viewport size.

---

## 4. Interaction Behavior

- States:
  - **idle**: displays category label in the category's assigned color.
  - **hover**: subtle background lightening/darkening (token-driven) when the badge is interactive; no change when purely presentational.
  - **focus**: visible focus ring using the focus color token when interactive.
  - **disabled**: not applicable — the badge is a display element; interactivity is optional.
- Controlled vs uncontrolled: the badge is stateless; category and color assignment are always supplied via props.
- Keyboard behavior: if the badge is rendered as an interactive element (e.g., triggering a filter), it must be focusable and activatable with Enter or Space.
- Screen reader behavior: the label text is the accessible name; no additional ARIA is needed unless the badge is interactive, in which case it requires `role="button"` and an accessible name.
- Motion rules: no animation on the badge itself; transitions on hover/focus use `duration.fast` tokens.

---

## 5. Accessibility Requirements

- ARIA requirements: purely presentational badges need no special ARIA; interactive badges require `role="button"` or must be rendered as a native `<button>` element.
- Focus rules: focus ring must be visible on keyboard navigation; focus must not be trapped.
- Contrast expectations: the category label text must meet WCAG AA (4.5:1) against its background token in both light and dark themes.
- Reduced motion behavior: no animations are defined for this component; this requirement is inherently satisfied.

---

## 6. Theming Rules

- Required tokens: background color (per category or semantic), text color, border color (optional), border radius token, space token for padding.
- Prohibited hardcoded values: no raw hex codes, numeric padding, or font sizes.
- Dark mode expectations: category color tokens must have dark-mode variants that maintain sufficient contrast; the badge background must not disappear against a dark surface background.

---

## 7. Composition Rules

- What can wrap it: table cells, list item rows, card headers, inline text paragraphs.
- What it may contain: a single text label; optionally a leading icon slot (icon must be decorative or have its own `aria-label`).
- Anti-patterns:
  - Do not render multiple lines of text inside the badge.
  - Do not use the badge to convey workflow status — that is the responsibility of a status indicator component.
  - Do not hard-code a category color inside the component; accept it via a token-mapped prop.

---

## 8. Performance Constraints

- Memoization rules: the component is stateless and cheap to render; memoization at the call site is only warranted inside high-frequency virtualized lists.
- Virtualization: not applicable.
- Render boundaries: no error boundary needed at this level.

---

## 9. Test Requirements

- What must be tested:
  - Renders the supplied category label text correctly.
  - Applies the correct background and text color tokens for each supported category variant.
  - Truncates long label text rather than overflowing its container.
- Interaction cases:
  - When rendered as interactive, pressing Enter or Space triggers the supplied callback.
  - Hover and focus styles are applied via the correct tokens.
- Accessibility checks:
  - Text meets WCAG AA contrast ratio against the badge background in both light and dark themes.
  - Interactive badge exposes `role="button"` and a non-empty accessible name.
