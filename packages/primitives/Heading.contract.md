> **Baseline**: This component must also satisfy all requirements in [`FRONTEND_QUALITY.contract.md`](../FRONTEND_QUALITY.contract.md).

# Component Contract — Heading

## 1. Public API

### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| level | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | No | `2` | Sets the heading level. Determines both the rendered HTML element (`<h1>`–`<h6>`) and the visual size (font size, line height, font weight tokens). |

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
- `margin: 0` (resets default browser heading margin)

**Rendered element:** Each level renders its corresponding HTML heading element (`<h1>`–`<h6>`) via `styledHtml()`. The `level` prop selects which element is used.

**Inherited:** Style props are passed through to the underlying `styledHtml()` component.

**Exported type:** `HeadingProps` (includes `level`, `children`, and passthrough props)

---

## 2. Behavioral Guarantees

- Renders a native HTML heading element (`<h1>`–`<h6>`) corresponding to the `level` prop.
- The `level` prop controls both the rendered element and the visual styling (font size, line height, weight).
- Does not manage any internal state.
- Does not produce side effects.
- Does not fetch data or contain business logic.

---

## 3. Accessibility Guarantees

- Renders native HTML heading elements (`<h1>`–`<h6>`), which inherently communicate heading semantics and level to screen readers.
- No `accessibilityRole` or `aria-level` is needed — the element tag itself is the semantic signal.
- Screen readers will automatically announce the heading level from the element tag.

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
- Changing the base font family from `$heading`.
- Changing the base color from `$color`.
- Changing the rendered element for a given level (e.g., level 1 must always render `<h1>`).
