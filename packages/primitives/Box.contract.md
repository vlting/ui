> **Baseline**: This component must also satisfy all requirements in [`FRONTEND_QUALITY.contract.md`](../FRONTEND_QUALITY.contract.md).

# Component Contract — Box

## 1. Public API

### Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| centered | `boolean` | No | When `true`, sets `alignItems: 'center'` and `justifyContent: 'center'` on the container. |

**Inherited:** `Box` is built with `styled(View)` from Tamagui. It accepts all Tamagui `View` style props (e.g., `padding`, `margin`, `backgroundColor`, `width`, `height`, `flex`, `borderRadius`, event handlers, `accessibilityRole`, etc.).

**Exported type:** `BoxProps = GetProps<typeof Box>`

---

## 2. Behavioral Guarantees

- Renders a Tamagui `View` (maps to `div` on web, `View` on native).
- The `centered` variant applies both `alignItems` and `justifyContent` as a pair; it will never apply only one axis.
- Does not manage any internal state.
- Does not produce side effects.
- Does not fetch data or contain business logic.

---

## 3. Accessibility Guarantees

- Inherits all accessibility props from Tamagui `View` (`accessibilityRole`, `accessibilityLabel`, `accessibilityState`, etc.).
- Does not set any accessibility role by default; consumers must set roles as appropriate for their use case.
- Keyboard focus behavior is inherited from the underlying platform view.

---

## 4. Styling Guarantees

- All styling is delegated to Tamagui's token system; no hardcoded color or spacing values are present.
- Supports all Tamagui responsive and media-query props.
- Compatible with light/dark themes via Tamagui theme tokens.
- The `centered` variant uses only layout properties and does not affect color or theme.

---

## 5. Breaking Change Criteria

The following constitute breaking changes:

- Removing the `centered` variant.
- Changing `centered` to apply different alignment behavior (e.g., only one axis).
- Changing the base element from Tamagui `View` to a different element type.
- Removing or narrowing inherited Tamagui `View` props.
- Adding a default `accessibilityRole` (changes DOM/accessibility tree structure).
