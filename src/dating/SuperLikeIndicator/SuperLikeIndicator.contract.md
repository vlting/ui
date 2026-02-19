# Component Contract — SuperLikeIndicator

## 1. Public API

### Base Props

`SuperLikeIndicator` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: `SwipeCard`, `ProfilePreviewCard`, `MatchCard`, or a profile detail header.

May contain: a single icon element and an optional text label.

---

## 2. Behavioral Guarantees

visible/active (super like is in effect), hidden (no super like).
- The indicator is display-only — it is not an interactive control.
- No hover, focus, or press states on the indicator itself.
- If used within a pressable card, the indicator does not capture pointer events.


- Screen reader behavior: the indicator provides a visually-hidden or `aria-label` text describing the super like status (e.g., "Super liked").


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
- Reduced motion: skip entrance animation; render immediately at full opacity/scale.

---

## 4. Styling Guarantees

- Required tokens: a semantic super-like accent token (distinct from standard like), `color` for label text, optional glow/shadow token.
- Prohibited hardcoded values: no raw hex colors, no pixel-based icon sizes outside the token scale.
- Dark mode: super-like color, glow, and text must all resolve correctly via theme tokens. The indicator must remain visually prominent in both light and dark themes.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `SuperLikeIndicator.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
