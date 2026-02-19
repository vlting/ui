# Component Contract — AccountSwitcher

## 1. Public API

### Base Props

`AccountSwitcher` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

- Idle: trigger button shows current account avatar and name.
  - Hover (web): trigger button shows a subtle background highlight.
  - Focus: trigger button shows a visible focus ring.
  - Active (open): the switcher panel is visible; the trigger reflects the open state.
  - Loading: when account list is being resolved, a loading indicator replaces the list.
  - Disabled: trigger is non-interactive; no visual affordance for opening.

- Keyboard behavior:
- Screen reader behavior: trigger announces "Account switcher, [current account name], button". Account entries announce name and secondary identifier. Selected account announces "selected".


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
- Reduced motion: no scale or fade transitions when `prefers-reduced-motion: reduce` is active.

---

## 4. Styling Guarantees

- Required tokens: background color, surface/overlay color, text primary, text secondary, border color, focus ring color, selected indicator color, avatar placeholder background.
- Prohibited hardcoded values: no raw color strings, no pixel spacing values, no hardcoded font sizes.
- Dark mode: all token references must resolve correctly under the active theme; no separate dark-mode-only style overrides.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `AccountSwitcher.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
