# Component Spec — OrderSummaryCard

## 1. Purpose

Displays a structured summary of a single order — its line items, subtotal, and final total — in a card container. It is used at the checkout review step and on order confirmation pages to give users a clear final view of what they are purchasing before or after payment.

Use when: a user needs to review a finalized or about-to-be-finalized order in a contained card, especially in checkout review and order confirmation contexts.

Do NOT use for: editable cart views (use CartDrawer), billing breakdown in isolation (use BillingSummary), or the full order history list (use OrderHistoryTable).

---

## 2. UX Intent

- Primary interaction goal: let users confirm the full scope of their order — what they are buying and what they will pay — at a critical decision point.
- Expected user mental model: a receipt preview or order ticket — a structured card that clearly lists everything (Jakob's Law).
- UX laws applied:
  - Gestalt (proximity): Items, Subtotal, and Total are distinct sub-areas with clear visual separation.
  - Miller's Law: the card limits its display to the essential three components — items, subtotal, and total — without exposing unnecessary detail.
  - Tesler's Law: line item formatting (quantity, price) is handled internally; consumers pass structured data.

---

## 3. Visual Behavior

- Layout: a card container with three composed sub-areas:
  - `OrderSummaryCard.Items` — a list of line items (product name, quantity, line price).
  - `OrderSummaryCard.Subtotal` — a labeled subtotal row (and optional discount/tax rows).
  - `OrderSummaryCard.Total` — an emphasized final total row.
- A visual divider separates Items from Subtotal, and Subtotal from Total.
- The Total row uses an emphasis type token (heavier weight or larger size) to signal its importance.
- Card has a surface background, border, and optional shadow using theme tokens.
- Spacing: internal padding and inter-section spacing use space tokens.
- Typography: item names use a body token; quantities and prices use a numeric body token; section labels use a label token; Total uses a body-emphasis or heading-small token.
- Token usage: all background, border, shadow, and text colors from theme tokens.
- Responsive: card fills available width; on larger screens it may be placed in a sidebar column.

---

## 4. Interaction Behavior

- The card and all sub-components are display-only — no interactive elements.
- No states beyond what is reflected by the data props.
- Keyboard behavior: not focusable; no interactive role.
- Screen reader behavior: the card's content is read sequentially; the total is identified by its label.
- Motion: none — this is a static display component.

---

## 5. Accessibility Requirements

- The card should have an implicit or explicit `aria-label` if used in isolation (e.g., "Order Summary").
- Line items in `OrderSummaryCard.Items` should be semantically listed (definition list or `ul`/`li`).
- `OrderSummaryCard.Subtotal` and `OrderSummaryCard.Total` rows use a description list or equivalent structure to associate labels with values.
- Total row is identifiable by its label, not color alone — weight or size must also differ.
- Contrast: all text labels and values meet 4.5:1.
- No reduced motion requirements — no animation.

---

## 6. Theming Rules

- Required tokens: `background` (card surface), `borderColor`, shadow token, `color` (all text), divider border token, emphasis type token for Total row.
- Prohibited hardcoded values: no raw colors, no hardcoded font weights or pixel sizes outside the token scale.
- Dark mode: card background, border, dividers, and all text must resolve via theme tokens.

---

## 7. Composition Rules

- What can wrap it: a checkout review layout, an order confirmation screen, a modal or sheet.
- What it may contain (via sub-components): `OrderSummaryCard.Items`, `OrderSummaryCard.Subtotal`, `OrderSummaryCard.Total`.
- Sub-components must be used in composition within an `OrderSummaryCard` root.
- Anti-patterns:
  - Do not embed interactive controls (edit cart, change quantity) inside OrderSummaryCard.
  - Do not use OrderSummaryCard as the primary cart management surface.
  - Do not omit `OrderSummaryCard.Total` — it is essential for user comprehension.

---

## 8. Performance Constraints

- Purely presentational — minimal performance requirements.
- No virtualization required; the item list is bounded by the order contents (typically 1–20 items).
- Memoize if used inside a frequently re-rendering checkout layout.

---

## 9. Test Requirements

- Renders `OrderSummaryCard.Items`, `OrderSummaryCard.Subtotal`, and `OrderSummaryCard.Total` with provided data.
- Each line item in Items shows correct product name, quantity, and line price.
- Subtotal section shows correct value.
- Total section shows correct value and is visually/semantically distinct from subtotal.
- Dividers are present between sections.
- Card has an accessible label (e.g., "Order Summary").
- All text meets contrast requirements.
- Passes automated accessibility audit.
- Snapshot test for a standard multi-item order.
