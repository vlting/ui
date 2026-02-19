# Component Spec — LeadStatusBadge

## 1. Purpose

Displays a visually distinct badge indicating the current qualification status of a CRM lead (e.g., New, Contacted, Qualified, Unqualified, Converted). Provides immediate visual feedback on where a lead stands in the qualification process.

Use when: Communicating a lead's qualification status in a `LeadCard`, lead detail view, or any CRM context where lead status must be surfaced at a glance.

Do NOT use when: The entity is a deal (use `StageBadge`) or a general contact record without a lead qualification status.

---

## 2. UX Intent

- Primary interaction goal: Allow users to immediately identify a lead's qualification status without reading dense text — a quick visual scan of the badge communicates status at a glance.
- Expected user mental model: A colored status chip or pill familiar from CRM lead management views in Salesforce, HubSpot, or similar tools — each status has a distinct color and label.
- UX laws applied:
  - Hick's Law: A fixed, limited set of statuses (typically 4-6) prevents decision overload.
  - Pre-attentive Processing (Gestalt): Color and shape make the badge scannable before the user consciously reads the text.
  - Redundancy: Status is communicated by both color AND text label — never color alone.

---

## 3. Visual Behavior

- Layout: A small, pill-shaped chip with a colored background and a text label. May optionally include a small status dot icon to the left of the label.
- Spacing: Compact horizontal padding and minimal vertical padding using spacing tokens. The badge is designed to fit within tight card layouts.
- Typography: Label text uses a small, bold or medium-weight text token. All caps or sentence case — consistent with the design system's badge convention.
- Token usage: Each status maps to a semantic color token pair (background + text): New → info/blue, Contacted → purple, Qualified → success/green, Unqualified → muted/grey, Converted → accent. These are semantic tokens, not hardcoded hex values.
- Responsive behavior: Badge size remains consistent across breakpoints. Text does not truncate — status labels are kept short by design.

---

## 4. Interaction Behavior

- States:
  - Display-only (default): The badge is non-interactive and renders status as read-only.
  - Interactive (optional): If the badge acts as a trigger for a status change dropdown, it shows hover and focus states with a chevron indicator.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the status value and optionally an onChange callback for interactive mode.
- Keyboard behavior: If interactive, the badge is a button reachable via Tab and activatable via Enter/Space, opening a status selection menu.
- Screen reader behavior: The badge text is read as-is. If the badge is non-interactive, it has no special ARIA role. If interactive, it is a `<button>` with an `aria-label` including "Change status: [Current Status]".
- Motion rules: Status change (if interactive) transitions the background color smoothly. Reduced motion: instant color change.

---

## 5. Accessibility Requirements

- ARIA requirements: Non-interactive badge has no special ARIA role (text is sufficient). Interactive badge uses `role="button"` with an `aria-label` communicating both the current status and the change affordance. Status must never be communicated by color alone — the text label is always present.
- Focus rules: Non-interactive badges are not in the tab order. Interactive badges are a single tab stop.
- Contrast expectations: Badge text must meet WCAG AA against its status background color token. Status background tokens must be chosen to ensure this contrast is maintained in both light and dark modes.
- Reduced motion behavior: Color transition animations on status change are suppressed.

---

## 6. Theming Rules

- Required tokens (per status):
  - New: info background token, info text token.
  - Contacted: purple background token, purple text token.
  - Qualified: success background token, success text token.
  - Unqualified: muted background token, muted text token.
  - Converted: accent background token, accent text token.
  - Spacing tokens for padding, border radius token for pill shape.
- Prohibited hardcoded values: No hardcoded hex colors per status. All status colors reference semantic theme tokens.
- Dark mode expectations: Each status background token has a dark-mode variant that maintains WCAG AA contrast with its text token. Status is still visually distinguishable in dark mode.

---

## 7. Composition Rules

- What can wrap it: Used inside `LeadCard.Status`, lead detail pages, lead list rows, and any summary view displaying lead qualification status.
- What it may contain: A text label and an optional status dot icon. No other children.
- Anti-patterns:
  - Do not rely solely on color to communicate status — always include the text label.
  - Do not use this badge for deal stage (use `StageBadge`) or for generic tags (use a tag chip component).
  - Do not hardcode status-to-color mappings — always use semantic tokens.

---

## 8. Performance Constraints

- Memoization rules: The badge should be memoized and only re-render when the status prop changes.
- Virtualization: Not applicable.
- Render boundaries: No logic beyond rendering the appropriate visual for the given status.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct label and background color for each status value (New, Contacted, Qualified, Unqualified, Converted).
  - Non-interactive mode renders without a button role.
  - Interactive mode renders as a button with the correct `aria-label`.
- Interaction cases:
  - Interactive mode: Tab reaches the badge, Enter/Space opens the status menu.
  - Non-interactive mode: Badge is excluded from tab order.
- Accessibility checks:
  - Text label is always present (not icon/color only).
  - Non-interactive: no ARIA role required, text is sufficient.
  - Interactive: `role="button"` and descriptive `aria-label`.
  - Contrast passes for all status combinations in light and dark themes.
  - Reduced motion: color transition suppressed.
