# Component Spec — DealCard

## 1. Purpose

Displays a summary card for a CRM deal record, showing the deal title, monetary value, current pipeline stage, associated contact(s), and expected close date. Used primarily as a card within a `KanbanColumn` on the `PipelineBoard`.

Use when: Representing a deal in a Kanban pipeline view, deal list, or deal search results.

Do NOT use when: The full deal detail page is being shown, or the context is a contact or lead record (use `ContactCard` or `LeadCard` respectively).

---

## 2. UX Intent

- Primary interaction goal: Allow sales representatives to scan deal status, value, and progress at a glance in a pipeline view, and take quick actions (open deal, reassign) without leaving the board.
- Expected user mental model: A card on a Kanban board similar to deals in Salesforce, HubSpot, or Pipedrive — compact, information-dense, and draggable between stages.
- UX laws applied:
  - Jakob's Law: Matches the widely familiar CRM deal card pattern from major sales tools.
  - Fitts's Law: The card must be a large, grabbable target for drag-and-drop interactions (handled by parent) and tappable on mobile.
  - Hierarchy (Gestalt): Deal title is the most prominent element, followed by value, then stage and meta information.

---

## 3. Visual Behavior

- Layout: Card container with three compositional sub-sections: Title (deal name), Value (monetary amount, visually prominent), and Stage (a `StageBadge` indicating the current pipeline stage). Optional additional metadata (contact avatar + name, close date) below.
- Spacing: Consistent internal padding using spacing tokens. Vertical gap between sub-sections uses a spacing token.
- Typography: Deal title uses a bold body or small heading token. Value uses a bold, slightly larger token for visual hierarchy. Stage badge is a labeled chip. Meta text is muted at a secondary text size token.
- Token usage: Card background, card border, title text, value text, meta text color — all from theme tokens. Stage badge styling follows `StageBadge` token conventions.
- Responsive behavior: Card width is determined by the `KanbanColumn` container. Minimum width is enforced via a size token to prevent extreme narrowing.

---

## 4. Interaction Behavior

- States:
  - Idle: Default appearance.
  - Hover: Subtle shadow elevation or background change indicating the card is interactive.
  - Focus: Visible focus ring on the card or the title link.
  - Dragging: Visual feedback while the card is being dragged (managed by the parent drag layer; the card should accept a `isDragging` prop to adjust its visual state — reduced opacity or elevated shadow).
  - Loading: Skeleton for title, value, and stage.
- Controlled vs uncontrolled: Fully controlled. Parent supplies deal data, drag state, and action callbacks.
- Keyboard behavior: Tab focuses the card. Enter opens the deal detail. Arrow keys within the board are managed by the parent (`KanbanColumn`/`PipelineBoard`).
- Screen reader behavior: Deal title is the primary accessible label. Value and stage are announced as supplementary information. The card communicates its position in the pipeline (column/stage context) via its surrounding list structure.
- Motion rules: Hover shadow elevation transitions. Drag state transition (opacity change). Reduced motion: instant changes.

---

## 5. Accessibility Requirements

- ARIA requirements: Card is a list item (`role="listitem"`) within its `KanbanColumn` list. Deal title is a link or button. The drag-and-drop handle (if separate) has an appropriate `aria-label` (e.g., "Drag deal: [Title]"). Value is announced with a currency label (e.g., "Value: $45,000").
- Focus rules: Tab focuses the card. Within the card, the title link/button is the first focusable element. Actions (if present) follow.
- Contrast expectations: Title text, value text, and meta text all meet WCAG AA against the card background.
- Reduced motion behavior: Shadow and opacity transitions are suppressed.

---

## 6. Theming Rules

- Required tokens: card background, card hover background, card border color, card shadow/elevation, title text color, value text color, meta/muted text color, spacing tokens, border radius token.
- Prohibited hardcoded values: No hardcoded colors, pixel dimensions, or currency symbols in the component (currency format is provided by the parent).
- Dark mode expectations: Card background uses a dark surface token. Value and title text adapt to dark text tokens.

---

## 7. Composition Rules

- What can wrap it: Placed inside a `KanbanColumn` as a list item. May appear in deal search results or a recent deals panel.
- What it may contain (compound sub-components):
  - `DealCard.Title` — the deal name, optionally as a link.
  - `DealCard.Value` — the deal's monetary value, formatted by the parent.
  - `DealCard.Stage` — the current pipeline stage, rendered as a `StageBadge`.
- Anti-patterns:
  - Do not embed deal data-fetching inside this component.
  - Do not implement drag-and-drop logic inside this component — the parent `KanbanColumn` or `PipelineBoard` owns that interaction.
  - Do not render the full deal detail inside the card — it is a summary only.

---

## 8. Performance Constraints

- Memoization rules: The card must be memoized by deal ID. Updates to other deals in the same column must not cause this card to re-render.
- Virtualization: Intended to be used inside a `KanbanColumn` that may have many cards; virtualization within columns is the parent's responsibility.
- Render boundaries: No data-fetching inside this component.

---

## 9. Test Requirements

- What must be tested:
  - Renders Title, Value, and Stage sub-components correctly.
  - Renders the loading skeleton state.
  - Applies the `isDragging` visual state correctly.
- Interaction cases:
  - Clicking/pressing the title link opens the deal (fires the navigation callback).
  - Hover state changes visual appearance.
  - Tab navigation reaches the title link and any action buttons.
- Accessibility checks:
  - Deal title link has a meaningful accessible label.
  - Value is announced with a currency context.
  - Stage badge is announced with its stage name.
  - Contrast passes in default and hover states.
  - Reduced motion: shadow and opacity transitions suppressed.
