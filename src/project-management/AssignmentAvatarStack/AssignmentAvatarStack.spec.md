# Component Spec — AssignmentAvatarStack

## 1. Purpose

Displays a compact horizontal stack of user avatars representing the people assigned to a task, project, or item. Communicates assignment density at a glance without listing each name explicitly.

Use when: showing multi-assignee information in compact contexts such as TaskCard, KanbanBoard cards, or table rows where full name lists would be too wide.

Do NOT use when: the full list of assignees needs to be shown with names and roles (use a dedicated member list component), or when only a single assignee is present (use a standalone Avatar).

---

## 2. UX Intent

- Primary interaction goal: Communicate at a glance who is assigned, and how many people are assigned, without taking excessive horizontal space.
- Expected user mental model: Users recognize the overlapping avatar stack pattern from project management tools like Linear, Jira, and GitHub (Jakob's Law). They understand that partial overlap indicates multiple people.
- UX laws applied:
  - Jakob's Law: Follow the overlapping avatar stack convention established by popular PM tools.
  - Gestalt (Proximity and Continuity): Overlapping avatars read as a single grouped element, not separate items.
  - Miller's Law: Show a maximum of 3–4 avatars before collapsing the remainder into a count badge (e.g., "+3").
  - Fitts's Law: If the stack is interactive (opens an assignee list), the entire stack must be a sufficient tap target.

---

## 3. Visual Behavior

- Layout rules:
  - Avatars are arranged in a horizontal row (XStack) with negative margin to create the overlapping effect.
  - The first avatar appears leftmost (or rightmost in RTL); subsequent avatars overlap from the right.
  - When the number of avatars exceeds the configured maximum (default: 3–4), a count overflow badge replaces the extras (e.g., "+5").
  - The overflow badge matches the avatar size and style.
- Spacing expectations: The overlap amount is a fixed proportion of the avatar size, defined via a token or computed from the avatar size token.
- Typography rules: Overflow count text uses a small label token, centered within the badge.
- Token usage: Avatar border (for separation between overlapping avatars), overflow badge background, and overflow badge text must use design tokens.
- Responsive behavior: The stack does not wrap; it collapses into the overflow badge pattern at the configured limit. At very small sizes the avatars may reduce to a minimum size token.

---

## 4. Interaction Behavior

- States:
  - Idle: Static stack of avatars.
  - Hover (web, interactive variant): Subtle scale or opacity shift on the stack.
  - Focus: Visible focus ring on the stack container when interactive.
  - Pressed: Brief press feedback when interactive.
  - Non-interactive: Static display only.
- Controlled vs uncontrolled: All data (avatar list, max count) is supplied via props. The component is purely presentational.
- Keyboard behavior:
  - If the stack is interactive (e.g., opens a member list popover), it is focusable via Tab and activates with Enter or Space.
  - Non-interactive stacks are not Tab stops.
- Screen reader behavior:
  - The stack has an accessible label summarizing all assignees (e.g., "Assigned to Alice, Bob, and 3 others").
  - Individual avatars within the stack are hidden from the accessibility tree (`aria-hidden="true"`) to avoid redundant announcements.
- Motion rules: Hover transitions are brief (under 150ms). Reduced motion suppresses all transitions.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - The stack container has an `aria-label` that lists all assignees by name (or summarizes with count).
  - Individual avatar images inside use `aria-hidden="true"`.
  - If interactive, the container uses `role="button"` with `aria-label`.
- Focus rules: If interactive, the stack is a single Tab stop with a visible focus ring. Non-interactive stacks are excluded from the Tab order.
- Contrast expectations: Avatar border (for overlap separation) must be visible against surrounding backgrounds in both light and dark mode. Overflow badge text must meet 4.5:1 against its background.
- Reduced motion behavior: All hover/focus animations are instant.

---

## 6. Theming Rules

- Required tokens: avatar border color (used as separation ring), overflow badge background, overflow badge text color, focus ring color, radius (must be circular for avatars — use a 9999 or max radius token).
- Prohibited hardcoded values: No hardcoded hex colors, pixel sizes, or border widths.
- Dark mode expectations: Avatar border separation ring must be visible on dark backgrounds. Overflow badge must maintain contrast in dark mode.

---

## 7. Composition Rules

- What can wrap it: TaskCard, KanbanBoard card, table row cells, GanttChart row metadata, SprintHeader.
- What it may contain: Individual Avatar components (from the primitives module) and an overflow count badge.
- Anti-patterns:
  - Do not use AssignmentAvatarStack as a full member-management control — it is a display-only component.
  - Do not show more than the configured maximum avatars before collapsing; always use the overflow pattern.
  - Do not nest another AssignmentAvatarStack inside itself.

---

## 8. Performance Constraints

- Memoization rules: The stack should be memoized. Re-renders should only occur when the assignee list prop changes.
- Virtualization: Not applicable — the stack always collapses at a low fixed count.
- Render boundaries: The stack is a leaf component. Avatar list changes must not propagate re-renders to the host card.

---

## 9. Test Requirements

- What must be tested:
  - Correct number of avatars renders when the list is within the max count.
  - Overflow badge renders with the correct count when the list exceeds the max.
  - The accessible label accurately names all assignees.
  - Empty list renders no avatars and no overflow badge.
- Interaction cases:
  - If interactive, Enter/Space activates the stack action.
  - Tab includes interactive stack in focus order; non-interactive is excluded.
- Accessibility checks:
  - Stack has an `aria-label` naming all assignees.
  - Individual avatars are `aria-hidden`.
  - Focus ring is visible on interactive stacks.
  - Overflow badge text contrast passes 4.5:1.
  - Reduced motion suppresses transitions.
