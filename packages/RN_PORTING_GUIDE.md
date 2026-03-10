# React Native Porting Guide

> `.native.tsx` strategy for porting web components to React Native

---

## File Convention

Place `.native.tsx` files alongside their `.tsx` counterparts:

```
packages/components/src/Button/
  Button.tsx           # Web (stl-react styled)
  Button.native.tsx    # RN (stl-native styled)
  useButton.ts         # Shared logic (stl-headless hook)
```

Metro and React Native bundlers automatically resolve `.native.tsx` over `.tsx`.

### Existing examples
- `packages/utils/useFontLoader.native.ts` — Google Fonts via `expo-font` instead of `<link>`
- `packages/utils/nativeFontFace.native.ts` — Native font-face registration

---

## Porting Pattern

### 1. Extract behavior into a headless hook (`stl-headless`)

```tsx
// useButton.ts (shared)
export function useButton(props: ButtonProps) {
  const { onPress, disabled, loading, ...rest } = props
  return {
    isDisabled: disabled || loading,
    handlePress: disabled || loading ? undefined : onPress,
    ariaProps: { accessibilityRole: 'button' as const, accessibilityState: { disabled } },
    ...rest,
  }
}
```

### 2. Web component uses `stl-react`

```tsx
// Button.tsx
import { styled } from '@vlting/stl-react'
import { useButton } from './useButton'

const ButtonFrame = styled('button', { /* css */ }, { /* variants */ }, 'Button')

export function Button(props: ButtonProps) {
  const { handlePress, isDisabled, ariaProps, ...rest } = useButton(props)
  return <ButtonFrame onClick={handlePress} disabled={isDisabled} {...ariaProps} {...rest} />
}
```

### 3. Native component uses `stl-native`

```tsx
// Button.native.tsx
import { styled } from '@vlting/stl-native'
import { Pressable } from 'react-native'
import { useButton } from './useButton'

const ButtonFrame = styled(Pressable, { /* css */ }, { /* variants */ }, 'Button')

export function Button(props: ButtonProps) {
  const { handlePress, isDisabled, ariaProps, ...rest } = useButton(props)
  return <ButtonFrame onPress={handlePress} disabled={isDisabled} {...ariaProps} {...rest} />
}
```

---

## Export Strategy

### `package.json` conditional exports

```json
{
  "exports": {
    ".": {
      "react-native": "./src/index.native.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  }
}
```

The `"react-native"` condition is resolved by Metro before `"import"` or `"require"`.

### Barrel file

```ts
// index.native.ts — re-exports native implementations
export { Button } from './Button/Button.native'
export { Input } from './Input/Input.native'
// ... etc
```

---

## What NOT to Port

These categories are web-only and should not have `.native.tsx` files:

| Category | Examples | Reason |
|----------|----------|--------|
| HTML-semantic elements | `<nav>`, `<header>`, `<footer>`, `<table>` | No HTML on native |
| CSS-only features | `Tooltip` (CSS hover), `Popover` (CSS position) | Need completely different RN implementation |
| DOM manipulation | `Portal`, `useMutationObserver` | No DOM on native |
| Browser APIs | `useThemeStyle` (CSS vars), `StyleManager` (SSR) | Web runtime only |
| Complex layout | `Masonry`, CSS Grid-dependent components | Use RN-specific layout libs |

### Decision matrix

```
Can the behavior be shared via a hook?
  YES → Create .native.tsx using stl-native + shared hook
  NO  → Is there an RN equivalent API?
    YES → Create .native.tsx with RN-specific implementation
    NO  → Skip — document as web-only in component README
```

---

## Testing Approach

### Unit tests (shared)
- Headless hooks (`useButton`, `useInput`, etc.) tested once with `@testing-library/react`
- Tests live next to the hook file: `useButton.test.ts`

### Component tests (per-platform)

```
Button.test.tsx          # Web tests (jsdom, @testing-library/react)
Button.native.test.tsx   # RN tests (@testing-library/react-native)
```

### What to test on native
1. **Renders correctly** — snapshot or structure assertion
2. **Interaction states** — press, hover (Pressable callbacks)
3. **Variants** — visual variants apply correct styles
4. **Accessibility** — `accessibilityRole`, `accessibilityState`, `accessibilityLabel`

### CI setup
- Web tests: Vitest + jsdom
- Native tests: Jest + `react-native` preset (or Vitest with `react-native` environment)
- Run both in CI matrix: `test:web` and `test:native`

---

## Token Differences

| Concern | Web (`stl-react`) | Native (`stl-native`) |
|---------|-------------------|----------------------|
| Token resolution | Runtime CSS custom properties | Module-scope via `NativeStyleResolver` |
| Shadow tokens | `box-shadow` CSS string | Expanded to `shadowColor/Offset/Opacity/Radius` + `elevation` |
| Prop names | CSS props (`margin-top`, `background-color`) | RN props (`marginTop`, `backgroundColor`) via `propMap` |
| Interaction styles | CSS pseudo-classes | Pressable `style` callback with condition bitmask |

Use the same `$tokenName` values in both `.tsx` and `.native.tsx` files. The styled engine handles resolution per-platform.
