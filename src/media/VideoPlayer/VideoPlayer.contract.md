# Component Contract — VideoPlayer

## 1. Public API

### Base Props

`VideoPlayer` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle / paused` state: play button visible.
- In `playing` state: pause button visible; scrubber advances; control bar may auto-hide.
- In `buffering` state: spinner on the video surface; scrubber shows buffered range.
- In `error` state: error message displayed in the video area.
- In `fullscreen` state: control bar repositions to bottom of full screen.
- In `muted` state: volume icon reflects muted state.
- In `disabled` state: all controls non-interactive; reduced opacity.

- Keyboard behavior: `Space` toggles play/pause; left/right arrow keys seek backward/forward; up/down arrow keys adjust volume; `F` toggles fullscreen; `M` toggles mute.
- Screen reader behavior: play/pause button has a dynamic `aria-label`; scrubber has `aria-label` and `aria-valuetext` with elapsed time; control bar does not auto-hide when keyboard focus is inside it.
- Motion rules: control bar auto-hide fade respects `prefers-reduced-motion`; instant show/hide when reduced motion is active.

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
- Reduced motion: disable auto-hide fade; suppress buffering spinner animation if it causes distraction.

---

## 4. Styling Guarantees

- Required tokens: `background` (control bar), `color`, `colorMuted`, `colorPrimary` (scrubber/volume fill), `backgroundHover`, `focusStyle`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or opacity values.
- Dark mode: control bar and icon tokens must resolve with sufficient contrast.

- Responsive behavior: on narrow viewports the control bar may hide secondary controls (playback speed, settings); core controls (play/pause, scrubber, fullscreen) always remain.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `VideoPlayer.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
