# Component Contract — Heading

## 1. Public API

### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| level | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | No | `2` | Sets the heading's visual size. Maps to font size, line height, and font weight tokens. |

**Level-to-token mapping:**

| Level | fontSize | lineHeight | fontWeight |
|-------|----------|------------|------------|
| 1 | `$10` | `$10` | `$5` |
| 2 | `$8` | `$8` | `$5` |
| 3 | `$6` | `$6` | `$4` |
| 4 | `$5` | `$5` | `$4` |
| 5 | `$4` | `$4` | `$4` |
| 6 | `$3` | `$3` | `$4` |

**Base styles (always applied):**
- `fontFamily: '$heading'`
- `color: '$color'`
- `accessibilityRole: 'header'`

**Inherited:** `Heading` is built with `styled(Text)` from Tamagui. It accepts all Tamagui `Text` style props (e.g., `color`, `fontSize`, `fontWeight`, `textAlign`, `numberOfLines`, accessibility props, etc.).

**Exported type:** `HeadingProps = GetProps<typeof HeadingBase>`

---

## 2. Behavioral Guarantees

- Renders a Tamagui `Text` element with `accessibilityRole: 'header'`.
- The `level` variant is purely visual; it controls font size, line height, and weight. It does not map to HTML heading elements (`h1`-`h6`) at the render level.
- Does not manage any internal state.
- Does not produce side effects.
- Does not fetch data or contain business logic.

---

## 3. Accessibility Guarantees

- Always sets `accessibilityRole: 'header'`, ensuring screen readers announce this element as a heading.
- Note: The `level` variant does not set `accessibilityLevel` or `aria-level`. Consumers who need semantic heading levels for screen readers should set `aria-level` manually.
- Inherits all accessibility props from Tamagui `Text`.

---

## 4. Styling Guarantees

- Uses `$heading` font family token.
- Uses `$color` theme token for text color, ensuring theme compatibility.
- All font sizes, line heights, and weights reference design tokens (no hardcoded values).
- Supports light/dark themes via the `$color` token.
- Consumers can override any style prop including `color`, `fontSize`, `fontWeight`.
- Supports all Tamagui responsive and media-query props.

---

## 5. Breaking Change Criteria

The following constitute breaking changes:

- Removing the `level` variant or any of its values (1-6).
- Changing the default level from `2`.
- Changing the token mappings for any level (fontSize, lineHeight, fontWeight).
- Removing the `accessibilityRole: 'header'` default.
- Changing the base font family from `$heading`.
- Changing the base color from `$color`.
- Changing the base element from Tamagui `Text` to a different element type.
- Removing or narrowing inherited Tamagui `Text` props.
