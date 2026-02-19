# Component Contract — TagFilterBar

## 1. Public API

### Base Props

`TagFilterBar` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: Placed above a `ThreadList` or content feed, typically below a `CommunityHeader` or page navigation bar.

May contain: A set of tag chip elements. May include an "All" reset chip and a trailing overflow indicator or "More" button when tags exceed the visible area.

---

## 2. Behavioral Guarantees

- Idle: No tag is active; "All" chip is selected by default.
  - Tag selected: The selected chip is visually highlighted; the "All" chip is deselected.
  - Multi-select (if supported): Multiple chips are selected simultaneously.
  - Loading: Skeleton chips are shown while tags are being loaded.
- Controlled vs uncontrolled: Fully controlled. Parent supplies the tag list, selected tag(s), and onChange callback.
- Keyboard behavior: Tab focuses the tag bar container. Arrow Left/Right navigates between chips (roving tabindex). Enter/Space toggles the focused chip. Home/End jump to first/last chip.
- Screen reader behavior: The filter bar is a `role="group"` with an accessible label (e.g., "Filter by tag"). Each chip is a toggle button with `aria-pressed` reflecting its selected state.
- Motion rules: Selecting a chip triggers a subtle background transition. Reduced motion: instant color change.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- ARIA requirements: Container uses `role="group"` and `aria-label="Filter by tag"`. Each chip uses `role="button"` or is a `<button>` element with `aria-pressed`. The "All" chip indicates the reset state clearly.
- Focus rules: Roving tabindex within the chip group — only one chip is in the tab order at a time. Arrow keys move focus without activating chips.
- Contrast expectations: All chip labels meet WCAG AA against both default and selected chip backgrounds. Selected chip must be distinguishable from unselected without relying on color alone (e.g., bold weight or underline).
- Reduced motion behavior: Chip background transition animations are suppressed.

---

## 4. Styling Guarantees

- Required tokens: chip default background, chip hover background, chip selected background, chip default text color, chip selected text color, chip border color, chip selected border color, spacing token for chip padding, spacing token for chip gap, border radius token for chip (pill shape).
- Prohibited hardcoded values: No hardcoded colors, pixel sizes, or border radii.
- Dark mode expectations: Chip backgrounds and text colors adapt to dark theme tokens. Selected state remains visually distinct in dark mode.

- Responsive behavior: On mobile, the row scrolls horizontally. Scroll indicators (fade gradients at edges) indicate overflow content. On wider viewports, all tags may be visible without scrolling.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `TagFilterBar.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
