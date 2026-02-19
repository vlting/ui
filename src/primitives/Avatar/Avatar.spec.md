# Component Spec — Avatar

## 1. Purpose

Displays a visual identifier for a single person — a profile photo, generated initials, or a generic user icon — in a consistently sized and shaped container.

Use it wherever an individual user must be identified visually: comment threads, member lists, navigation headers, message senders, and profile cards.

Do NOT use it for organization or team identities (use OrgAvatar), for decorative illustrations, or for arbitrary imagery unrelated to a person.

---

## 2. UX Intent

- Primary interaction goal: recognition — the user identifies a person at a glance by their profile photo or initials.
- Expected user mental model: a profile picture thumbnail, consistent with avatar conventions across all digital products (social, SaaS, messaging).
- UX laws applied:
  - Jakob's Law: circular avatars are the dominant convention for person identifiers; deviating requires a strong reason.
  - Gestalt Law of Similarity: consistent shape, size variants, and fallback behavior across all Avatar instances reinforces that each one represents a person.
  - Fitts's Law: when Avatar is wrapped in a pressable element (e.g., linking to a profile), the parent manages the hit area — the avatar is never the sole affordance for a small touch target.

---

## 3. Visual Behavior

- Layout: fixed square or circle container (shape configurable via a variant prop). Content is clipped to the container shape. Square variant uses a border-radius from the radius token scale.
- Size: driven by a `size` prop mapped to design token sizes (e.g., `$xs`, `$sm`, `$md`, `$lg`, `$xl`). No hardcoded pixel dimensions.
- Spacing: no internal padding. External spacing is the responsibility of the parent layout.
- Typography: fallback initials use a bold caption or label scale proportional to the avatar size. Maximum two characters.
- Token usage:
  - Fallback background: a color derived from the user identifier (e.g., hashed from name/ID) selected from a palette of semantic or neutral color tokens. Or a single default neutral token.
  - Fallback text: a contrasting foreground token.
  - Border: optional ring using border color and border-width tokens.
  - Border radius: radius token for `square` variant.
- Responsive behavior: size prop controls all dimensions. The parent controls which size to use at each breakpoint.

---

## 4. Interaction Behavior

- States:
  - Image loaded: displays the photo clipped to the container shape.
  - Image loading: optionally shows a shimmer/skeleton background while the image loads.
  - Image error / no src: displays initials or a generic user icon fallback.
  - Offline/unavailable: not applicable at the component level.
- Controlled vs uncontrolled: display-only. Accepts `src`, `name` (for initials), `size`, and `shape` as props.
- Keyboard behavior: not focusable by itself. Parent handles focus if Avatar is inside a link or button.
- Screen reader behavior: if an image is present, it must have `alt` text equal to the user's name. If showing initials or icon, the container must have `aria-label` equal to the user's name.
- Motion rules: image load fade-in uses a short opacity transition from motion tokens. Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: always provide a text alternative equal to the person's name — via `alt` on the image, or `aria-label` on the container when showing initials/icon. If the avatar is purely decorative (the name is already present in adjacent text), it may be hidden with `aria-hidden="true"` and no alt text.
- Focus rules: not focusable. Not in the tab order.
- Contrast expectations: initials text must meet WCAG AA contrast against the fallback background.
- Reduced motion behavior: the image fade-in transition is disabled under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: fallback background color token(s), fallback text color token, border color token (optional), border radius token (square variant), size tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based width/height, no hardcoded font sizes for initials.
- Dark mode expectations: fallback background and text tokens must have dark-mode equivalents. The optional border must remain visible in both modes.

---

## 7. Composition Rules

- What can wrap it: comment rows, member list items, navigation profile buttons, message headers, card headers, AvatarGroup (stacked avatars). Interactive wrappers (button, link) are always the parent's responsibility.
- What it may contain: an image element or a text element (initials) or an icon. No other children.
- Anti-patterns:
  - Do not place interactive elements inside Avatar.
  - Do not use Avatar for non-person imagery.
  - Do not render arbitrary children — content is determined by `src` and `name` props.
  - Do not use Avatar as a large hero or banner image.

---

## 8. Performance Constraints

- Memoization rules: memoize when rendered in lists (e.g., comment threads, member tables).
- Virtualization: not applicable; handled by the parent list.
- Render boundaries: image loading is the only side effect. No data fetching.

---

## 9. Test Requirements

- What must be tested:
  - Renders an image when `src` is provided.
  - Renders initials fallback when `src` is absent or fails.
  - Initials derived correctly from `name` (max two characters, first letter of each word).
  - Size variants apply correct token-based dimensions.
  - Shape variants (`circle`, `square`) apply correct border-radius.
  - Optional border renders when border prop is provided.
- Interaction cases: none (non-interactive).
- Accessibility checks:
  - Image has a non-empty `alt` attribute matching the person's name.
  - Initials/icon fallback container has `aria-label` matching the person's name.
  - Initials text meets WCAG AA contrast against fallback background.
  - Component does not receive focus.
