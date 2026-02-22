# Component Contract — Text

## 1. Public API

### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | No | `'md'` | Controls font size and line height via tokens. |
| tone | `'neutral' \| 'muted' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | No | -- | Sets the text color to a semantic color token. |
| weight | `'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold'` | No | -- | Sets the font weight. |

**Size-to-token mapping:**

| Size | fontSize | lineHeight |
|------|----------|------------|
| xs | `$1` | `$1` |
| sm | `$2` | `$2` |
| md | `$4` | `$4` |
| lg | `$6` | `$6` |
| xl | `$8` | `$8` |

**Tone-to-token mapping:**

| Tone | color |
|------|-------|
| neutral | `$color` |
| muted | `$colorSubtitle` |
| primary | `$color10` |
| success | `$green10` |
| warning | `$orange10` |
| danger | `$red10` |

**Weight mapping:**

| Weight | fontWeight |
|--------|-----------|
| light | `'300'` |
| normal | `'400'` |
| medium | `'500'` |
| semibold | `'600'` |
| bold | `'700'` |

**Base styles (always applied):**
- `fontFamily: '$body'`
- `color: '$color'`

**Inherited:** `Text` is built with `styled(Text)` from Tamagui. It accepts all Tamagui `Text` style props (e.g., `color`, `fontSize`, `fontWeight`, `textAlign`, `numberOfLines`, `textDecorationLine`, `opacity`, event handlers, accessibility props, etc.).

**Exported type:** `TextProps = GetProps<typeof Text>`

---

## 2. Behavioral Guarantees

- Renders a Tamagui `Text` element (maps to `span`/`p` on web, `Text` on native).
- The `size`, `tone`, and `weight` variants are independent and can be combined freely.
- When `tone` is not specified, the base `color: '$color'` applies.
- When `weight` is not specified, the font weight is determined by the font family default.
- Does not manage any internal state.
- Does not produce side effects.
- Does not fetch data or contain business logic.

---

## 3. Accessibility Guarantees

- Does not set any accessibility role by default. Text is treated as static content.
- Inherits all accessibility props from Tamagui `Text` (`accessibilityRole`, `accessibilityLabel`, etc.).
- Color tokens used for `tone` variants must meet WCAG contrast requirements when used against their intended background (this is a theme-level responsibility, not enforced by the component).

---

## 4. Styling Guarantees

- Uses `$body` font family token.
- Uses `$color` theme token as the base text color, ensuring theme compatibility.
- All font sizes, line heights, and color values reference design tokens (no hardcoded values).
- Font weights are specified as string literals (`'300'`, `'400'`, etc.) for cross-platform compatibility.
- Supports light/dark themes via the `$color`, `$colorSubtitle`, and named color tokens.
- Consumers can override any style prop including `color`, `fontSize`, `fontWeight`.
- Supports all Tamagui responsive and media-query props.

---

## 5. Breaking Change Criteria

The following constitute breaking changes:

- Removing the `size`, `tone`, or `weight` variant, or any of their values.
- Changing the default `size` from `'md'`.
- Changing the token mappings for any variant value.
- Changing the base font family from `$body`.
- Changing the base color from `$color`.
- Changing font weight string values (e.g., `'600'` to `'650'`).
- Changing the base element from Tamagui `Text` to a different element type.
- Removing or narrowing inherited Tamagui `Text` props.
