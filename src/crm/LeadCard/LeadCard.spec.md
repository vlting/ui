# Component Spec — LeadCard

## 1. Purpose

Displays a summary card for a CRM lead record, showing the lead's name, status badge, lead value (potential deal size), source, and primary action controls. Used in lead lists, pipeline views, and qualification queues.

Use when: Representing a lead in a list or board view where a quick summary and actions are needed without opening the full lead record.

Do NOT use when: The full lead detail page is being shown, or the record is a qualified contact or deal (use `ContactCard` or `DealCard`).

---

## 2. UX Intent

- Primary interaction goal: Allow sales development representatives to quickly assess lead quality, status, and take immediate action (qualify, contact, discard) from a list or pipeline view.
- Expected user mental model: A lead card familiar from CRM tools like Salesforce Leads, HubSpot Contacts (Lead stage), or Pipedrive Leads — a compact record card with a status indicator and quick actions.
- UX laws applied:
  - Jakob's Law: Follows the established CRM lead card pattern.
  - Hierarchy (Gestalt): Lead name is the primary element; status badge provides immediate qualification context; value is the secondary business metric.
  - Fitts's Law: Action buttons (qualify, call, email) must have adequate tap target size.

---

## 3. Visual Behavior

- Layout: Card container with three compositional sub-sections: Name (lead's full name or company), Status (a `LeadStatusBadge`), and Value (potential monetary value). Optional metadata row with source and assignment info below.
- Spacing: Consistent internal padding using spacing tokens. Vertical gap between sub-sections uses a spacing token.
- Typography: Lead name uses a bold body or small heading token. Status badge is a labeled chip. Value uses a bold, slightly prominent token. Metadata uses a muted secondary text token at a smaller size.
- Token usage: Card background, card border, name text, value text, meta text — all from theme tokens. Status badge styling follows `LeadStatusBadge` token conventions.
- Responsive behavior: Card width is determined by its container (list or board column). Content does not overflow; long names are truncated with an ellipsis.

---

## 4. Interaction Behavior

- States:
  - Idle: Default appearance.
  - Hover: Subtle background or shadow change indicating the card is interactive.
  - Focus: Visible focus ring on the card or the primary name link.
  - Loading: Skeleton for name, status, and value.
  - Qualified: The status badge reflects the "Qualified" state; card may have a distinct visual treatment.
  - Disqualified: The card has a muted/reduced-opacity visual treatment.
- Controlled vs uncontrolled: Fully controlled. Parent supplies lead data and action callbacks.
- Keyboard behavior: Tab focuses the card. Enter opens the lead detail. Action buttons within the card are separately focusable.
- Screen reader behavior: Lead name is the primary accessible label. Status and value are announced as supplementary information. Action buttons have descriptive labels incorporating the lead name.
- Motion rules: Hover state transitions animate subtly. Status badge color transitions (if status changes). Reduced motion: instant changes.

---

## 5. Accessibility Requirements

- ARIA requirements: Card acts as a list item in its list context. Lead name is a link or button. Status badge has an accessible label (not icon-only). Value is announced with a currency context. Action buttons have descriptive `aria-label` values including the lead name.
- Focus rules: Name link/button is the first focusable element. Action buttons follow in tab order.
- Contrast expectations: Name text, status badge text, value text, and meta text all meet WCAG AA against the card background.
- Reduced motion behavior: Hover and status transitions are suppressed.

---

## 6. Theming Rules

- Required tokens: card background, card hover background, card border color, card shadow/elevation, name text color, value text color, meta/muted text color, spacing tokens, border radius token.
- Prohibited hardcoded values: No hardcoded colors, pixel dimensions, or status-specific hex values (status colors are provided by `LeadStatusBadge` via semantic tokens).
- Dark mode expectations: Card background uses a dark surface token. All text adapts to dark theme tokens.

---

## 7. Composition Rules

- What can wrap it: Placed inside a lead list, a lead pipeline `KanbanColumn`, or a qualification queue view.
- What it may contain (compound sub-components):
  - `LeadCard.Name` — the lead's name, optionally as a link.
  - `LeadCard.Status` — the lead's qualification status, rendered as a `LeadStatusBadge`.
  - `LeadCard.Value` — the potential monetary value of the lead.
- Anti-patterns:
  - Do not embed lead data-fetching inside this component.
  - Do not use this component for qualified contacts or deals.
  - Do not render the full lead record inside the card.

---

## 8. Performance Constraints

- Memoization rules: The card must be memoized by lead ID.
- Virtualization: Intended for use in virtualized lead lists.
- Render boundaries: No data-fetching inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders Name, Status, and Value sub-components correctly for the provided lead data.
  - Renders the loading skeleton state.
  - Applies the disqualified visual treatment correctly.
- Interaction cases:
  - Clicking/pressing the name link fires the navigation callback.
  - Each action button fires the correct callback.
  - Hover state changes visual appearance.
  - Tab navigation reaches name link and action buttons.
- Accessibility checks:
  - Name link has a meaningful accessible label.
  - Status badge is announced with text (not icon-only).
  - Value is announced with a currency context.
  - Action buttons have descriptive `aria-label` values.
  - Contrast passes in default and hover states.
  - Reduced motion: transitions suppressed.
