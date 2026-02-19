# Component Spec — NotFoundState

## 1. Purpose

Communicates to the user that the content or resource they are trying to access does not exist or could not be found. It replaces the expected content area with a meaningful message and guidance for recovery.

Use when: a route, resource, or item lookup results in a 404 or "not found" condition.

Do NOT use when: the content exists but is empty (use EmptyState), the content exists but failed to load due to an error (use ErrorBoundary or an error Alert), or the user lacks permission to view the content (use an unauthorized/access-denied state).

---

## 2. UX Intent

- Primary interaction goal: prevent the user from feeling lost by acknowledging the missing content and providing a clear path back to a known good state.
- Expected user mental model: a "page not found" screen — universally recognized, with a headline, a brief explanation, and a way back.
- UX laws applied:
  - Doherty Threshold: the NotFoundState renders immediately in place of the missing content.
  - Fitts's Law: the primary recovery action (e.g., "Go back" or "Go to home") is large and centered for easy activation.
  - Jakob's Law: follows the familiar 404 page pattern that users recognize from countless web experiences.

---

## 3. Visual Behavior

- Layout: centered vertically and horizontally within its containing region (full page or section). Stacked arrangement: optional illustration/icon, heading, body text, optional action.
- Typography: heading uses a heading scale token; body/description uses a body scale token; action button label uses a label scale token.
- Illustration slot: accepts an icon, illustration, or numeric indicator (e.g., "404"); sized proportionally.
- Spacing: vertical gap between illustration, heading, body, and action driven by space tokens.
- Token usage: illustration color, heading text, body text, and action button colors sourced from theme tokens.
- Responsive behavior: scales gracefully within narrow containers; illustration may be smaller or omitted on very small screens.

---

## 4. Interaction Behavior

- States:
  - Default: heading, body text, and optional action are visible.
  - Hover/Focus on action: action button receives hover and focus states via tokens.
- The NotFoundState itself is non-interactive; only the optional action slot is interactive.
- Keyboard behavior: Tab moves focus to the action button (if present); Enter or Space activates it.
- Screen reader behavior: heading is announced at the appropriate heading level; body text is read; action button is announced with its label.
- Motion rules: any entrance animation respects reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: no special ARIA role required beyond semantic heading and paragraph structure. If rendered as a full-page replacement, the page title should be updated to reflect the not-found condition.
- Focus: if an action is present, it is keyboard-reachable and has a visible focus ring.
- Contrast: all text meets WCAG AA contrast ratios. Illustration colors meet contrast requirements against the background.
- Reduced motion: entrance animations are suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: heading text, body text, illustration/icon color, action button colors, background (if the component provides its own background surface).
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve correctly in dark mode.

---

## 7. Composition Rules

- What can wrap it: page layout containers, route-level views, section content areas.
- What it may contain: an illustration/icon slot, a heading slot, a body/description slot, an action slot (optional).
- Anti-patterns:
  - Do not use NotFoundState for empty data conditions (use EmptyState).
  - Do not use NotFoundState for runtime errors (use ErrorBoundary).
  - Do not nest NotFoundState inside itself.

---

## 8. Performance Constraints

- Memoization: the component is a leaf display element; it should not re-render unless its props change.
- Virtualization: not applicable.
- Render boundaries: no internal data subscriptions.

---

## 9. Test Requirements

- Render: heading, body text, illustration slot, and action slot render correctly when provided.
- Action: action button is interactive and calls its callback on activation.
- Keyboard: Tab reaches the action button; Enter/Space activates it.
- Accessibility: heading has the correct heading level; action button has an accessible label; all text meets contrast requirements.
- Theming: token-based colors apply; no hardcoded values; dark mode tokens resolve correctly.
- Reduced motion: entrance animations are suppressed when reduced motion preference is active.
