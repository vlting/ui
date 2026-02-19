# Component Contract — OfflineIndicator

## 1. Public API

### Base Props

`OfflineIndicator` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: app shell root, page layout containers.

May contain: an icon slot, a message text slot, an optional retry action slot.

---

## 2. Behavioral Guarantees

- Offline: indicator is visible and persistent.
  - Reconnecting: optional variant showing a reconnection attempt in progress.
  - Back online: brief confirmation state before the indicator dismisses.
  - Dismissed: indicator is hidden (only if user-dismissible; by default it should be persistent while offline).
- The indicator is non-interactive by default; there is no user action required.
- If a retry action is provided, it is keyboard-reachable and activatable.

- Keyboard behavior: Tab reaches any interactive element (retry); Enter or Space activates it.
- Screen reader behavior: uses `role="status"` or `role="alert"` to announce the offline condition. When connectivity is restored, the restoration is also announced.
- Motion rules: entrance and exit animations respect reduced-motion preferences.

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
- Reduced motion: entrance and exit animations are suppressed when reduced motion is preferred.

---

## 4. Styling Guarantees

- Required tokens: indicator background (offline state), icon color, text color, reconnecting/restored state variant tokens.
- Prohibited hardcoded values: no hardcoded hex colors, pixel spacing, or font sizes.
- Dark mode: all tokens must resolve to accessible, distinguishable values in dark mode.

- Responsive behavior: adapts to narrow viewports; message text may be truncated with a tooltip for the full message.
- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `OfflineIndicator.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
