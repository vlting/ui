# Component Spec — ReportContentModal

## 1. Purpose

Provides a modal dialog for users to report a post, comment, or other content item as violating community guidelines. The modal guides the user through selecting a report reason and optionally adding additional context before submitting.

Use when: a user initiates a report action from a content item's overflow menu or dedicated "Report" control. This is the general-user reporting surface; it does not expose moderation actions.

Do NOT use when: a platform moderator is reviewing reported content (use ModerationPanel), or when only a binary flag (no form) is needed.

---

## 2. UX Intent

- Primary interaction goal: Allow users to report problematic content quickly and with sufficient specificity for the moderation team to act appropriately.
- Expected user mental model: Users expect a report modal to behave like the reporting flows on Twitter/X, Instagram, or YouTube (Jakob's Law) — a small dialog with a list of violation categories and a submit button.
- UX laws applied:
  - Jakob's Law: Follow the category-selection report flow from established social platforms.
  - Hick's Law: Present a limited set of report categories (5–8 max) to keep the decision fast.
  - Fitts's Law: Category options must be large, full-width touch targets. The submit button must be prominent.
  - Tesler's Law: The user should not need to write a detailed report. Category selection is the minimum required input; additional detail is optional.
  - Doherty Threshold: The modal must open and be interactive within 400ms.

---

## 3. Visual Behavior

- Layout rules:
  - A modal dialog with a header (title: "Report content", close/X button), a list of selectable report categories (radio button or tappable list items), an optional "Additional details" text area, and a footer with Cancel and Submit buttons.
  - Categories are displayed as full-width tappable rows with a label and a selection indicator.
  - The Submit button is disabled until a category is selected.
  - A success screen replaces the form after successful submission.
- Spacing expectations: Modal internal padding uses a medium space token. Gap between category rows uses a small space token. Footer button gap uses a medium space token.
- Typography rules: Modal title uses a heading token. Category labels use a body token. Optional textarea placeholder uses a body token in secondary color.
- Token usage: Modal background, overlay scrim, category row (idle and selected), submit button, and all text must use design tokens.
- Responsive behavior: On narrow viewports, the modal expands to full screen or a bottom sheet. On wide viewports, the modal is centered with a max width constraint.

---

## 4. Interaction Behavior

- States:
  - Idle: Category list visible; no selection; Submit disabled.
  - Category selected: Selecting a category enables Submit.
  - With additional details: Optional textarea is filled.
  - Submitting: Submit button shows loading state; all inputs are disabled.
  - Success: Form is replaced with a confirmation message.
  - Error: Inline error message; inputs re-enabled for retry.
- Controlled vs uncontrolled: The modal's open/closed state is controlled by the parent. The selected category and textarea value may be uncontrolled internally.
- Keyboard behavior:
  - Focus moves to the modal on open (to the title or first interactive element).
  - Tab cycles through category options, optional textarea, Cancel, and Submit.
  - Arrow Up/Down navigate between category radio options.
  - Enter or Space selects the focused category.
  - Escape closes the modal and dismisses the report.
  - Focus is trapped within the modal while it is open.
- Screen reader behavior:
  - The modal uses `role="dialog"` with `aria-modal="true"` and `aria-labelledby` referencing the modal title.
  - Category list uses `role="radiogroup"` with `aria-label`.
  - Each category uses `role="radio"` with `aria-checked`.
  - Submit button is `aria-disabled` when no category is selected.
  - Success and error states use live regions.
- Motion rules: Modal open/close uses a brief fade or scale animation. Reduced motion makes this instant.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (modal title).
  - Category group: `role="radiogroup"` with `aria-label` ("Report reason").
  - Each category: `role="radio"` with `aria-checked`.
  - Submit: `aria-disabled="true"` when no category is selected.
  - Success: `role="status"` or `aria-live="polite"`.
  - Error: `role="alert"`.
  - Close button: `aria-label` ("Close report dialog").
- Focus rules: On open, focus moves to the dialog title or first interactive element. Focus is trapped within the modal. On close, focus returns to the triggering element (e.g., the "Report" overflow menu item).
- Contrast expectations: Category label text must meet 4.5:1. Selected category indicator must meet 3:1 against the background. Submit button text must meet 4.5:1.
- Reduced motion behavior: Modal open/close animation is instant.

---

## 6. Theming Rules

- Required tokens: modal background, scrim/overlay color (semi-transparent), category row idle and selected backgrounds, selection indicator color, submit button tokens, cancel button tokens, text primary, text secondary (textarea placeholder), error color, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded hex colors, spacing, or font sizes.
- Dark mode expectations: Modal background and category rows shift to dark tokens. Selection indicator and submit button remain distinguishable in dark mode.

---

## 7. Composition Rules

- What can wrap it: A modal portal at the application root. Triggered from PostCard overflow menu, CommentItem.Actions, or any content item's "Report" control.
- What it may contain: A modal header with title and close button, a radio group of report categories, an optional textarea for additional detail, and a footer with Cancel and Submit buttons.
- Anti-patterns:
  - Do not expose moderation actions (remove, ban) within ReportContentModal — it is user-facing only.
  - Do not require additional details — category selection is the minimum requirement.
  - Do not nest another modal inside ReportContentModal.

---

## 8. Performance Constraints

- Memoization rules: The category list is static content; it does not need memoization. The modal renders in a portal and does not affect the host page's render performance.
- Virtualization: Not applicable — the category list is always small.
- Render boundaries: The modal is rendered in a portal, isolated from the host page's render tree.

---

## 9. Test Requirements

- What must be tested:
  - Modal renders on open with all category options.
  - Selecting a category enables the Submit button.
  - Submit button is disabled when no category is selected.
  - Submitting fires the callback with the selected category and optional details.
  - Success state renders after successful submission.
  - Error state renders on submission failure.
  - Close button and Escape close the modal.
- Interaction cases:
  - Tab cycles through all interactive elements.
  - Arrow Up/Down navigate between categories.
  - Enter/Space selects the focused category.
  - Escape closes the modal and returns focus to the trigger.
  - Focus is trapped within the modal while open.
- Accessibility checks:
  - `role="dialog"`, `aria-modal`, `aria-labelledby` are present.
  - Category group has `role="radiogroup"`.
  - Each category has `role="radio"` and `aria-checked`.
  - Submit has `aria-disabled` when no category is selected.
  - Success uses `aria-live` or `role="status"`.
  - Error uses `role="alert"`.
  - Focus moves to dialog on open; returns to trigger on close.
  - Focus is trapped while modal is open.
  - Contrast ratios pass in both themes.
  - Reduced motion suppresses open/close animation.
