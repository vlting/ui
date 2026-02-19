# Component Spec — StageBadge

## 1. Purpose

Displays a visually distinct badge indicating the current pipeline stage of a CRM deal (e.g., Prospecting, Qualification, Proposal, Negotiation, Closed Won, Closed Lost). Provides immediate visual identification of where a deal stands in the sales pipeline.

Use when: Communicating a deal's current pipeline stage in a `DealCard`, deal detail view, `KanbanColumn` header, or any CRM context where stage status must be surfaced at a glance.

Do NOT use when: The entity is a lead (use `LeadStatusBadge`), or the context requires a general-purpose tag or category badge unrelated to CRM deal stages.

---

## 2. UX Intent

- Primary interaction goal: Allow users to immediately recognize a deal's pipeline stage through a consistent, color-coded, labeled badge — no need to read detailed text to understand stage context.
- Expected user mental model: A stage chip or pill familiar from CRM pipeline views in Salesforce, HubSpot, or Pipedrive — each stage has a distinct visual treatment that maps to the pipeline's sequential progression.
- UX laws applied:
  - Pre-attentive Processing (Gestalt): Color and shape allow the stage to be recognized before conscious reading.
  - Redundancy: Stage is always communicated by both color AND label text — never by color alone.
  - Serial Position Effect: Stage ordering (Prospecting → Closed) should be visually reflected in the pipeline progression, though the badge itself represents only the current stage.

---

## 3. Visual Behavior

- Layout: A small, pill-shaped chip with a colored background and a text label. May optionally include a small icon or dot to the left of the label.
- Spacing: Compact horizontal padding and minimal vertical padding using spacing tokens. Fits within `DealCard` and `KanbanColumn` header contexts without disrupting layout.
- Typography: Label text uses a small, bold or medium-weight text token. Case convention (all caps vs sentence case) follows the design system's badge standard.
- Token usage: Each pipeline stage maps to a semantic color token pair (background + text). Example mappings: Prospecting → muted/grey, Qualification → info/blue, Proposal → purple, Negotiation → warning/amber, Closed Won → success/green, Closed Lost → error/red. These are semantic token references, not hardcoded hex values.
- Responsive behavior: Badge size remains consistent across breakpoints. Stage labels are kept short enough to never require truncation.

---

## 4. Interaction Behavior

- States:
  - Display-only (default): Non-interactive, renders stage as read-only.
  - Interactive (optional): If the badge acts as a trigger for a stage-change action, it shows hover and focus states with a visual affordance (e.g., chevron icon).
- Controlled vs uncontrolled: Fully controlled. Parent supplies the stage value and optionally an onChange callback for interactive mode.
- Keyboard behavior: If interactive, the badge is a button reachable via Tab and activatable via Enter/Space, opening a stage selection menu. Non-interactive badges are excluded from the tab order.
- Screen reader behavior: The badge text label is read as-is. Non-interactive: text is sufficient, no ARIA role required. Interactive: rendered as a `<button>` with an `aria-label` including "Change stage: [Current Stage Name]".
- Motion rules: Stage change color transition animates smoothly in interactive mode. Reduced motion: instant color change.

---

## 5. Accessibility Requirements

- ARIA requirements: Non-interactive badge requires no special ARIA role (visible text is sufficient). Interactive badge uses `role="button"` with a descriptive `aria-label` communicating both the current stage and the change intent. Stage must never be communicated by color alone — the text label is mandatory.
- Focus rules: Non-interactive badges are excluded from tab order. Interactive badges are single tab stops.
- Contrast expectations: Badge text must meet WCAG AA against its stage background color token. All stage-to-token mappings must be verified for WCAG AA compliance in both light and dark themes.
- Reduced motion behavior: Color transition animations are suppressed.

---

## 6. Theming Rules

- Required tokens (per stage):
  - Prospecting: muted background token, muted text token.
  - Qualification: info background token, info text token.
  - Proposal: purple/secondary background token, purple text token.
  - Negotiation: warning background token, warning text token.
  - Closed Won: success background token, success text token.
  - Closed Lost: error/danger background token, error text token.
  - Spacing tokens for padding, border radius token for pill shape.
- Prohibited hardcoded values: No hardcoded hex color values per stage. All stage colors reference semantic theme tokens.
- Dark mode expectations: Each stage's background and text tokens have dark-mode variants maintaining WCAG AA contrast. Stages remain visually distinguishable from each other in dark mode.

---

## 7. Composition Rules

- What can wrap it: Used inside `DealCard.Stage`, deal detail views, `KanbanColumn` headers (as a label), and any summary display of deal stage.
- What it may contain: A text label and an optional icon or status dot. No other children.
- Anti-patterns:
  - Do not rely on color alone to communicate stage — the text label is always required.
  - Do not use this badge for lead status (use `LeadStatusBadge`) or generic taxonomy tags.
  - Do not hardcode stage-to-color mappings — always use semantic tokens.
  - Do not allow the stage label to be truncated — keep stage names short.

---

## 8. Performance Constraints

- Memoization rules: The badge should be memoized and only re-render when the stage prop changes.
- Virtualization: Not applicable.
- Render boundaries: No logic beyond rendering the appropriate visual for the given stage value.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct label and background color token for each stage value (Prospecting, Qualification, Proposal, Negotiation, Closed Won, Closed Lost).
  - Non-interactive mode renders without a button role.
  - Interactive mode renders as a button with the correct `aria-label`.
- Interaction cases:
  - Interactive mode: Tab reaches the badge, Enter/Space opens the stage selection menu.
  - Non-interactive mode: Badge is excluded from tab order.
- Accessibility checks:
  - Text label is always present (not color-only).
  - Non-interactive: no extra ARIA role needed, text suffices.
  - Interactive: `role="button"` and descriptive `aria-label`.
  - Contrast passes for all stage token combinations in light and dark themes.
  - Stages are visually distinguishable from each other without relying on color alone.
  - Reduced motion: color transition suppressed.
