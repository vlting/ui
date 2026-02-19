# Component Contract — BoostBadge

## 1. Public API

### Base Props

`BoostBadge` is implemented as a Tamagui `styled(YStack)` and therefore accepts all Tamagui / React Native `View` props, including:

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

Intended to be wrapped by: a profile card, a profile header, an avatar overlay container, or a list item.

May contain: an icon element and an optional text label.

---

## 2. Behavioral Guarantees

active (boost running), inactive (no boost), expiring-soon (visual urgency cue), expired (muted appearance).
- The badge itself is non-interactive by default. When used within a pressable context, it inherits press/hover states from the parent.
- No controlled/uncontrolled distinction — the badge is purely display-driven by props.

- Keyboard behavior: not independently focusable unless given an explicit interactive role by a parent.
- Screen reader behavior: renders meaningful text or an `aria-label` describing the boost state; does not read decorative icon separately.


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
- Reduced motion: remove pulse/glow animation entirely; display static badge.

---

## 4. Styling Guarantees

- Required tokens: `color.accent` (or equivalent boost highlight), `background`, `color` for label text, `borderRadius` from radius token scale.
- Prohibited hardcoded values: no raw hex color codes, no hardcoded pixel sizes, no inline `fontWeight` integers outside the type token scale.
- Dark mode: badge background and text must resolve correctly via theme tokens in both light and dark contexts.


- Supports theming extension without breaking existing contracts.

---

## 5. Breaking Change Criteria

The following constitute breaking changes and require a major version bump:

- Removing any currently accepted prop.
- Changing the type or default value of an existing prop in a way that alters behavior.
- Changing keyboard interaction semantics (e.g., which key triggers an action).
- Changing ARIA role or landmark structure.
- Removing a named static sub-component (e.g., `BoostBadge.Item`).
- Changing controlled/uncontrolled state behavior.
- Dropping support for a previously guaranteed theme token.
- Altering the DOM/native element structure in a way that breaks styling contracts.
