> **Baseline**: This component must also satisfy all requirements in [`FRONTEND_QUALITY.contract.md`](../FRONTEND_QUALITY.contract.md).

# Component Contract — Spacer

## 1. Public API

### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | No | -- (defaults to flexible `flex: 1` behavior) | Sets a fixed spacer dimension. When provided, `flex` is set to `0` and explicit `width`/`height` are applied. When omitted, the spacer fills available space via `flex: 1`. |

**Size-to-token mapping:**

| Size | flex | width | height |
|------|------|-------|--------|
| xs | `0` | `$0.5` | `$0.5` |
| sm | `0` | `$1` | `$1` |
| md | `0` | `$2` | `$2` |
| lg | `0` | `$4` | `$4` |
| xl | `0` | `$6` | `$6` |

**Base style (when no size variant is set):** `flex: 1`

**Inherited:** `Spacer` is built with `styled(View)` from Tamagui. It accepts all Tamagui `View` style props (e.g., `width`, `height`, `flex`, accessibility props, etc.).

**Exported type:** `SpacerProps = GetProps<typeof Spacer>`

---

## 2. Behavioral Guarantees

- Renders a Tamagui `View` (maps to `div` on web, `View` on native).
- Without a `size` variant, behaves as a flexible spacer (`flex: 1`) that expands to fill available space in a flex container.
- With a `size` variant, renders as a fixed-dimension element with both `width` and `height` set to the same token value, and `flex: 0`.
- Does not render any visible content or children.
- Does not manage any internal state.
- Does not produce side effects.

---

## 3. Accessibility Guarantees

- Does not set any accessibility role by default. Spacers are presentational elements.
- Inherits all accessibility props from Tamagui `View`, though consumers should generally not need to set them on a spacer.

---

## 4. Styling Guarantees

- All dimension values use Tamagui space tokens (no hardcoded pixel values).
- The flexible default (`flex: 1`) works in both horizontal and vertical flex containers.
- Fixed size variants set both `width` and `height` to the same token, making them orientation-agnostic.
- Supports all Tamagui responsive and media-query props.
- Compatible with light/dark themes (no color styling is applied).

---

## 5. Breaking Change Criteria

The following constitute breaking changes:

- Removing the `size` variant or any of its values (`xs`, `sm`, `md`, `lg`, `xl`).
- Changing the default behavior from `flex: 1` when no size is specified.
- Changing the token mappings for any size value.
- Adding visible content or a background color by default.
- Changing the base element from Tamagui `View` to a different element type.
- Removing or narrowing inherited Tamagui `View` props.
