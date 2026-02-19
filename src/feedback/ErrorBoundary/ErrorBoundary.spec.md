# Component Spec — ErrorBoundary

## 1. Purpose

Catches rendering errors within a subtree and displays a fallback UI in place of the broken component tree, preventing the entire application from becoming unusable. It isolates failure to the affected region.

Use when: wrapping sections of the UI that may fail due to unexpected runtime errors, particularly data-driven views, third-party content, or complex interactive components.

Do NOT use when: the error is a known, expected application state (use Alert or EmptyState), or when the entire page is in error (use a top-level error page instead).

---

## 2. UX Intent

- Primary interaction goal: maintain application usability by containing errors and communicating the failure clearly without crashing the whole page.
- Expected user mental model: a safety net — when something goes wrong in one area, the rest of the app remains functional and the user sees a clear, friendly error message with a recovery option.
- UX laws applied:
  - Tesler's Law: the boundary manages inherent complexity of runtime failures so users don't experience raw crashes.
  - Doherty Threshold: the fallback UI renders immediately when an error is caught, giving instant feedback.
  - Fitts's Law: any recovery action (e.g., "Try again" button) is large and easily activatable.

---

## 3. Visual Behavior

- Layout: occupies the same space as the failed subtree. Centered or aligned content within the boundary region.
- Contains: an error icon, a concise error heading, an optional descriptive message, and an optional recovery action.
- Typography: heading uses a heading or label scale token; description uses a body scale token; action uses a label scale token.
- Icon: uses the error/danger semantic icon.
- Spacing: internal padding and gaps driven by space tokens.
- Token usage: icon color, heading text, body text, and action button colors sourced from danger/error semantic tokens and theme tokens.
- Responsive behavior: adapts gracefully to the size of the containing region; works in both small card contexts and full-page contexts.

---

## 4. Interaction Behavior

- States:
  - Error (fallback active): fallback UI is displayed in place of the failed subtree.
  - Recovery attempt: when the user activates a retry action, the boundary attempts to re-render the failed subtree.
  - Hover/Focus on action: action button receives hover and focus states.
- The ErrorBoundary is not interactive itself; only the recovery action slot is interactive.
- Keyboard behavior: Tab moves focus to the recovery action button (if present); Enter or Space activates it.
- Screen reader behavior: the error heading is announced; recovery action button is announced with its label.
- Motion rules: no entrance animation by default; if added, it respects reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: `role="alert"` on the fallback container so the error is announced immediately when the fallback mounts. Recovery action button has an accessible label.
- Focus: when the fallback renders, focus management should move focus to the fallback region or its heading to notify the user.
- Contrast: all text and icons meet WCAG AA contrast ratios against the fallback background.
- Reduced motion: any transition to the fallback state is suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: error/danger icon color, heading text, body text, action button colors, fallback background (if distinct from page background), focus ring color.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode.

---

## 7. Composition Rules

- What can wrap it: any section of the component tree that may produce rendering errors — list views, data tables, charts, complex interactive components.
- What it may contain: an error icon slot, a heading slot, a description slot, a recovery action slot.
- Anti-patterns:
  - Do not nest ErrorBoundary within another ErrorBoundary unless intentionally creating nested isolation zones.
  - Do not use ErrorBoundary as a general loading state (use Spinner or SkeletonLoader).
  - Do not use ErrorBoundary for expected, known error conditions (use Alert or EmptyState).

---

## 8. Performance Constraints

- Memoization: the fallback UI is a leaf display component and should be lightweight.
- Virtualization: not applicable.
- Render boundaries: the ErrorBoundary is itself a render boundary; failed subtree is unmounted and replaced with the fallback.

---

## 9. Test Requirements

- Render: when a child component throws, the fallback UI renders with the error heading and icon.
- Recovery: the recovery action calls the retry callback; the boundary attempts to re-render the subtree.
- Accessibility: `role="alert"` is present on the fallback; recovery button has an accessible label; text meets contrast requirements.
- Keyboard: recovery action is reachable via Tab and activatable via Enter/Space.
- Theming: error semantic tokens apply; no hardcoded colors; dark mode tokens resolve correctly.
- Reduced motion: any transition to fallback state is suppressed when reduced motion preference is active.
