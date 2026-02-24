> **Baseline**: This component must also satisfy all requirements in [`FRONTEND_QUALITY.contract.md`](../FRONTEND_QUALITY.contract.md).

# Component Contract — Stack

## 1. Public API

This module exports three components:

### VStack

Built with `styled(YStack)` from Tamagui. Lays out children vertically (column direction).

No custom variants or base styles are defined.

**Exported type:** `VStackProps = GetProps<typeof VStack>`

### HStack

Built with `styled(XStack)` from Tamagui. Lays out children horizontally (row direction).

No custom variants or base styles are defined.

**Exported type:** `HStackProps = GetProps<typeof HStack>`

### Stack

Alias for `VStack`. Default layout direction is vertical.

**Exported type:** `StackProps = VStackProps`

### Props (all three components)

All props are inherited from their Tamagui base components:

| Component | Base | Inherited Props |
|-----------|------|-----------------|
| VStack | Tamagui `YStack` | All `YStack` style props (padding, margin, gap, alignItems, justifyContent, flex, backgroundColor, event handlers, accessibility props, etc.) |
| HStack | Tamagui `XStack` | All `XStack` style props (same as YStack but with `flexDirection: 'row'` by default) |
| Stack | VStack | Same as VStack |

---

## 2. Behavioral Guarantees

- `VStack` renders a Tamagui `YStack` (vertical flex container, `flexDirection: 'column'`).
- `HStack` renders a Tamagui `XStack` (horizontal flex container, `flexDirection: 'row'`).
- `Stack` is a direct reference to `VStack`, not a wrapper. They are the same object.
- None of these components define custom variants or base styles; they are thin `styled()` wrappers.
- None manage internal state.
- None produce side effects.
- None contain business logic.

---

## 3. Accessibility Guarantees

- No accessibility roles are set by default.
- All accessibility props from the underlying Tamagui stack components are available (`accessibilityRole`, `accessibilityLabel`, `accessibilityState`, etc.).
- Consumers must set appropriate accessibility attributes based on their use case.

---

## 4. Styling Guarantees

- No base styles or token defaults are applied; components start from the Tamagui `YStack`/`XStack` defaults.
- All Tamagui token-based style props are supported (spacing, colors, sizing, etc.).
- Supports all Tamagui responsive and media-query props.
- Compatible with light/dark themes via Tamagui theme tokens.

---

## 5. Breaking Change Criteria

The following constitute breaking changes:

- Removing any of the three exports (`VStack`, `HStack`, `Stack`).
- Changing `Stack` from being an alias of `VStack` to something else.
- Changing the base component of `VStack` from Tamagui `YStack`.
- Changing the base component of `HStack` from Tamagui `XStack`.
- Adding default styles or variants that alter current layout behavior.
- Removing or narrowing inherited Tamagui stack props.
