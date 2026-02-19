# Component Spec — AccessControlBadge

## 1. Purpose

Communicates a user's or resource's access control level at a glance using a compact, inline badge.

Use it when the access level of a user, group, or resource must be immediately visible within lists, tables, cards, or detail views.

Do NOT use it as a primary call-to-action, as a clickable navigation element, or to replace a full permission editor.

---

## 2. UX Intent

- Primary interaction goal: passive recognition — the user reads and understands an access level without needing to interact.
- Expected user mental model: a status tag or chip that communicates a single, categorical permission level (e.g., "Read", "Write", "Admin", "No Access").
- UX laws applied:
  - Jakob's Law: match familiar badge/chip patterns found in admin UIs so users recognize meaning immediately.
  - Gestalt Law of Similarity: consistent badge shape, size, and color coding across access levels reinforces categorical grouping.
  - Hick's Law: one badge conveys one discrete state, minimizing cognitive load per item.

---

## 3. Visual Behavior

- Layout: inline-block; does not stretch to fill its container. Fixed or content-driven width.
- Spacing: internal padding is defined by space tokens (horizontal padding larger than vertical to give pill-like proportions).
- Typography: short, uppercase or title-case label text using a small/caption scale from the type system. No wrapping — text is always single-line.
- Token usage:
  - Background: semantic color tokens mapped to access level (e.g., `color.accentPositive`, `color.accentWarning`, `color.accentDestructive`, `color.surfaceMuted`).
  - Text: a contrasting foreground token appropriate for each background.
  - Border radius: rounded using a radius token (pill or medium radius).
  - No hardcoded hex values or raw spacing numbers.
- Responsive behavior: size remains constant across breakpoints; it is not expected to reflow or resize.

---

## 4. Interaction Behavior

- States:
  - Idle: displays the access level label with the appropriate semantic color.
  - Disabled: not applicable (non-interactive).
  - Loading: not applicable (static display only).
  - Error: not applicable at the badge level; parent component handles error state.
- Controlled vs uncontrolled: display-only; no internal state.
- Keyboard behavior: not focusable unless placed inside a focusable parent.
- Screen reader behavior: the label text is the accessible name; no additional role is needed beyond the rendered text.
- Motion rules: no animations. No reduced-motion considerations required for static badges.

---

## 5. Accessibility Requirements

- ARIA requirements: no special ARIA role required. If the badge conveys meaning through color alone, an accessible text label must always be present (color is supplementary, not the only indicator).
- Focus rules: not in the tab order by default; must not receive focus independently.
- Contrast expectations: text-to-background contrast must meet WCAG AA (4.5:1 minimum for small text).
- Reduced motion behavior: no motion present; no change needed.

---

## 6. Theming Rules

- Required tokens: background color, foreground/text color, border-radius, horizontal and vertical padding (space tokens), font-size (type scale token).
- Prohibited hardcoded values: no raw hex colors, no pixel-based spacing literals, no hardcoded font sizes.
- Dark mode expectations: semantic color tokens must resolve to appropriate dark-mode equivalents automatically through the theme system. Contrast ratios must hold in both light and dark modes.

---

## 7. Composition Rules

- What can wrap it: table cells, list items, card headers, detail view rows, tooltips.
- What it may contain: a single short text label; optionally a small icon to the left of the label.
- Anti-patterns:
  - Do not nest interactive elements (buttons, links) inside the badge.
  - Do not use the badge to display multi-word sentences or explanatory text.
  - Do not use more than one AccessControlBadge per logical item without clear visual separation.

---

## 8. Performance Constraints

- Memoization rules: memoize if rendered in large lists (e.g., inside TeamMemberTable rows) to prevent unnecessary re-renders when parent state changes.
- Virtualization: not responsible for virtualization; the parent list/table handles this.
- Render boundaries: should be a pure, side-effect-free render from props alone.

---

## 9. Test Requirements

- What must be tested:
  - Renders correctly for each valid access level variant (e.g., read, write, admin, none).
  - Displays the correct label text for each variant.
  - Applies the correct semantic color token class/style per variant.
- Interaction cases: none (non-interactive component).
- Accessibility checks:
  - Label text is present and visible.
  - Color contrast meets WCAG AA in both light and dark themes.
  - Component does not receive focus when rendered standalone.
