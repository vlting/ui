# Component Spec — BoostBadge

## 1. Purpose

Displays a compact visual indicator that communicates an active or available "boost" status on a user profile within a dating context. A boost is a time-limited feature that increases a profile's visibility to other users.

Use when: a profile card or profile screen needs to signal that a boost is active, available to activate, or recently expired.

Do NOT use for: general promotional badges, subscription tier indicators unrelated to the boost feature, or any inline text label.

---

## 2. UX Intent

- Primary interaction goal: immediately communicate boost status at a glance without requiring the user to read text.
- Expected user mental model: users familiar with dating apps recognize a "boost" badge as a fire or lightning icon with a brief label — consistent with conventions established by popular platforms (Jakob's Law).
- UX laws applied:
  - Pre-attentive processing (Gestalt): color and icon shape communicate status before the user consciously reads the badge.
  - Miller's Law: the badge encodes a single piece of information — boost on/off/expiring — keeping cognitive load minimal.
  - Doherty Threshold: the badge renders synchronously as part of the card; no deferred or async paint is acceptable.

---

## 3. Visual Behavior

- Layout: compact inline or absolutely-positioned badge, typically overlaid on a profile photo or adjacent to the profile name.
- Contains an icon and an optional short text label (e.g., "Boosted", "Boost", or a countdown string).
- Typography: label uses a small-scale type token; no font size is hardcoded.
- Color: uses a semantic accent/highlight token for the active boost state; a muted token for inactive or expired state.
- Shape: uses a radius token to produce a pill or rounded-rectangle silhouette.
- Token usage: background, text, border, and icon color are all sourced from theme tokens.
- Responsive: size scales with the surrounding context via size tokens; does not reflow on its own.

---

## 4. Interaction Behavior

- States: active (boost running), inactive (no boost), expiring-soon (visual urgency cue), expired (muted appearance).
- The badge itself is non-interactive by default. When used within a pressable context, it inherits press/hover states from the parent.
- No controlled/uncontrolled distinction — the badge is purely display-driven by props.
- Keyboard behavior: not independently focusable unless given an explicit interactive role by a parent.
- Screen reader behavior: renders meaningful text or an `aria-label` describing the boost state; does not read decorative icon separately.
- Motion: a subtle pulse or glow animation may indicate an active boost. Respects `prefers-reduced-motion` by disabling animation.

---

## 5. Accessibility Requirements

- If the badge conveys state information, it must be readable by screen readers via a visible label or `aria-label`.
- The decorative icon must have `aria-hidden="true"` to prevent redundant announcement.
- Color must not be the sole differentiator of state — an icon or text label must also change.
- Contrast: badge text and icon must meet 4.5:1 against the badge background.
- Reduced motion: remove pulse/glow animation entirely; display static badge.

---

## 6. Theming Rules

- Required tokens: `color.accent` (or equivalent boost highlight), `background`, `color` for label text, `borderRadius` from radius token scale.
- Prohibited hardcoded values: no raw hex color codes, no hardcoded pixel sizes, no inline `fontWeight` integers outside the type token scale.
- Dark mode: badge background and text must resolve correctly via theme tokens in both light and dark contexts.

---

## 7. Composition Rules

- What can wrap it: a profile card, a profile header, an avatar overlay container, or a list item.
- What it may contain: an icon element and an optional text label.
- Anti-patterns:
  - Do not use BoostBadge as a general-purpose tag or pill component.
  - Do not place interactive controls (buttons, links) inside the badge.
  - Do not render multiple BoostBadge instances on the same surface for the same profile.

---

## 8. Performance Constraints

- Must render synchronously — no lazy loading or suspense boundary inside the badge itself.
- No virtualization required.
- Memoize the component if rendered inside a high-frequency update list.
- Avoid triggering layout recalculation from animation; use opacity/transform only.

---

## 9. Test Requirements

- Renders correctly in each state: active, inactive, expiring-soon, expired.
- Displays label text corresponding to the current state.
- Decorative icon has `aria-hidden="true"`.
- Badge label or container has a readable accessible name for screen readers.
- Color and icon both change between active and inactive states (not color alone).
- No animation plays when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
- Snapshot test for each state variant.
