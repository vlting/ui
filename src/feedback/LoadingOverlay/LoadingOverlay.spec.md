# Component Spec — LoadingOverlay

## 1. Purpose

Covers a content region or the full viewport with a semi-transparent overlay and a loading indicator, communicating that the region is temporarily unavailable while an operation is in progress.

Use when: an asynchronous operation affects an entire section or page and the content beneath should not be interacted with until completion.

Do NOT use when: only a small, isolated element is loading (use Spinner inline), or when the content can still be used while loading in the background (use a non-blocking Spinner or ProgressBar instead).

---

## 2. UX Intent

- Primary interaction goal: prevent user interaction with content that is not yet ready, and clearly signal that the system is working.
- Expected user mental model: a "please wait" blocker — familiar from form submission screens, data refresh operations, and page transitions.
- UX laws applied:
  - Doherty Threshold: the overlay appears promptly when the loading state begins, preventing the user from acting on stale or incomplete data.
  - Tesler's Law: the overlay manages the complexity of preventing invalid interactions during async operations.
  - Gestalt (Figure/Ground): the overlay surface creates a clear visual separation between the "loading" plane and the content beneath.

---

## 3. Visual Behavior

- Layout: absolutely or fixed positioned over its containing region or the viewport. Fills the full bounds of the target region.
- Contains: a semi-transparent backdrop and a centered loading indicator (Spinner or equivalent).
- Backdrop: uses an overlay/scrim color token with an opacity value from the design token set.
- Spinner: centered within the overlay, sized using size tokens.
- Typography: an optional loading message below the spinner uses a body or caption scale token.
- Token usage: backdrop color, spinner color, and message text color all sourced from theme tokens.
- Responsive behavior: always fills its container regardless of viewport size.

---

## 4. Interaction Behavior

- States:
  - Active: overlay is visible; all underlying content is non-interactive (pointer events blocked).
  - Inactive: overlay is hidden; underlying content is interactive.
- The overlay is entirely non-interactive; no clickable elements within it (except optionally a cancel action).
- Keyboard behavior: while the overlay is active, keyboard focus is trapped within the overlay region (or the overlay prevents focus from reaching underlying elements).
- Screen reader behavior:
  - The loading state is communicated via `aria-busy="true"` on the affected region or via a live region announcing the loading status.
  - An accessible label (e.g., "Loading, please wait") is present on the loading indicator.
- Motion rules:
  - The spinner animation respects reduced-motion preferences; when reduced motion is preferred, a static indicator (e.g., a static icon or text) replaces the spinning animation.
  - Overlay entrance/exit animations respect reduced-motion preferences.

---

## 5. Accessibility Requirements

- ARIA: `aria-busy="true"` on the region being loaded. The overlay or spinner has `aria-label` or `aria-labelledby` describing the loading state. `aria-live="polite"` on the status message.
- Focus: focus is either trapped within the overlay (if it has interactive content) or prevented from reaching the underlying blocked content.
- Contrast: spinner and message text meet WCAG AA contrast ratios against the backdrop token.
- Reduced motion: spinner animation is replaced with a static indicator when reduced motion is preferred.

---

## 6. Theming Rules

- Required tokens: overlay/scrim background color (with opacity), spinner color, message text color, focus ring color (if overlay contains any interactive element).
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, opacity values, or font sizes.
- Dark mode: overlay and spinner tokens must resolve to accessible values in dark mode; the overlay must provide sufficient contrast against dark backgrounds.

---

## 7. Composition Rules

- What can wrap it: page layout containers, card bodies, form sections, modal bodies.
- What it may contain: a backdrop slot, a spinner/loading indicator slot, an optional message text slot, an optional cancel action slot.
- Anti-patterns:
  - Do not stack multiple LoadingOverlays over the same region.
  - Do not use LoadingOverlay for partial or inline loading states (use Spinner or SkeletonLoader).
  - Do not use LoadingOverlay without pairing it with `aria-busy` on the affected region.

---

## 8. Performance Constraints

- Memoization: the overlay should not re-render unless its loading state or message changes.
- Virtualization: not applicable.
- Render boundaries: the overlay is a leaf display component; avoid internal data subscriptions.

---

## 9. Test Requirements

- Render: overlay renders with backdrop and spinner when active; is not rendered (or hidden) when inactive.
- Interaction blocking: underlying content is not interactive while the overlay is active.
- Accessibility: `aria-busy` is set on the affected region; spinner has an accessible label; live region announces loading state.
- Focus: keyboard focus does not reach underlying elements while overlay is active.
- Theming: overlay and spinner tokens apply; no hardcoded values; dark mode tokens resolve correctly.
- Reduced motion: spinner animation is replaced with a static indicator when reduced motion preference is active.
