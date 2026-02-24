> **Baseline**: This component must also satisfy all requirements in [`FRONTEND_QUALITY.contract.md`](../FRONTEND_QUALITY.contract.md).

# Component Contract — Divider

## 1. Public API

### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| orientation | `'horizontal' \| 'vertical'` | No | `'horizontal'` | Controls the divider direction. `horizontal` renders a 1px-tall full-width line with vertical margin `$2`. `vertical` renders a 1px-wide full-height line with horizontal margin `$2`. |

**Base styles (always applied):**
- `backgroundColor: '$borderColor'`
- `flexShrink: 0`

**Inherited:** `Divider` is built with `styled(View)` from Tamagui. It accepts all Tamagui `View` style props (e.g., `margin`, `backgroundColor`, `opacity`, event handlers, accessibility props, etc.).

**Exported type:** `DividerProps = GetProps<typeof Divider>`

---

## 2. Behavioral Guarantees

- Renders a Tamagui `View` (maps to `div` on web, `View` on native).
- Always shrinks to its intrinsic size (`flexShrink: 0`), preventing collapse in flex containers.
- The `horizontal` orientation sets `height: 1`, `width: '100%'`, `marginVertical: '$2'`.
- The `vertical` orientation sets `width: 1`, `height: '100%'`, `marginHorizontal: '$2'`.
- Does not manage any internal state.
- Does not produce side effects.
- Does not render children (visual separator only).

---

## 3. Accessibility Guarantees

- Does not set an accessibility role by default. Consumers should add `accessibilityRole="separator"` when semantic separation is needed for screen readers.
- Inherits all accessibility props from Tamagui `View`.

---

## 4. Styling Guarantees

- Uses the `$borderColor` theme token for its background color, ensuring theme compatibility.
- Margin values use the `$2` space token.
- Supports light/dark themes automatically via the `$borderColor` token.
- Consumers can override `backgroundColor` and margin via style props.
- Supports all Tamagui responsive and media-query props.

---

## 5. Breaking Change Criteria

The following constitute breaking changes:

- Removing the `orientation` variant or any of its values (`horizontal`, `vertical`).
- Changing the default orientation from `'horizontal'`.
- Changing the default `backgroundColor` token from `$borderColor`.
- Changing the thickness from `1` (pixel).
- Changing the default margin tokens.
- Changing the base element from Tamagui `View` to a different element type.
- Removing or narrowing inherited Tamagui `View` props.
