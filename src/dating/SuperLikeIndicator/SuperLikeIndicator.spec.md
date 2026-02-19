# Component Spec — SuperLikeIndicator

## 1. Purpose

Displays a visual indicator that communicates a "super like" action has been sent or received in a dating context. A super like is a heightened expression of interest that stands above a standard like, and the indicator must make this distinction immediately clear.

Use when: a super like has been applied to or received by a profile — surfaced on swipe cards, profile previews, or match notifications.

Do NOT use for: standard like indicators, general rating UI, or any non-dating-specific endorsement pattern.

---

## 2. UX Intent

- Primary interaction goal: provide immediate, unmistakable visual confirmation that a super like action is in play.
- Expected user mental model: a star or special icon with a distinct accent color — users of dating apps instantly recognize the super like symbol as a premium expression of interest (Jakob's Law).
- UX laws applied:
  - Pre-attentive processing (Gestalt): the super like icon and color must stand out from surrounding UI without competing elements.
  - Doherty Threshold: the indicator appears immediately when triggered — no delay.
  - Affordance: the visual treatment must be distinct enough from a standard like to prevent confusion.

---

## 3. Visual Behavior

- Layout: a compact overlay or inline badge containing an icon (typically a star) and an optional short label (e.g., "Super Like").
- Positioned as an overlay on a swipe card or as an inline badge adjacent to a profile name.
- Uses a distinct accent color (e.g., blue or a brand-defined super-like token) that differs from the standard like color.
- Icon size scales with context — larger when used as an overlay, smaller when inline.
- Typography: optional label uses a small body or label token; no font size is hardcoded.
- Token usage: icon color, background, and label text all sourced from theme tokens (including a semantic super-like token if defined).
- May include a subtle glow or outline to visually elevate it from the card surface.

---

## 4. Interaction Behavior

- States: visible/active (super like is in effect), hidden (no super like).
- The indicator is display-only — it is not an interactive control.
- No hover, focus, or press states on the indicator itself.
- If used within a pressable card, the indicator does not capture pointer events.
- Screen reader behavior: the indicator provides a visually-hidden or `aria-label` text describing the super like status (e.g., "Super liked").
- Motion: the indicator may animate in with a scale or glow effect when it first appears. Respects `prefers-reduced-motion` by appearing immediately without animation.

---

## 5. Accessibility Requirements

- The indicator must not rely on color alone — the icon and optional label must both communicate the super like state.
- The icon has `aria-hidden="true"`; the container or a visually-hidden sibling provides the accessible text (e.g., "Super liked").
- When used as an overlay on a card, ensure it does not obscure the underlying card's accessible label.
- Contrast: icon and label must meet 4.5:1 against the background surface.
- Reduced motion: skip entrance animation; render immediately at full opacity/scale.

---

## 6. Theming Rules

- Required tokens: a semantic super-like accent token (distinct from standard like), `color` for label text, optional glow/shadow token.
- Prohibited hardcoded values: no raw hex colors, no pixel-based icon sizes outside the token scale.
- Dark mode: super-like color, glow, and text must all resolve correctly via theme tokens. The indicator must remain visually prominent in both light and dark themes.

---

## 7. Composition Rules

- What can wrap it: `SwipeCard`, `ProfilePreviewCard`, `MatchCard`, or a profile detail header.
- What it may contain: a single icon element and an optional text label.
- Anti-patterns:
  - Do not use SuperLikeIndicator for standard likes or any other action type.
  - Do not make the indicator interactive — it is purely display-driven.
  - Do not render SuperLikeIndicator permanently visible on cards that have not been super-liked.

---

## 8. Performance Constraints

- The indicator must render synchronously — no lazy loading.
- Entrance animation must not delay the parent card's render.
- Memoize the component since it is rendered inside potentially long lists.
- Use opacity/transform for animation to avoid layout recalculation.

---

## 9. Test Requirements

- Renders visibly when the super like state is active.
- Does not render (or is visually hidden) when the super like state is inactive.
- Icon has `aria-hidden="true"`.
- Container or sibling provides accessible text (e.g., "Super liked") readable by screen readers.
- Color and icon both change between active/inactive states.
- No entrance animation when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
- Snapshot test for active and inactive states.
