# Component Spec — SkeletonLoader

## 1. Purpose

Renders a low-fidelity placeholder that mimics the shape and layout of the content being loaded, communicating that real content is incoming and preserving the perceived layout structure during the loading period.

Use when: content is loading asynchronously and the approximate shape/structure of the expected content is known.

Do NOT use when: the loading duration is expected to be very short (under ~300ms — avoid skeleton flicker), when the content shape is unknown (use Spinner instead), or when the entire page is loading (use LoadingOverlay or a page-level Spinner).

---

## 2. UX Intent

- Primary interaction goal: reduce perceived wait time and layout shift by occupying the content area with a familiar structural placeholder.
- Expected user mental model: a "ghosted" version of the incoming content — similar to skeleton screens in social media feeds and content lists.
- UX laws applied:
  - Doherty Threshold: the skeleton renders immediately, giving instant visual feedback that content is loading.
  - Gestalt (Similarity, Proximity): skeleton shapes mirror the layout of the actual content, creating a coherent preview.
  - Pre-attentive processing: the shimmer animation draws the eye and communicates activity without requiring the user to read text.

---

## 3. Visual Behavior

- Layout: the skeleton occupies the same dimensions as the content it replaces. Individual skeleton elements (line, circle, rectangle, card) can be composed to match the target content shape.
- Shapes: line (text row), circle (avatar), rectangle (image/media), card (content card placeholder).
- Animation: a shimmer or pulse animation travels across skeleton elements to indicate loading activity.
- Token usage: skeleton background and shimmer gradient colors sourced from muted/surface theme tokens.
- Responsive behavior: skeleton elements scale with the container, matching the responsive behavior of the target content.

---

## 4. Interaction Behavior

- The SkeletonLoader is entirely non-interactive.
- It does not respond to hover, focus, or keyboard events.
- Screen reader behavior: the skeleton container uses `aria-busy="true"` on its parent region, and skeleton shapes are hidden from screen readers (`aria-hidden="true"`) to prevent noise. A single accessible live region communicates the loading state.
- Motion rules:
  - Shimmer/pulse animation respects reduced-motion preferences.
  - When reduced motion is preferred, the animation is replaced with a static skeleton shape (no shimmer).

---

## 5. Accessibility Requirements

- ARIA: skeleton shapes are `aria-hidden="true"`. The parent region has `aria-busy="true"` and `aria-label` describing what is loading. A live region announces when loading is complete.
- Focus: skeleton elements are not focusable.
- Contrast: skeleton background and shimmer must be visible against the page background; they do not need to meet text contrast ratios but must be perceptible.
- Reduced motion: shimmer/pulse animation is suppressed when reduced motion is preferred; a static appearance is used instead.

---

## 6. Theming Rules

- Required tokens: skeleton base background color, shimmer highlight color, border radius (if shaped elements use rounding).
- Prohibited hardcoded values: no hardcoded hex colors, pixel sizes, or animation durations.
- Dark mode: skeleton base and shimmer tokens must resolve to perceptible values in dark mode (avoid blending into dark backgrounds).

---

## 7. Composition Rules

- What can wrap it: list containers, card bodies, table rows (as a loading row), page content areas.
- What it may contain: individual skeleton shape primitives (line, circle, rectangle) composed to match the target content layout.
- Anti-patterns:
  - Do not show SkeletonLoader for very short loading durations (risk of layout flicker).
  - Do not use SkeletonLoader when the content shape is completely unknown (use Spinner).
  - Do not make skeleton shapes interactive.

---

## 8. Performance Constraints

- Memoization: skeleton elements are static display components; they need not re-render during loading.
- Virtualization: if a skeleton list is used for a long list, virtualize the skeleton rows the same way as the real rows.
- Render boundaries: no internal data subscriptions; visibility is controlled purely by the parent.

---

## 9. Test Requirements

- Render: skeleton elements render with the correct shape and layout.
- Animation: shimmer/pulse animation is present in normal conditions.
- Accessibility: skeleton shapes are `aria-hidden`; parent region has `aria-busy="true"` and an accessible label.
- Theming: skeleton base and shimmer tokens apply; no hardcoded colors; dark mode tokens resolve correctly.
- Reduced motion: shimmer/pulse animation is replaced with a static appearance when reduced motion preference is active.
