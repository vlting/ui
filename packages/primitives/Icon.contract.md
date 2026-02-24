> **Baseline**: This component must also satisfy all requirements in [`FRONTEND_QUALITY.contract.md`](../FRONTEND_QUALITY.contract.md).

# Component Contract — Icon

## 1. Public API

### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| icon | `IconFC` (`ComponentType<{ size?: number; color?: string }>`) | Yes | -- | The icon component to render. Must accept `size` and `color` props. Compatible with `@tamagui/lucide-icons` and any icon set matching the `IconFC` signature. |
| size | `number` | No | `20` | The pixel size passed to the icon component. |
| color | `string` | No | `undefined` | The color passed to the icon component. When omitted, the icon component uses its own default. |

**Exported types:**
- `IconProps = { icon: IconFC; size?: number; color?: string }`
- `IconFC = ComponentType<{ size?: number; color?: string }>`

**Note:** `Icon` is a plain React function component, NOT a Tamagui `styled()` component. It does not accept Tamagui style props.

---

## 2. Behavioral Guarantees

- Renders the provided `icon` component, forwarding `size` and `color` as props.
- Does not wrap the icon in any additional container element.
- Does not manage any internal state.
- Does not produce side effects.
- Does not modify or intercept the icon component's behavior beyond prop forwarding.
- If `color` is not provided, it is passed as `undefined`, letting the icon component determine its own color.

---

## 3. Accessibility Guarantees

- Does not set any accessibility role or label by default. Icons are treated as decorative unless the consuming icon component provides its own accessibility attributes.
- Consumers should wrap `Icon` with appropriate `accessibilityLabel` or `aria-label` at the usage site when the icon conveys meaning.

---

## 4. Styling Guarantees

- Size is controlled via the `size` prop (raw number), not through Tamagui tokens.
- Color can be a raw string value or a resolved Tamagui token color.
- This component does not participate in Tamagui's styling system directly (no `styled()` wrapper, no token props, no responsive/media props).

---

## 5. Breaking Change Criteria

The following constitute breaking changes:

- Removing or renaming any prop (`icon`, `size`, `color`).
- Changing the default `size` from `20`.
- Changing the `IconFC` type signature (e.g., adding required props).
- Wrapping the icon component in an additional container element (changes DOM structure).
- Adding Tamagui `styled()` wrapping (changes the prop surface).
- Changing `Icon` from a function component to a different component type.
