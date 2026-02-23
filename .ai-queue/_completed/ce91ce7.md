<!-- auto-queue -->
# Commit History
- `b5d2f9a` fix(design-tokens): use explicit dark shadowColor instead of palette index 0
- `ce91ce7` fix(design-tokens): use explicit dark shadowColor instead of palette index 0 (#003) [merge]

# Fix Shadow System — Dark Defaults and Brand Configurability

## Problem
Shadows appear white by default. The root cause is in `packages/design-tokens/themes.ts`, line 391:

```typescript
shadowColor: 0,  // palette index 0 = #ffffff in light mode!
```

The `shadowColor` theme token maps to palette index 0, which is the lightest color in the palette (`#ffffff` in light mode). Any component using `$shadowColor` as its shadow color gets white shadows. While the explicit `shadowSm`, `shadowMd`, etc. tokens use `rgba(0,0,0,...)` (correct), the `shadowColor` template value is wrong.

## Tasks

### 1. Fix shadowColor in the theme template
In `packages/design-tokens/themes.ts`, in the `templates.base` object:
- Change `shadowColor: 0` to point to a dark palette index. Since palette index 11 is the darkest (`#111111` in light mode), and we want shadows to be dark, use `shadowColor: 11` for the base template.
- Actually, better approach: **remove `shadowColor` from the palette-mapped template entirely** and instead set it as a `nonInheritedValues` entry alongside the other shadow values (like `shadowSm`, `shadowMd`, etc.). This gives us explicit control:
  - Light theme `shadowColor`: `'rgba(0,0,0,0.15)'`
  - Dark theme `shadowColor`: `'rgba(0,0,0,0.40)'`

### 2. Establish 3 clear shadow levels for component use
The current system has 5 levels (sm, md, lg, xl, 2xl). This is fine for the token system, but components need clear guidance. Ensure these 3 primary levels are well-defined and easy to consume:
- **`$shadowSm`** — subtle elevation (cards, inputs)
- **`$shadowMd`** — medium elevation (dropdowns, popovers)
- **`$shadowLg`** — strong elevation (modals, dialogs)

The xl and 2xl levels can remain as power-user options.

### 3. Ensure brand config controls shadow properties
The `BrandDefinition.shadows` interface in `packages/design-tokens/brands/index.ts` already accepts `{ light?: ShadowScale; dark?: ShadowScale }`. Verify the full pipeline works:
- Brand can override shadow color, size, offset, blur/softness per level
- Defaults are sensible dark shadows (not white)
- Each of the 3+ levels has distinct, visible shadow appearance

### 4. Review components that use shadows
Search the codebase for any component using `$shadowColor` or shadow-related tokens. Ensure they reference the correct tokens (`$shadowSm`, `$shadowMd`, `$shadowLg` for box-shadow values — NOT `$shadowColor` for the box-shadow itself). Typical components to check:
- Card, Dialog, Drawer, Popover, HoverCard, DropdownMenu, ContextMenu, Tooltip, Toast, Alert

Update any component that has incorrect shadow usage.

## Scope
- `packages/design-tokens/themes.ts` (fix shadowColor mapping, verify shadow token definitions)
- `packages/design-tokens/brands/index.ts` (verify shadow pipeline from BrandDefinition to themes)
- `packages/components/Card/Card.tsx` (if it uses shadows)
- `packages/components/Dialog/Dialog.tsx` (if it uses shadows)
- `packages/components/Drawer/Drawer.tsx` (if it uses shadows)
- `packages/components/Tooltip/Tooltip.tsx` (if it uses shadows)
- `packages/components/Toast/Toast.tsx` (if it uses shadows)
- Any other component files found to reference `shadowColor` or shadow tokens

## Acceptance Criteria
- `shadowColor` in the theme resolves to a dark color in both light and dark modes
- The 3 primary shadow levels (sm, md, lg) produce visually correct, dark shadows out of the box
- Brand configs can override shadow color, size, offset, and softness
- No component renders white/invisible shadows by default
