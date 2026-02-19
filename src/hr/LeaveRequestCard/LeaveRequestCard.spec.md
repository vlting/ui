# Component Spec — LeaveRequestCard

## 1. Purpose

Displays a summary of an individual employee leave request, including the requester's identity, leave type, dates, duration, and current approval status. Used in HR leave management dashboards, manager approval queues, and employee self-service portals.

Do NOT use this component for detailed leave policy information (use a content page), for aggregate leave statistics (use a chart or summary widget), or for the leave request submission form (use a dedicated form component).

---

## 2. UX Intent

- Primary interaction goal: give HR professionals, managers, and employees a compact, scannable summary of a leave request and its status at a glance, without opening a detail view.
- Expected user mental model: a record card similar to a task or ticket card in a project management tool — showing who, what, when, and the current state prominently.
- UX laws applied:
  - Gestalt (Proximity, Hierarchy): requester identity and leave dates are visually grouped; status badge is visually prominent and distinct.
  - Jakob's Law: card layout follows established HR platform conventions for leave/absence records.
  - Fitts's Law: if the card is interactive (navigate to detail), the full card surface acts as the touch target.
  - Aesthetic-Usability Effect: a clean card layout encourages trust in the displayed status.

---

## 3. Visual Behavior

- Layout: a card containing a header row (requester avatar/name + status badge), a body section (leave type, date range, duration in days), and an optional footer (submission date, approver name, or action buttons for quick approve/reject).
- Spacing: card padding, section gaps, and avatar-to-name gap all use space tokens.
- Typography: requester name uses a medium-weight body token. Leave type uses a regular body token. Date range uses a secondary body token. Status badge uses a caption token. Duration uses a secondary/muted caption token.
- Token usage: card background, border, shadow, status badge background and text (semantic color tokens per status: pending, approved, rejected, cancelled), avatar fallback background, and muted text color must all use design tokens.
- Responsive behavior: card fills its container width. On very narrow screens, the header row stacks the avatar/name above the status badge if horizontal space is insufficient.

---

## 4. Interaction Behavior

- States:
  - Default (non-interactive): purely presentational.
  - Pending status: status badge shows warning/pending semantic token colors.
  - Approved status: status badge shows success semantic token colors.
  - Rejected status: status badge shows error/danger semantic token colors.
  - Cancelled status: status badge shows muted/neutral semantic token colors.
  - Hoverable/Pressable (if interactive): card surface shows hover background token; cursor becomes a pointer.
  - Focused (if interactive): card has a visible focus ring.
  - Loading: skeleton placeholders replace each data region when data is pending.
- Controlled vs uncontrolled: purely display-driven by props. No internal state beyond optional hover/press feedback.
- Keyboard behavior: if interactive, the card is a focusable element activated by Enter or Space. Non-interactive cards are not in the Tab order.
- Screen reader behavior: the card announces as a named region or article. Key data points (requester name, leave type, date range, duration, status) are read in a logical order. If interactive, the card announces as a button or link labeled with the requester name and leave type.
- Motion rules: hover background transition uses a short duration token suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA: a non-interactive card uses `role="article"` or appropriate landmark. An interactive card uses `role="button"` or is wrapped in an anchor. The status badge uses `aria-label` to supplement any color-only encoding (e.g., "Status: Approved").
- Focus rules: interactive cards are reachable via Tab and activated by Enter/Space. Non-interactive cards are excluded from Tab order.
- Contrast: all text (requester name, dates, type, status badge text) must meet WCAG AA contrast against the card background using design tokens.
- Reduced motion: suppress hover transition.

---

## 6. Theming Rules

- Required tokens: card background, border, shadow, status badge semantic colors (pending, approved, rejected, cancelled), avatar fallback color, text colors (primary, secondary, muted), hover background, focus ring color, space tokens, radius token, typography scale tokens.
- Prohibited hardcoded values: no hardcoded colors, spacing, or font sizes.
- Dark mode: all token references, including status badge colors, must resolve to accessible values in dark mode without manual overrides.

---

## 7. Composition Rules

- What can wrap it: approval queue lists, leave management dashboards, employee self-service portals, and scrollable panels. Must be a descendant of the design system Provider.
- What it may contain: requester identity section, status badge, leave metadata section (type, dates, duration), optional footer with submission details or quick action buttons. Quick action buttons in the footer (approve/reject) delegate via callback props.
- Anti-patterns:
  - Do not embed API calls for approve/reject directly — delegate via callbacks.
  - Do not use this for aggregate team leave statistics.
  - Do not display more than one request's data within a single card instance.

---

## 8. Performance Constraints

- Memoization: the card should be memoized; re-renders occur only when request data props change.
- Virtualization: when displayed in a long approval queue (50+ cards), the parent list must virtualize; individual cards must not implement their own virtualization.
- Render boundaries: date formatting and duration calculation must be performed outside the component and passed as pre-formatted strings or values.

---

## 9. Test Requirements

- Rendering: renders correctly for each status variant (pending, approved, rejected, cancelled).
- Data display: requester name, leave type, date range, duration, and status are all displayed correctly from props.
- Status badge: correct semantic token color and label for each status.
- Interactive variant: card is focusable, hoverable, and activatable via keyboard.
- Non-interactive variant: card is not in the Tab order.
- Accessibility: article/button role as appropriate; status badge aria-label; readable content order.
- Loading/skeleton: skeleton placeholders appear when data is pending.
- Theming: renders correctly in light and dark token contexts.
- Reduced motion: no hover transition animation when motion is reduced.
