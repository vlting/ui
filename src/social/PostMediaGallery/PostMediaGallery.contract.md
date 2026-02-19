# Component Contract — PostMediaGallery

## 1. Public API

### Base Props

`PostMediaGallery` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: PostCard.Media section. May also be used in a post detail page outside of a PostCard.

May contain: Image items, video items, and a "+N more" overflow control.

---

## 2. Behavioral Guarantees

- Idle: Gallery items displayed at their static sizes.
  - Hover (web): Individual item shows a subtle brightness overlay on hover.
  - Focus: Visible focus ring around the focused item.
  - Pressed: Brief opacity or scale feedback.
  - "+N more" overlay: The 4th item in an overflow gallery is partially obscured by a semi-transparent overlay with the count.
  - Loading: Items show a skeleton placeholder before the media loads.
  - Error: If a media item fails to load, a placeholder with an error icon is shown.
- Controlled vs uncontrolled: The media list and expand callback are controlled by the parent. PostMediaGallery fires a callback with the item index when a media item is activated.
- Keyboard behavior:
- Screen reader behavior:
- Motion rules: Loading skeleton uses a shimmer animation. Hover brightness transition is brief (under 100ms). Reduced motion suppresses shimmer and hover transition.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements:
- Focus rules: All gallery items and the "+N more" control are in the Tab order. Focus ring must be clearly visible.
- Contrast expectations: The "+N more" overlay text must meet 4.5:1 against the overlay background. Error state placeholder must be perceivable in both themes.
- Reduced motion behavior: Shimmer and hover transitions are disabled.

---

## 4. Styling Guarantees

- Required tokens: gallery gap, item radius, overlay background (semi-transparent), overlay text color, skeleton background, error placeholder background and icon color, focus ring.
- Prohibited hardcoded values: No hardcoded hex colors, pixel gaps, border radii, or overlay opacity values as hardcoded numbers outside the token system.
- Dark mode expectations: Overlay background and error placeholder adapt to dark mode. The gallery gap and radius tokens remain consistent. Focus ring is visible on dark backgrounds.
- Layout rules:
- Responsive behavior: On narrow viewports, items maintain their aspect ratios and scale down proportionally. The grid layout adapts: 2-column layouts may collapse to stacked on very narrow viewports.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `PostMediaGallery.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
