# Component Quality Gap Report

Generated: 2026-03-10

## Token Violations Summary

367 total violations across component source files.

### By type
- **Hardcoded px**: 278 violations
- **Hex colors**: 70 violations
- **rgba() colors**: 19 violations

### Top offenders
| File | Violations | Types |
|------|-----------|-------|
| Chart/*.tsx | 30+ | hex fallbacks, px sizing |
| Button/Button.tsx | 20+ | px padding/sizing/font |
| Checkbox/Checkbox.tsx | 15+ | hex colors, px sizing |
| Switch/Switch.tsx | 15+ | rgba shadow, hex, px |
| Input/Input.tsx | 15+ | px padding, `red` literal |
| Select/Select.tsx | 10+ | rgba shadow, hex, px |
| Dialog/Dialog.tsx | 10+ | rgba overlay/shadow, hex, px |
| Tabs/Tabs.tsx | 10+ | px padding, border-radius |

## A11y Issues

Based on axe-core test coverage (Playwright `pages-a11y.spec.ts`):
- Tests exist for all showcase pages
- Contrast ratio validation added for STL color matrix
- Specific results require running Playwright against built showcase

## Missing Interactive States

| Component | hover | focus-visible | active | disabled | Tokens Only |
|-----------|-------|---------------|--------|----------|-------------|
| Button | - | - | - | Y | N |
| Input | - | - | - | Y | N |
| Checkbox | - | - | - | Y | N |
| Switch | - | - | - | Y | N |
| Select | - | - | - | Y | N |
| Dialog | - | - | - | - | N |
| Tabs | - | - | - | Y | N |
| Tooltip | Y | Y | - | - | N |
| Card | - | - | - | - | Y |
| Alert | - | - | - | - | Y |
| Badge | - | - | - | - | Y |
| Skeleton | - | - | - | - | Y |
| Label | - | - | - | - | N |
| Icon | - | - | - | - | Y |

**Legend:** Y = implemented, `-` = missing/not applicable, N = has hardcoded values

## Prioritized Fix List

### P0 (Critical — a11y / interaction)
- Focus-visible rings missing on **all interactive components** (Button, Input, Checkbox, Switch, Select, Tabs)
- Hover feedback missing on Button, Input, Checkbox, Switch, Select
- Active/pressed states missing on all components

### P1 (Serious — token compliance)
- `packages/components/Checkbox/Checkbox.tsx` — hardcoded `#0066ff`, `#d1d5db`
- `packages/components/Switch/Switch.tsx` — hardcoded `rgba(0,0,0,0.2)`, `#fff`
- `packages/components/Input/Input.tsx` — hardcoded `red` for error state
- `packages/components/Select/Select.tsx` — hardcoded `rgba(0,0,0,0.15)`, `#f3f4f6`
- `packages/components/Dialog/Dialog.tsx` — hardcoded `rgba(0,0,0,0.5)` overlay
- `packages/components/Chart/*.tsx` — 30+ hex color fallbacks
- `packages/primitives/Label.tsx` — hardcoded `red` for required indicator

### P2 (Minor — hardcoded dimensions)
- 278 hardcoded `px` values across components (padding, sizing, font-size, border-radius)
- Most are CSS fallbacks or inline styles that should use token vars
- `packages/components/Tabs/Tabs.tsx` — hardcoded `150ms` transition duration
- `packages/components/Tooltip/Tooltip.tsx` — hardcoded `100ms` transition

## Notes
- Card, Alert, Badge, Skeleton, Icon are token-compliant
- Many hardcoded values are CSS custom property fallbacks (`var(--x, fallback)`) — replacing requires ensuring tokens are always available
- `prefers-reduced-motion` support was added globally in styles.css.ts
- Focus ring tokens exist in `outline.ts` (widthDefault: 2rem, offsetDefault: 2rem, 9 color combos) — just need to be wired into components
- Hover/press color tokens exist in `color.ts` (backgroundHover, backgroundPress, etc.) — just need to be wired into components
