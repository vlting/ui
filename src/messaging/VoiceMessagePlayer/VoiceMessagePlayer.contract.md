# Component Contract — VoiceMessagePlayer

## 1. Public API

### Base Props

`VoiceMessagePlayer` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- In `idle / paused` state: play button visible; waveform at current position (or start).
- In `playing` state: pause button visible; waveform fill advances in real time.
- In `buffering` state: spinner replaces the play button while audio loads.
- In `completed` state: play button returns; waveform fully filled (or resets to start).
- In `error` state: error indicator replaces the play button; an accessible error message is present.

- Keyboard behavior: `Space` toggles play/pause when the player is focused; left/right arrow keys seek backward/forward.
- Screen reader behavior: play/pause button has a dynamic `aria-label`; the waveform/scrubber has `role="slider"` with `aria-valuetext` showing elapsed time; duration is announced on mount.
- Motion rules: waveform fill animation respects `prefers-reduced-motion`; when reduced motion is active, the fill jumps to the current position without transition.

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
- Reduced motion: waveform fill does not animate; position updates are instant.

---

## 4. Styling Guarantees

- Required tokens: `colorPlayed` (waveform fill — outgoing), `colorPlayedIncoming` (waveform fill — incoming), `colorUnplayed` (muted waveform), `color` (time text), `backgroundButton`, `focusStyle`, `space`, `size` (button diameter, waveform height).
- Prohibited hardcoded values: no literal color strings, pixel dimensions, or animation durations.
- Dark mode: played and unplayed waveform tokens must maintain sufficient contrast in dark themes against both bubble colors.

- Responsive behavior: the player fills the bubble's content width; waveform scales to available space.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `VoiceMessagePlayer.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
