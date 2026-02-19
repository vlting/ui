# Component Spec — ReminderItem

## 1. Purpose

Displays a single reminder as a structured list item. Communicates the reminder's title, due time, and completion or urgency status in a compact, scannable row.

Use when: rendering individual reminders within a reminder list, a PersonalDashboard section, or a notification-style feed.

Do NOT use when: displaying a full task with subtasks and detailed metadata (use TaskCard or TaskDetailPanel instead), or when showing a calendar event (use EventCard).

---

## 2. UX Intent

- Primary interaction goal: Allow the user to quickly read, acknowledge, or dismiss a reminder with minimal interaction cost.
- Expected user mental model: Users expect a reminder item to behave like a checklist row or a notification line item — scannable, actionable with a single tap (Jakob's Law from OS reminders and to-do apps).
- UX laws applied:
  - Jakob's Law: Match the checkbox-row pattern familiar from Apple Reminders, Google Tasks, and similar apps.
  - Fitts's Law: The completion checkbox or dismiss action must be a large, easy-to-hit target (minimum 44x44pt).
  - Miller's Law: Show only title, due time, and urgency indicator per item — no more than necessary.
  - Gestalt (Figure/Ground): Overdue or urgent reminders are visually distinct from normal reminders through color or iconography, but always using design tokens.

---

## 3. Visual Behavior

- Layout rules:
  - A horizontal row containing a completion checkbox or indicator on the left, the reminder title in the center, and the due time on the right.
  - An optional urgency indicator (icon or accent color) appears adjacent to the title or as a left border accent.
  - Completed reminders show a strikethrough on the title and a de-emphasized visual treatment.
  - Overdue reminders use a distinct color token (e.g., error/warning) on the due time or indicator.
- Spacing expectations: Row padding uses space tokens to ensure a comfortable touch target height. Horizontal gap between checkbox, title, and timestamp uses space tokens.
- Typography rules: Title uses a body token at regular weight. Due time uses a caption token in secondary color. Overdue time uses an error or warning color token.
- Token usage: All colors, including urgency indicators and completed-state treatments, must use design tokens.
- Responsive behavior: On narrow viewports, the due time may stack below the title rather than sitting inline.

---

## 4. Interaction Behavior

- States:
  - Idle (pending): Normal display, checkbox unchecked.
  - Hover (web): Subtle background highlight on the row.
  - Focus: Visible focus ring around the row or the checkbox.
  - Completed: Checkbox checked, title struck through, row de-emphasized.
  - Overdue: Due time rendered in warning/error token color; optional urgency icon.
  - Disabled: Row is non-interactive, fully de-emphasized.
- Controlled vs uncontrolled: The completed state is a controlled prop. The parent manages state; ReminderItem fires a callback on completion toggle.
- Keyboard behavior:
  - Tab includes the row (or its interactive elements) in the focus order.
  - Space or Enter toggles the completion state when the checkbox or row is focused.
- Screen reader behavior:
  - The row is announced with the reminder title, due time, and completion status.
  - Overdue items include an "overdue" label in the accessible description.
  - Completing an item announces "Reminder marked as complete."
- Motion rules: Completion toggle (strikethrough, opacity change) animates briefly (under 150ms). All motion is suppressed under reduced motion preference.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - The completion control uses `role="checkbox"` with `aria-checked` reflecting the completed state.
  - The row item uses `role="listitem"` when inside a `role="list"`.
  - Overdue status is communicated via `aria-describedby` or additional visually hidden text — not color alone.
- Focus rules: The checkbox or the full row is included in the Tab order. Focus ring must be clearly visible.
- Contrast expectations: Title text must meet 4.5:1. Secondary text (due time) must meet 3:1. Overdue color must not be the sole indicator — an icon or label must also convey urgency.
- Reduced motion behavior: Completion animation is instant.

---

## 6. Theming Rules

- Required tokens: row background (idle, hover, completed), text primary (title), text secondary (due time), text strikethrough/de-emphasis, error/warning color token (overdue), checkbox foreground and background, focus ring, space, radius.
- Prohibited hardcoded values: No hardcoded hex values, spacing, or font sizes.
- Dark mode expectations: Row background, text, and urgency indicator tokens shift to dark-mode equivalents. Completed de-emphasis remains visible in dark mode.

---

## 7. Composition Rules

- What can wrap it: A `role="list"` container within a PersonalDashboard section, a dedicated reminders panel, or a notification feed. ReminderItem must always appear inside an appropriate list container.
- What it may contain: A checkbox indicator, a title label, a due time label, and an optional urgency icon.
- Anti-patterns:
  - Do not nest interactive forms or editable text inside ReminderItem — it is a display and toggle component only.
  - Do not use ReminderItem to display tasks with subtasks; use TaskCard.
  - Do not convey urgency or overdue status through color alone.

---

## 8. Performance Constraints

- Memoization rules: ReminderItem must be memoized. A completion toggle on one item must not trigger re-renders of sibling items.
- Virtualization: When used in a long reminder list, the parent list container is responsible for virtualization. ReminderItem itself has no virtualization responsibilities.
- Render boundaries: ReminderItem is a leaf render boundary. Its completion state changes are isolated.

---

## 9. Test Requirements

- What must be tested:
  - Title and due time render correctly from props.
  - Completed state applies strikethrough and de-emphasized treatment.
  - Overdue state applies the error/warning color to the due time.
  - Toggling the checkbox fires the completion callback.
  - Disabled state prevents interaction.
- Interaction cases:
  - Space/Enter on the focused checkbox toggles completion.
  - Tab includes the checkbox in the focus order.
  - Click/tap on the checkbox fires the callback.
- Accessibility checks:
  - `role="checkbox"` and `aria-checked` are correct.
  - Overdue status is conveyed via text, not color alone.
  - Focus ring is visible on keyboard focus.
  - Title contrast passes 4.5:1 in both themes.
  - Due time contrast passes 3:1.
  - Reduced motion suppresses completion animation.
