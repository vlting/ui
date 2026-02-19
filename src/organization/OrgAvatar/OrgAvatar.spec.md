# Component Spec — OrgAvatar

## 1. Purpose

Displays a visual identifier for an organization — either a logo image or a generated fallback (initials or a placeholder icon) — in a consistently shaped container.

Use it wherever an organization must be identified visually: navigation headers, org switchers, member lists, and settings pages.

Do NOT use it for individual user avatars (use the Avatar primitive), for decorative illustrations, or as a standalone brand element larger than avatar scale.

---

## 2. UX Intent

- Primary interaction goal: recognition — the user identifies an organization by its logo or abbreviated name at a glance.
- Expected user mental model: a profile picture or company logo thumbnail, consistent with avatar patterns found in SaaS products.
- UX laws applied:
  - Jakob's Law: round or slightly rounded square shapes are the established convention for org/team avatars in products like Slack, GitHub, and Linear.
  - Gestalt Law of Similarity: OrgAvatar must be visually consistent with the Avatar primitive so users understand both as the same type of element.
  - Fitts's Law: when OrgAvatar is used inside a clickable container (e.g., OrgSwitcher), the tap/click target of the parent must be adequately sized — the avatar itself need not be the exclusive hit area.

---

## 3. Visual Behavior

- Layout: a fixed square or circle (configurable via a `shape` variant: `square` | `circle`). The container clips its contents to the defined shape.
- Size: driven by a size prop mapped to size tokens (e.g., `$sm`, `$md`, `$lg`). No hardcoded pixel dimensions.
- Spacing: no internal padding. External spacing is the responsibility of the parent.
- Typography: fallback initials use a bold label or heading scale appropriate to the avatar size. One to two characters maximum.
- Token usage:
  - Fallback background: a semantic brand or neutral color token, consistent across org instances unless a specific color is provided.
  - Fallback text: a contrasting foreground token.
  - Border: an optional border using border color and width tokens.
  - Border radius: radius tokens for the `square` shape variant.
- Responsive behavior: size prop drives all sizing; no autonomous responsive changes. The parent controls which size to use at each breakpoint.

---

## 4. Interaction Behavior

- States:
  - Image loaded: displays the org logo image, clipped to the container shape.
  - Image loading: optionally shows a skeleton/placeholder background while the image loads.
  - Image error / no image: displays the initials or a generic org icon fallback.
  - Disabled: not applicable (display-only). If the parent makes it interactive, the parent handles disabled states.
- Controlled vs uncontrolled: display-only. Accepts `src`, `name` (for initials generation), and `size` as props.
- Keyboard behavior: not focusable by itself. If wrapped in a button or link, the parent handles focus.
- Screen reader behavior: the image (if present) must have an `alt` attribute equal to the org name. If the fallback initials are shown, the container must have an `aria-label` equal to the org name.
- Motion rules: image load transition (opacity fade-in) uses a subtle animation from motion tokens. Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: always provide a text alternative equal to the organization name — via `alt` on the image, or `aria-label` on the container when showing initials/icon.
- Focus rules: not focusable. Does not participate in tab order.
- Contrast expectations: initials text must meet WCAG AA contrast against the fallback background token.
- Reduced motion behavior: the image fade-in animation is disabled under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: fallback background color, fallback text color, border color (optional), border radius (for square variant), size tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based width/height values, no hardcoded font sizes for initials.
- Dark mode expectations: fallback background and text tokens must have appropriate dark-mode variants. Image display is unaffected by theme, but the fallback state must remain legible.

---

## 7. Composition Rules

- What can wrap it: OrgSwitcher, navigation headers, settings cards, list items, team member rows. Wrapping in a pressable/button element is the responsibility of the parent.
- What it may contain: an image element or a text element (initials). No other children.
- Anti-patterns:
  - Do not place interactive elements inside OrgAvatar.
  - Do not use OrgAvatar as a large hero/banner image — it is an avatar-scale element only.
  - Do not pass arbitrary children; content is determined by `src` and `name` props.

---

## 8. Performance Constraints

- Memoization rules: memoize when rendered in lists (e.g., OrgSwitcher dropdown, TeamMemberTable).
- Virtualization: not applicable.
- Render boundaries: image loading is a side effect of the `src` prop. The component must not trigger any data fetching beyond the image load itself.

---

## 9. Test Requirements

- What must be tested:
  - Renders an image when `src` is provided.
  - Renders initials fallback when `src` is absent or fails to load.
  - Initials are correctly derived from the `name` prop (e.g., first letters of each word, capped at two characters).
  - Size variants apply the correct dimension tokens.
  - Shape variants (`square`, `circle`) apply the correct border-radius.
- Interaction cases: none (non-interactive).
- Accessibility checks:
  - Image renders with a non-empty `alt` attribute matching the org name.
  - Initials fallback container has an `aria-label` matching the org name.
  - Initials text meets contrast requirements against the fallback background token.
