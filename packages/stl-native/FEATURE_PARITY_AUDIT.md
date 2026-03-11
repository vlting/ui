# stl-native vs stl-react Feature Parity Audit

> Generated: 2026-03-10

## Summary

| Area | stl-react | stl-native | Parity |
|------|-----------|------------|--------|
| `styled()` API | Full | Full | ~95% |
| Primitives | 20 | 15 → 19 | ~95% |
| Hooks | 8 | 8 | ~90% |
| Provider | Full | Full | ~85% |
| Token system | CSS vars (`@vlting/stl`) | `NativeStyleResolver` + `tokenResolver` | ~90% |
| Conditions/breakpoints | CSS media + JS context | Bitmask (`ConditionMask`) | Full |

---

## 1. `styled()` API

### Shared surface (parity)
- Signature: `styled(component, css, variants?, styleName?)`
- Variant resolution with boolean coercion (`"true"/"false"` ↔ `boolean`)
- `css` prop override at render time
- `style` prop merge (user styles win)
- `index` / `length` props for list-aware styling
- `as` polymorphism forwarding (`isStyledComponent` flag)
- `forwardRef` wrapping, `displayName` assignment

### stl-react only
- **`className` prop** — web CSS class merging
- **`isSemantic` prop** — semantic HTML hinting
- **`styleManager` prop** — `StyleManager` integration (SSR/build-time CSS injection)
- **`Debug` component** — renders debug overlay when `conditions.debug` is true
- **`useVariants` hook** — uses `useState`/`useRef` with cache-key diffing (React state-driven)

### stl-native only
- **`NativeStyleResolver`** — module-scope token resolution at `styled()` call time (O(1) render path)
- **Interaction style callback** — detects `hovered`/`pressed`/`focused` keys in CSS, returns Pressable-compatible `style` function
- **Bitmask condition system** — `ConditionMask` bitmask instead of `Record<string, boolean>`
- **Variant cache** — `Map<string, NativeStyle>` with frozen objects for referential stability
- **Override cache** — `WeakMap<CSS, Map<string, NativeStyle>>` for css prop overrides

### Gaps
| Gap | Impact | Notes |
|-----|--------|-------|
| No `as` polymorphism on native | Low | RN doesn't have element-type polymorphism; `as` is stripped |
| No `styleManager` on native | None | SSR/build-time CSS is web-only |
| No `Debug` overlay on native | Low | Could add RN dev-tools equivalent later |

---

## 2. Primitives

| Primitive | stl-react | stl-native | Notes |
|-----------|-----------|------------|-------|
| Box | yes | yes | |
| Row | yes | yes | |
| Column | yes | yes | |
| Text | yes | yes | |
| Heading | yes | yes | |
| SubHeading | yes | yes | |
| Image | yes | yes | |
| Pressable | yes | yes | |
| ScrollView | yes | yes | |
| Grid | yes | yes | RN uses `onLayout` for column measurement |
| Link | yes | yes | RN uses `Linking.openURL` |
| List | yes | yes | |
| OList | yes | yes | |
| ListItem | yes | yes | |
| FlexList | yes | yes | |
| FlexListItem | yes | yes | |
| **Spacer** | yes | **missing** | Added in this PR |
| **Divider** | yes | **missing** | Added in this PR |
| **Separator** | yes | **missing** | Added in this PR |
| **AspectRatio** | yes | **missing** | Added in this PR |

---

## 3. Hooks

| Hook | stl-react | stl-native | Notes |
|------|-----------|------------|-------|
| `useColorMode` | yes | yes | |
| `useConditions` | yes | yes | Web returns `Record<string, boolean>`, native wraps bitmask |
| `useConditionMask` | no | yes | Native-only, provides raw bitmask |
| `useTransition` | yes | yes | |
| `useLayout` | yes | yes | |
| `useMediaQuery` | yes | yes | |
| `useTokens` | yes | yes | |
| `useRTL` | yes | yes | |
| `useMutationObserver` | yes | no | Web-only (DOM API) |
| `useThemeStyle` | yes | no | Web-only (CSS var injection) |

---

## 4. Provider

| Feature | stl-react | stl-native | Notes |
|---------|-----------|------------|-------|
| Color mode state | yes | yes | |
| System color scheme listener | `useMediaQuery` | `Appearance.addChangeListener` | |
| Breakpoint detection | CSS media queries | `Dimensions.addEventListener` | |
| RTL detection | CSS + context | `I18nManager.isRTL` | |
| Reduced motion | CSS media query | `AccessibilityInfo` | |
| Touch/pointer detection | CSS media query | Hardcoded `touch: true` | |
| Theme overrides | `useThemeStyle` (CSS vars) | Not yet implemented | |
| `tokenValue` in context | yes | no | Native resolves tokens at styled() time |
| `isTouchDevice` in context | yes | no | Always touch on native |
| Condition delivery | `CssConditionsContext` (object) | `ConditionMaskContext` (number) | |

### Gaps
| Gap | Impact | Notes |
|-----|--------|-------|
| No runtime theme overrides on native | Medium | Need `configureTheme()` equivalent in provider |
| No `tokenValue` in context | Low | Tokens resolved at styled() time, not needed at runtime |
| `breakpointOverrides` prop accepted but unused | Low | Wire up in `getBreakpointConditions` |

---

## 5. Token System

| Feature | stl-react | stl-native |
|---------|-----------|------------|
| Resolution time | Runtime (CSS custom properties) | Module scope (`NativeStyleResolver`) |
| Token format | `$tokenName` → CSS var | `$tokenName` → concrete value via `resolveToken()` |
| Scales | color, size, space, radius, font*, typoSpace, zIndex, shadow, border, animation, etc. | color, size, space, radius, fontSize, fontWeight, fontFamily, lineHeight, typoSpace, zIndex |
| Shadow tokens | CSS `box-shadow` | Expanded to `shadowColor/Offset/Opacity/Radius` + `elevation` |
| Prop mapping | Direct CSS props | `propMap.ts` converts web CSS names → RN style names |
| Caching | Browser CSS cache | `Map`-based frozen object cache |

### Gaps
| Gap | Impact | Notes |
|-----|--------|-------|
| Missing scales: animation, border, outline, textDecoration, typo, row, column | Low-Medium | Some are web-only concepts; others need native equivalents |

---

## 6. Conditions / Breakpoints

Both platforms support the same condition keys:
`xs`, `sm`, `md`, `lg`, `xl`, `!xs`..`!xl`, `dark`, `light`, `rtl`, `ltr`, `lowMotion`, `!lowMotion`, `touch`, `!touch`, `pointer`, `!pointer`, `tv`, `!tv`, `highContrast`, `!highContrast`, `lowData`, `!lowData`, `debug`

Native additionally supports interaction conditions in styled():
`hovered`, `pressed`, `focused` (bits 27-29)

| Feature | stl-react | stl-native |
|---------|-----------|------------|
| Breakpoint system | CSS media queries via `conditionsMap` | `Dimensions` API + bitmask |
| Condition representation | `Record<ConditionKeys, boolean>` | `ConditionMask` (bitmask number) |
| Interaction states | CSS pseudo-classes (`:hover`, `:active`, `:focus`) | Pressable `style` callback with mask mutation |
| First/last/even/odd | CSS `:nth-child` + `index`/`length` props | `index`/`length` props |

Full parity on condition keys. Implementation differs by platform (appropriately).
