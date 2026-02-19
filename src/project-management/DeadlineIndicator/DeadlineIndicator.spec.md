# Component Spec — DeadlineIndicator

## 1. Purpose

Displays the deadline or due date of a task or project item as a compact, status-aware indicator. Communicates urgency through visual treatment based on the deadline's proximity to the current date.

Use when: showing deadline status within task cards, list rows, Gantt chart rows, or detail panels where the due date's urgency is important contextual information.

Do NOT use when: a plain date label with no urgency context is sufficient, or when displaying a full scheduling timeline (use GanttChart or CalendarView).

---

## 2. UX Intent

- Primary interaction goal: Allow users to quickly identify which items are overdue, due soon, or have ample time remaining — without reading a date in detail.
- Expected user mental model: Users associate color-coded date badges with deadline urgency from tools like Jira, Trello, and Linear (Jakob's Law). Red means overdue, amber means soon, neutral means on track.
- UX laws applied:
  - Jakob's Law: Follow the color-coded deadline badge convention from popular PM tools.
  - Gestalt (Figure/Ground): The indicator is a bounded badge that stands out from the task card background.
  - Pre-attentive processing: Color and iconography communicate urgency before the user reads the text, enabling rapid scanning of lists.

---

## 3. Visual Behavior

- Layout rules:
  - A compact, inline badge-style container with an optional calendar or clock icon on the left and a date label on the right.
  - Badge width adapts to the date text length; it does not stretch to fill its container.
  - Three visual states correspond to deadline urgency: overdue (error token), due soon (warning token), on track (neutral/secondary token).
- Spacing expectations: Internal badge padding uses small space tokens. Gap between icon and date text uses a small space token.
- Typography rules: Date text uses a caption or small label token. Urgency states change the text color token, not the font size or weight.
- Token usage: Badge background, text, and border/icon colors must map to design tokens (error, warning, neutral/secondary). No hardcoded hex values.
- Responsive behavior: The indicator is a fixed-size inline element. It does not scale with its container but respects the minimum touch target size requirement on mobile.

---

## 4. Interaction Behavior

- States:
  - On track: Neutral color token treatment.
  - Due soon (within a configurable threshold, e.g., 2 days): Warning token treatment.
  - Overdue: Error token treatment.
  - No deadline set: Component is not rendered (or renders a neutral "No due date" placeholder if explicitly required).
- Controlled vs uncontrolled: All state is derived from the `deadline` date prop and the current date. The component does not manage state.
- Keyboard behavior: Non-interactive by default. If made interactive (e.g., opens a date picker), it is focusable via Tab and activates with Enter or Space.
- Screen reader behavior:
  - The indicator is announced with the full date and urgency context (e.g., "Due March 10, overdue" or "Due March 15, due soon").
  - Urgency must not be conveyed through color alone — it must be present in the accessible text.
- Motion rules: No motion on this component. Urgency state changes are instant.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - If non-interactive: rendered with a visually hidden text equivalent that includes both the date and the urgency status.
  - If interactive: `role="button"` with `aria-label` describing the date and urgency.
  - The `time` element is used with a machine-readable `dateTime` attribute in HTML contexts.
- Focus rules: Non-interactive instances are not Tab stops. Interactive instances include a visible focus ring.
- Contrast expectations: Text within the badge must meet 4.5:1 against the badge background. Urgency must not be communicated through color alone — an icon and/or text label must also indicate status.
- Reduced motion behavior: No animations; not applicable.

---

## 6. Theming Rules

- Required tokens: neutral badge background and text (on track), warning badge background and text (due soon), error badge background and text (overdue), focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex colors, border widths, or font sizes.
- Dark mode expectations: Error, warning, and neutral badge tokens must resolve to appropriate dark-mode values. Badge text must maintain sufficient contrast on dark badge backgrounds.

---

## 7. Composition Rules

- What can wrap it: TaskCard, SubtaskList rows, GanttChart row metadata, TaskDetailPanel metadata section, list row cells.
- What it may contain: An optional icon and a date label text.
- Anti-patterns:
  - Do not use DeadlineIndicator to display non-date information.
  - Do not rely on color alone to communicate urgency — always pair with a text label or icon.
  - Do not place DeadlineIndicator inside another badge or indicator component.

---

## 8. Performance Constraints

- Memoization rules: The indicator should be memoized. It only needs to re-render when the `deadline` prop changes or the urgency threshold boundary is crossed.
- Virtualization: Not applicable.
- Render boundaries: Leaf component. Urgency recalculation must not trigger re-renders in parent card components.

---

## 9. Test Requirements

- What must be tested:
  - On-track state renders with neutral token treatment for dates sufficiently in the future.
  - Due-soon state renders with warning token treatment when within the threshold window.
  - Overdue state renders with error token treatment for past dates.
  - The accessible label includes both the date and the urgency status.
  - No deadline: component renders a placeholder or nothing, as specified.
- Interaction cases:
  - If interactive, Enter/Space activates the deadline picker action.
- Accessibility checks:
  - Urgency is communicated via text and/or icon, not color alone.
  - `time` element has a `dateTime` attribute.
  - Interactive variant has a visible focus ring and accessible label.
  - Contrast ratios pass for all urgency states in both light and dark themes.
