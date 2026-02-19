# Component Contract — Avatar

## 1. Public API

### Base Props

`Avatar` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

| Category | Examples |
|----------|---------|
| Layout | `width`, `height`, `minWidth`, `maxWidth`, `flex`, `flexDirection` |
| Spacing | `padding`, `paddingHorizontal`, `margin`, `gap` (space tokens) |
| Visual | `backgroundColor`, `borderColor`, `borderRadius`, `opacity` |
| Theme | `theme`, `themeInverse` |
| Animation | `animation`, `enterStyle`, `exitStyle` |
| Accessibility | `accessible`, `accessibilityLabel`, `accessibilityRole`, `aria-*` |
| Events | `onPress`, `onHoverIn`, `onHoverOut`, `onFocus`, `onBlur` |

### Component-Specific Props

No additional props are defined in the current stub implementation. Props specific to the component's behavior (e.g., data, state, callbacks) are to be defined when behavioral logic is implemented per the `.spec.md`.

### Composition Context

Intended to be wrapped by: comment rows, member list items, navigation profile buttons, message headers, card headers, AvatarGroup (stacked avatars). Interactive wrappers (button, link) are always the parent's responsibility.

May contain: an image element or a text element (initials) or an icon. No other children.

---

## 2. Behavioral Guarantees

- Image loaded: displays the photo clipped to the container shape.
  - Image loading: optionally shows a shimmer/skeleton background while the image loads.
  - Image error / no src: displays initials or a generic user icon fallback.
  - Offline/unavailable: not applicable at the component level.
- Controlled vs uncontrolled: display-only. Accepts `src`, `name` (for initials), `size`, and `shape` as props.
- Keyboard behavior: not focusable by itself. Parent handles focus if Avatar is inside a link or button.
- Screen reader behavior: if an image is present, it must have `alt` text equal to the user's name. If showing initials or icon, the container must have `aria-label` equal to the user's name.
- Motion rules: image load fade-in uses a short opacity transition from motion tokens. Suppressed under reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: always provide a text alternative equal to the person's name — via `alt` on the image, or `aria-label` on the container when showing initials/icon. If the avatar is purely decorative (the name is already present in adjacent text), it may be hidden with `aria-hidden="true"` and no alt text.
- Focus rules: not focusable. Not in the tab order.
- Contrast expectations: initials text must meet WCAG AA contrast against the fallback background.
- Reduced motion behavior: the image fade-in transition is disabled under `prefers-reduced-motion: reduce`.

---

## 4. Styling Guarantees

- Required tokens: fallback background color token(s), fallback text color token, border color token (optional), border radius token (square variant), size tokens.
- Prohibited hardcoded values: no raw hex colors, no pixel-based width/height, no hardcoded font sizes for initials.
- Dark mode expectations: fallback background and text tokens must have dark-mode equivalents. The optional border must remain visible in both modes.

- Responsive behavior: size prop controls all dimensions. The parent controls which size to use at each breakpoint.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Avatar.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
