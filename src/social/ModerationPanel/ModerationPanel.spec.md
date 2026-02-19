# Component Spec — ModerationPanel

## 1. Purpose

Provides a structured panel for platform moderators to review reported content, take moderation actions (approve, remove, warn, ban), and view the context and history of a reported item. This is an internal or admin-facing surface, not visible to general users.

Use when: a platform moderator needs to evaluate a report, see the reported content in context, and apply an appropriate moderation action from a single surface.

Do NOT use when: the user is a general member reporting content (use ReportContentModal), or when administrative tools beyond content moderation are needed (use a full admin dashboard).

---

## 2. UX Intent

- Primary interaction goal: Enable moderators to make fast, confident decisions about reported content with all necessary context available in one view.
- Expected user mental model: Moderators expect a triage-style interface similar to support ticket systems or admin review queues — reported item on the left/top, actions on the right/bottom (Jakob's Law from admin tools).
- UX laws applied:
  - Jakob's Law: Follow triage/review queue patterns from admin and moderation tools.
  - Hick's Law: Moderation actions should be presented as a small set of clearly labeled, mutually exclusive options (Approve, Remove, Warn, Escalate) — not an overwhelming list.
  - Fitts's Law: Action buttons must be large and clearly separated to prevent accidental activation of destructive actions.
  - Miller's Law: Group moderation context (report reason, reporter info, history) into labeled sections rather than an undifferentiated block of text.
  - Tesler's Law: Confirmation for destructive actions (remove, ban) is required; the complexity of "are you sure?" is necessary and must not be simplified away.

---

## 3. Visual Behavior

- Layout rules:
  - A vertical panel with a header (report ID, content type, report reason), a content preview section (the reported item displayed in context), a report details section (reporter, date, prior actions), and an actions section at the bottom.
  - Actions section contains clearly labeled buttons for each moderation action.
  - Destructive actions (remove, ban) are visually distinct (using error/danger token) and separated from non-destructive actions.
  - An optional notes/comment field allows the moderator to add context to their action.
- Spacing expectations: Section padding uses a large space token. Action button group uses a medium gap. The destructive action button is visually separated from others.
- Typography rules: Report ID and content type use a heading token. Section labels use a label token at medium weight. Report details use a body token.
- Token usage: Panel background, section dividers, action button backgrounds (including danger variant), and all text must use design tokens.
- Responsive behavior: On wide viewports, content preview and report details may appear in a two-column layout. On narrow viewports, sections stack vertically.

---

## 4. Interaction Behavior

- States:
  - Idle: Panel loaded with report details; actions available.
  - Loading: Skeleton placeholders while report data fetches.
  - Action in progress: The activated action button shows a loading state; other actions are disabled.
  - Confirmed action: Success state shown with the applied action outcome.
  - Error: Error message shown if an action fails.
- Controlled vs uncontrolled: All data and action callbacks are controlled by the parent.
- Keyboard behavior:
  - Tab moves through all interactive elements in DOM order.
  - Destructive action buttons require an additional confirmation step before the action fires — this must also be keyboard-accessible.
  - Enter or Space activates focused action buttons.
  - Escape dismisses confirmation dialogs without taking action.
- Screen reader behavior:
  - The panel uses `role="region"` or `role="dialog"` with an accessible label identifying the report.
  - Action buttons have descriptive labels (e.g., "Remove content", "Warn user [username]").
  - Confirmation dialogs announce their purpose clearly.
  - Success and error states use live regions.
- Motion rules: Loading and transition states use brief animations (under 200ms). Reduced motion suppresses all animations.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - Panel: `role="region"` with `aria-label` (e.g., "Moderation review: Report #1234").
  - Destructive action confirmation: `role="alertdialog"` with descriptive label and explicit confirm/cancel buttons.
  - Action buttons use descriptive `aria-label` values including the target (e.g., content or user).
  - Success/error messages use `role="status"` or `role="alert"`.
  - Loading state: `aria-busy="true"` on the panel.
- Focus rules: On open, focus moves to the first interactive element. Confirmation dialogs trap focus within their boundary. On dialog close, focus returns to the triggering action button.
- Contrast expectations: All text must meet 4.5:1. Destructive action button text must meet 4.5:1 against the danger background. Warning indicators must not rely on color alone.
- Reduced motion behavior: All transitions and animations are instant.

---

## 6. Theming Rules

- Required tokens: panel background, section divider, standard action button tokens, destructive action button tokens (error/danger variant), success state color, error state color, text primary, text secondary, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Panel and section backgrounds shift to dark tokens. Destructive action buttons maintain clear visual distinction in dark mode.

---

## 7. Composition Rules

- What can wrap it: A moderation queue page, a full-screen admin view, or a modal/drawer context.
- What it may contain: Report header, content preview (read-only rendering of the reported content), report metadata section, action buttons, optional notes input, and optional action history.
- Anti-patterns:
  - Do not use ModerationPanel for general user-facing content — this is a moderator/admin-only surface.
  - Do not omit confirmation for destructive actions.
  - Do not display the reported content in a fully interactive state — it must be a read-only preview.

---

## 8. Performance Constraints

- Memoization rules: The content preview and report details sections should be memoized. Action state changes must not re-render the content preview.
- Virtualization: Not applicable (single report view).
- Render boundaries: The content preview, report metadata, and action section are independent render boundaries.

---

## 9. Test Requirements

- What must be tested:
  - Report details (ID, reason, reporter, date) render from props.
  - Content preview renders a read-only view of the reported content.
  - All action buttons render and fire their respective callbacks.
  - Destructive actions require a confirmation step before firing.
  - Success state renders after a successful action.
  - Error state renders when an action fails.
  - Loading state renders skeleton placeholders.
- Interaction cases:
  - Tab moves through all interactive elements in DOM order.
  - Enter/Space activates action buttons.
  - Escape dismisses a confirmation dialog without taking action.
  - Confirmation dialog traps focus.
- Accessibility checks:
  - Panel has `role="region"` with accessible label.
  - Confirmation dialog has `role="alertdialog"`.
  - Action buttons have descriptive labels.
  - Success/error use live regions.
  - Focus moves to the panel on open and to the confirmation trigger on dialog open.
  - Destructive action is distinguishable by more than color alone.
  - Contrast ratios pass in both themes.
  - Reduced motion suppresses all animations.
