# Component Contract — Playlist

## 1. Public API

### Base Props

`Playlist` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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



---

## 2. Behavioral Guarantees

- In `idle` state: tracks listed, no active track.
- In `playing` state: active track highlighted; visual indicator (e.g., animation or icon) shows it is playing.
- In `paused` state: active track still highlighted but the playing indicator is paused.
- In `hover` state: row subtly highlights on hover.
- In `focus` state: visible focus ring on focused row.
- In `disabled` state: entire playlist or individual tracks may be disabled; non-interactive, reduced opacity.

- Keyboard behavior: arrow keys navigate between track rows; `Enter` or `Space` selects a track; drag reorder is keyboard-accessible via a grab-and-arrow pattern.
- Screen reader behavior: list uses `role="list"` with `role="listitem"` per track; active track announces "now playing"; track announces title, duration, and position.
- Motion rules: playing indicator animation respects `prefers-reduced-motion`; reorder drag transitions respect reduced motion.

### This component will never:

- Fetch data, call APIs, or contain business logic.
- Enforce RBAC or domain rules.
- Assume application routing context.
- Introduce cross-component shared state.

---

## 3. Accessibility Guarantees

- Exposes appropriate ARIA role for its context.
- Focus must be visible and never trapped.
- All visible text meets WCAG AA contrast ratio (4.5:1).
- Reduced motion: suppress playing indicator animation and drag transition animations.

---

## 4. Styling Guarantees

- Required tokens: `background`, `backgroundHover`, `backgroundActive`, `borderColor`, `color`, `colorMuted`, `colorActive`, `focusStyle`, `space`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or row height values.
- Dark mode: active row highlight and track text must maintain sufficient contrast in dark themes.

- Responsive behavior: on narrow viewports the playlist takes full width; optional columns (e.g., album art) may collapse.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `Playlist.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
