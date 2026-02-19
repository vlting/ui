# Component Contract — AudioPlayer

## 1. Public API

### Base Props

`AudioPlayer` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle / paused` state: play button visible; scrubber at current position.
- In `playing` state: pause button visible; scrubber advances in real time.
- In `buffering` state: visual buffering indicator on the scrubber or play button.
- In `error` state: error message replaces playback controls or is shown inline.
- In `disabled` state: all controls non-interactive; reduced opacity.
- In `muted` state: volume icon reflects muted state.

- Keyboard behavior: `Space` toggles play/pause; arrow keys adjust scrubber position; volume keys adjust volume level.
- Screen reader behavior: play/pause button has an accessible label reflecting current state ("Play" or "Pause"); scrubber has an `aria-label` and `aria-valuetext` with elapsed time.
- Motion rules: scrubber progress updates at a constant rate; no animation on play/pause toggle when `prefers-reduced-motion: reduce` is active.

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
- Reduced motion: disable scrubber smooth-scroll animation; still update position on interaction.

---

## 4. Styling Guarantees

- Required tokens: `background`, `borderColor`, `color`, `colorMuted`, `colorPrimary` (scrubber fill), `backgroundHover`, `focusStyle`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or border-radius numbers.
- Dark mode: all tokens must resolve correctly; scrubber thumb must remain visible against the track in dark mode.

- Responsive behavior: on narrow viewports volume control may collapse to a mute toggle; scrubber remains visible and functional.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `AudioPlayer.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
