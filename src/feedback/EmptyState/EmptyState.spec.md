# Component Spec — EmptyState

## 1. Purpose

Communicates to the user that a content area has no data to display, offering context for why it is empty and, where appropriate, a path to populate it. It replaces a blank region with a meaningful, helpful message.

Use when: a list, table, feed, or content area has zero items to show — whether because no data exists yet, a search/filter returned no results, or content was deleted.

Do NOT use when: the absence of content is due to an error (use ErrorBoundary or an error Alert), or when the page itself cannot be found (use NotFoundState).

---

## 2. UX Intent

- Primary interaction goal: prevent confusion and frustration by explaining the empty state and guiding the user toward a next action.
- Expected user mental model: a friendly placeholder screen — similar to inbox-zero or a new-account onboarding prompt.
- UX laws applied:
  - Doherty Threshold: the empty state renders immediately in place of the absent content, eliminating ambiguity about whether data is loading.
  - Gestalt (Figure/Ground): illustration, heading, and action are visually grouped and centered in the empty region.
  - Fitts's Law: the primary call-to-action button is generously sized and centrally placed for easy activation.

---

## 3. Visual Behavior

- Layout: centered vertically and horizontally within its containing region. Stacked arrangement: optional illustration, heading, body text, optional action.
- Illustration slot: accepts an icon or illustration; sized proportionally to the container.
- Typography: heading uses a heading scale token; body/description uses a body scale token; action button label uses a label scale token.
- Spacing: vertical gap between illustration, heading, body, and action driven by space tokens.
- Token usage: illustration color, heading text, body text, and action button colors sourced from theme tokens.
- Responsive behavior: scales gracefully within narrow containers; illustration may be smaller or omitted on very small screens.

---

## 4. Interaction Behavior

- States:
  - Default empty: heading and body text are visible; action (if provided) is interactive.
  - Hover/Focus on action: action button receives hover and focus states via tokens.
- The EmptyState itself is non-interactive; only the optional action slot is interactive.
- Keyboard behavior: Tab moves focus to the action button (if present); Enter or Space activates it.
- Screen reader behavior: the heading is announced as a heading; body text is read; action button is announced with its label.
- Motion rules: any entrance animation (fade-in) respects reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: no special ARIA role required beyond semantic heading and paragraph structure. If rendered inside a list or table, an appropriate ARIA live region or descriptive text communicates the empty state.
- Focus: if an action is present, it is keyboard-reachable and has a visible focus ring.
- Contrast: all text meets WCAG AA contrast ratios. Illustration colors meet contrast requirements against the container background.
- Reduced motion: entrance animations are suppressed when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: heading text, body text, illustration/icon color, action button colors, container background (if the EmptyState provides its own background).
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve correctly in dark mode; illustration colors must remain legible.

---

## 7. Composition Rules

- What can wrap it: list containers, table bodies, card bodies, page content areas, search result regions.
- What it may contain: an illustration/icon slot, a heading slot, a body/description slot, an action slot (optional).
- Anti-patterns:
  - Do not use EmptyState to communicate errors (use ErrorBoundary or Alert).
  - Do not use EmptyState while content is still loading (use SkeletonLoader or Spinner instead).
  - Do not nest EmptyState inside itself.

---

## 8. Performance Constraints

- Memoization: the component should be memoized; it re-renders only when its content props change.
- Virtualization: not applicable.
- Render boundaries: leaf-level display component with no internal data subscriptions.

---

## 9. Test Requirements

- Render: heading, body text, illustration slot, and action slot render correctly when provided.
- Action: action button is interactive and calls its callback on activation.
- Keyboard: Tab reaches the action button; Enter/Space activates it.
- Accessibility: heading has correct heading level; action button has an accessible label; all text meets contrast requirements.
- Theming: token-based colors apply; no hardcoded values; dark mode tokens resolve correctly.
- Reduced motion: entrance animations are suppressed when reduced motion preference is active.
