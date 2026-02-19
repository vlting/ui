# Component Spec — RoleBadge

## 1. Purpose

Communicates a user's assigned organizational role (e.g., Owner, Admin, Member, Viewer, Guest) as a compact, inline visual indicator.

Use it in team member tables, user profile headers, invitation confirmations, and anywhere a role label needs to appear inline alongside other content.

Do NOT use it as a role editor or selector, as a navigation element, or as a substitute for a full permissions explanation.

---

## 2. UX Intent

- Primary interaction goal: passive recognition — the user reads a role name and immediately understands the access level it implies.
- Expected user mental model: a status chip/tag that labels a person's authority level. Consistent with role indicators in products like GitHub, Notion, and Linear.
- UX laws applied:
  - Jakob's Law: use the same chip/tag visual pattern as AccessControlBadge so users recognize it as a categorical label without re-learning the pattern.
  - Gestalt Law of Similarity: consistent shape, size, and color convention across all role variants reinforces that these are all members of the same category of information.
  - Hick's Law: a single badge conveys a single role — no compound states or mixed roles in one badge.

---

## 3. Visual Behavior

- Layout: inline-block, width driven by content. Does not stretch.
- Spacing: horizontal padding larger than vertical (pill-like proportions) using space tokens.
- Typography: short role name, single line, using a small/caption or label scale. No wrapping.
- Token usage:
  - Background: a distinct semantic color token per role tier. Higher-authority roles (Owner, Admin) use a more prominent token. Lower-authority roles (Viewer, Guest) use a muted token.
  - Text: a contrasting foreground token for each background.
  - Border radius: pill or medium radius from the radius token scale.
  - No hardcoded colors or spacing values.
- Responsive behavior: size remains constant across breakpoints. The parent controls density adjustments.

---

## 4. Interaction Behavior

- States:
  - Idle: displays the role label with its associated semantic color.
  - No hover, focus, or active states (non-interactive).
  - Disabled: not applicable.
  - Loading: not applicable.
- Controlled vs uncontrolled: display-only. Accepts a `role` prop (string or enum value).
- Keyboard behavior: not focusable; does not participate in tab order.
- Screen reader behavior: the role label text is the accessible name. No additional ARIA role is required.
- Motion rules: no animations.

---

## 5. Accessibility Requirements

- ARIA requirements: no special ARIA role. The role label text must always be present as visible text (color is supplementary).
- Focus rules: not focusable.
- Contrast expectations: text-to-background contrast must meet WCAG AA (4.5:1 minimum) for all role variants in both light and dark themes.
- Reduced motion behavior: no motion; not applicable.

---

## 6. Theming Rules

- Required tokens: background color token (per role variant), foreground/text color token (per role variant), border-radius token, horizontal and vertical padding (space tokens), font-size (type scale token).
- Prohibited hardcoded values: no raw hex colors, no pixel-based padding, no hardcoded font sizes.
- Dark mode expectations: each role variant's background and text tokens must resolve to appropriate dark-mode values while maintaining required contrast ratios.

---

## 7. Composition Rules

- What can wrap it: TeamMemberTable rows, user profile sections, OrgSwitcher items, InviteUserModal confirmations, AuditLogViewer rows.
- What it may contain: a single text label. Optionally a small icon to the left of the label.
- Anti-patterns:
  - Do not nest interactive elements inside RoleBadge.
  - Do not use RoleBadge to display arbitrary non-role labels (use a generic Badge or Tag component for that purpose).
  - Do not display more than one RoleBadge per user per context — if a user has multiple roles, show the highest-authority role and indicate multiplicity via another pattern.

---

## 8. Performance Constraints

- Memoization rules: memoize when rendered in large lists (e.g., TeamMemberTable).
- Virtualization: not responsible for virtualization.
- Render boundaries: pure render from the `role` prop. No side effects.

---

## 9. Test Requirements

- What must be tested:
  - Renders the correct label for each valid role variant.
  - Applies the correct semantic color token class per role variant.
  - Does not render interactive affordances (no button, no link behavior).
- Interaction cases: none (non-interactive).
- Accessibility checks:
  - Role label text is always present and visible.
  - Contrast meets WCAG AA for all variants in both light and dark themes.
  - Component does not receive focus.
