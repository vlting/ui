# Component Spec — QuickAddPanel

## 1. Purpose

Provides a lightweight, focused input surface for rapidly creating a new item — such as a task, note, or reminder — with minimal friction. The panel is optimized for speed of entry, not comprehensive editing.

Use when: the user needs to capture an idea, task, or reminder immediately without navigating to a dedicated creation screen. Typically surfaces as a floating panel, modal, or inline widget.

Do NOT use when: the item requires extensive detail at creation time (use a full form or detail panel), or when the creation workflow involves multiple steps.

---

## 2. UX Intent

- Primary interaction goal: Minimize the number of steps between intent and capture. The user should be able to open the panel, type, and confirm in under 5 seconds.
- Expected user mental model: Users expect a quick-add surface to behave like a command palette or a "new item" prompt — fast, dismissible, and forgiving (Jakob's Law from apps like Things, Todoist, Notion).
- UX laws applied:
  - Hick's Law: Limit the number of fields and options visible at creation time. Fewer choices = faster capture.
  - Fitts's Law: The primary input field is large and immediately focused on open. The submit action is a large, easily reachable button or keyboard shortcut.
  - Tesler's Law: Required complexity (type tagging, due dates) should be optional and progressive — not mandatory at quick-add time.
  - Doherty Threshold: The panel must open and be input-ready within 400ms.

---

## 3. Visual Behavior

- Layout rules:
  - A compact container with a prominent text input at the top.
  - Optional secondary controls (type selector, date picker trigger, priority selector) appear below the input, either always visible or revealed via an "expand" affordance.
  - A confirm/submit button and a cancel/dismiss button are always visible.
  - The panel has a clear visual boundary (elevated surface, border, or shadow) to distinguish it from the background content.
- Spacing expectations: Tight internal padding using small-to-medium space tokens. The input area is generously padded internally for touch usability.
- Typography rules: The input placeholder and typed text use a body token. Optional secondary field labels use a caption token.
- Token usage: All colors, shadows, spacing, and radii must use design tokens. No hardcoded values.
- Responsive behavior: On mobile, the panel anchors to the bottom of the screen above the keyboard. On desktop, it may appear as a centered modal or an inline widget. Width is constrained to a readable maximum.

---

## 4. Interaction Behavior

- States:
  - Idle/Empty: Panel is open with an empty input and a visible placeholder.
  - Typing: Input contains text; submit becomes enabled.
  - Submitting: Brief loading state while the item is processed (spinner or disabled button).
  - Success: Panel closes or resets; optional success feedback.
  - Error: Inline error message appears; panel remains open for correction.
  - Dismissed: Panel closes without creating an item.
- Controlled vs uncontrolled: The panel's open/closed state is controlled by the parent. The input value may be controlled or uncontrolled.
- Keyboard behavior:
  - The primary text input receives focus automatically on open.
  - Enter submits the form (when the input is not empty).
  - Escape dismisses the panel.
  - Tab cycles through available secondary controls and the action buttons.
  - Shift+Tab reverses Tab focus direction.
- Screen reader behavior:
  - The panel is announced when it opens (e.g., "Quick add panel, expanded").
  - The input has an accessible label.
  - Error messages are announced via a live region.
  - Submit and cancel buttons have descriptive accessible labels.
- Motion rules: The panel opens with a brief fade or slide-up animation (under 200ms). It closes with a corresponding fade or slide-down. All motion is suppressed under reduced motion preference.

---

## 5. Accessibility Requirements

- ARIA requirements:
  - The panel container uses `role="dialog"` with `aria-modal="true"` and `aria-label` ("Quick add") if it is modal.
  - If inline, it uses `role="form"` with an accessible label.
  - The primary input has `aria-label` or `aria-labelledby`.
  - Error messages use `role="alert"` or `aria-live="assertive"`.
  - The submit button is `aria-disabled` when the input is empty.
- Focus rules: On open, focus moves immediately to the primary text input. On close, focus returns to the triggering element.
- Contrast expectations: Input text and placeholder must meet contrast requirements (4.5:1 and 3:1 respectively). Button labels must meet 4.5:1.
- Reduced motion behavior: Open/close animations are disabled. The panel appears and disappears instantly.

---

## 6. Theming Rules

- Required tokens: panel background, panel border/shadow, input background, input border (idle and focused), text primary, text placeholder, text error, button primary background, focus ring, radius, space.
- Prohibited hardcoded values: No hardcoded colors, spacing, or font sizes.
- Dark mode expectations: Panel surface and input backgrounds shift to dark tokens. Error and success states remain distinguishable in dark mode.

---

## 7. Composition Rules

- What can wrap it: A trigger button (FAB, toolbar button, or keyboard shortcut handler) that controls the panel's visibility. The panel may be embedded in a PersonalDashboard or appear globally.
- What it may contain: A primary text input, optional secondary controls (type tag, date, priority), a submit button, and a dismiss button.
- Anti-patterns:
  - Do not include complex multi-step forms inside QuickAddPanel — it must remain a single-screen, fast-capture surface.
  - Do not prevent panel dismissal; always provide an accessible escape route.
  - Do not use QuickAddPanel as a full edit form for existing items.

---

## 8. Performance Constraints

- Memoization rules: The panel's internal form state must not cause re-renders in the surrounding page content.
- Virtualization: Not applicable.
- Render boundaries: The panel is rendered in a portal or an isolated boundary so that its open/close state change does not re-render the host page.

---

## 9. Test Requirements

- What must be tested:
  - The primary input receives focus automatically on panel open.
  - The submit button is disabled when the input is empty.
  - Typing text enables the submit button.
  - Pressing Enter with non-empty input triggers the submit callback.
  - Pressing Escape closes the panel without creating an item.
  - Error message renders when submission fails.
- Interaction cases:
  - Tab cycles through all controls in the correct order.
  - Enter submits; Escape dismisses.
  - Focus returns to the trigger element on close.
- Accessibility checks:
  - `role="dialog"` and `aria-modal="true"` are present (if modal).
  - Input has an accessible label.
  - Error uses `role="alert"`.
  - Submit button has `aria-disabled` when input is empty.
  - Focus moves to input on open and returns to trigger on close.
  - Contrast ratios pass in both themes.
  - Reduced motion suppresses open/close animations.
