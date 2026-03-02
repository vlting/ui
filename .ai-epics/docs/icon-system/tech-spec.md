---
epic: icon-system
saga: shadcn-parity
prd: .ai-sagas/docs/shadcn-parity/prd.md
created: 2026-03-01
---

# Tech Spec: Icon System (Remix Icon)

## Context

This epic addresses **FR-5 (Icon System)** from the shadcn-parity PRD. Epic 1 (Token Audit & Font System) is complete, providing the token foundation. Epic 2 (Component Parity) is complete, providing the full component set that will consume icons.

The existing codebase has:
- A generic `Icon` primitive (`packages/primitives/Icon.tsx`) that accepts any `IconFC`-compatible component
- `@tamagui/lucide-icons` (2.0.0-rc.14) as the current icon source (1,760 icons)
- `react-native-svg-web` in dependencies for cross-platform SVG rendering
- Tree-shakeable named-export patterns throughout

This epic adds the **full Remix Icon set** (2,800+ icons, filled + outline) as a generated icon module, tree-shakeable, theme-aware, and cross-platform.

## Architecture

### Strategy: Code Generation from SVG Source

Rather than depending on `@remixicon/react` (web-only, uses inline SVG DOM APIs) or `react-native-remix-icon` (potentially outdated, different API), we **generate our own React components** from the raw SVG data in the `remixicon` npm package.

This approach gives us:
- Full cross-platform control (web + React Native via `react-native-svg`)
- Consistent `IconFC` type conformance
- Tree-shakeable per-icon exports
- No runtime dependency on third-party icon wrappers
- Ability to apply our own size/color token integration

### Data Flow

```
remixicon (npm)          generate-icons.mjs          packages/icons/
┌──────────────┐         ┌──────────────────┐        ┌───────────────┐
│ icons/*.svg   │ ──────▶ │ Parse SVG paths  │ ────▶  │ Ri*.tsx (×2800)│
│ (raw SVG)    │         │ Generate .tsx     │        │ index.ts      │
└──────────────┘         │ Generate index    │        │ types.ts      │
                         │ Generate manifest │        │ manifest.json │
                         └──────────────────┘        └───────────────┘
```

### Module Structure

```
packages/icons/
├── index.ts              # Barrel export of all icons (tree-shakeable named exports)
├── types.ts              # IconFC type re-export, IconName union, IconCategory union
├── manifest.json         # Machine-readable icon registry (name, category, tags, variants)
├── createIcon.tsx        # Shared factory: SVG path data → React component
├── Icon.tsx              # Dynamic <Icon name="arrow-right" /> component
├── categories/           # Per-category barrel exports (optional tree-shaking boundary)
│   ├── arrows.ts
│   ├── business.ts
│   ├── communication.ts
│   └── ...
└── generated/            # Generated icon components (one file per icon pair)
    ├── RiArrowRightLine.tsx
    ├── RiArrowRightFill.tsx
    ├── RiHomeLine.tsx
    ├── RiHomeFill.tsx
    └── ...  (~2800 files)
```

### Component Architecture

#### `createIcon(pathData, displayName)` — Icon Factory

A minimal factory that produces an `IconFC`-compatible component from SVG path data:

```typescript
import { memo } from 'react'
import Svg, { Path } from 'react-native-svg'
import type { IconFC } from '../primitives'

export function createIcon(pathData: string, displayName: string): IconFC {
  const Icon = memo(({ size = 24, color = 'currentColor' }: { size?: number | string; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d={pathData} />
    </Svg>
  ))
  Icon.displayName = displayName
  return Icon as IconFC
}
```

Key decisions:
- Uses `react-native-svg` (`Svg`, `Path`) — works on both web (via `react-native-svg-web`) and React Native
- `memo` prevents unnecessary re-renders
- Default size 24 matches Remix Icon's viewBox (24×24)
- Default color `currentColor` inherits from parent text color on web; on RN, consumer must pass explicit color
- Each generated icon is a single function call: `export const RiArrowRightLine = createIcon('M13.172...', 'RiArrowRightLine')`

#### Generated Icon Component (per icon)

```typescript
// packages/icons/generated/RiArrowRightLine.tsx
import { createIcon } from '../createIcon'
export const RiArrowRightLine = createIcon(
  'M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2h12.172z',
  'RiArrowRightLine'
)
```

Each file exports exactly one icon. Tree-shakers eliminate unused icons completely.

#### Dynamic `<Icon />` Component

For runtime icon selection (e.g., icon name from a database):

```typescript
// packages/icons/Icon.tsx
import { lazy, Suspense } from 'react'
import type { IconFC } from '../primitives'
import type { IconName } from './types'

// Static import map (generated) — maps name to lazy-loaded component
const iconMap: Record<IconName, () => Promise<{ default: IconFC }>> = {
  'arrow-right-line': () => import('./generated/RiArrowRightLine').then(m => ({ default: m.RiArrowRightLine })),
  // ... all icons
}

export interface DynamicIconProps {
  name: IconName
  variant?: 'line' | 'fill'
  size?: number | string
  color?: string
  fallback?: React.ReactNode
}

export function DynamicIcon({ name, variant = 'line', size, color, fallback = null }: DynamicIconProps) {
  const key = `${name}-${variant}` as IconName
  const loader = iconMap[key]
  if (!loader) return null

  const LazyIcon = lazy(loader)
  return (
    <Suspense fallback={fallback}>
      <LazyIcon size={size} color={color} />
    </Suspense>
  )
}
```

**Trade-off:** The dynamic component uses lazy loading so the full icon map doesn't bloat the bundle. Consumers who know their icons at build time should use named imports instead.

### Naming Convention

Remix Icon uses this naming pattern:
- `ri-arrow-right-line` (outline variant)
- `ri-arrow-right-fill` (filled variant)

Our generated component names follow PascalCase:
- `RiArrowRightLine` (outline)
- `RiArrowRightFill` (filled)

The `Ri` prefix avoids collisions with existing Lucide icons (`ArrowRight` from Lucide vs `RiArrowRightLine` from Remix).

### Manifest (Machine-Readable Registry)

```json
{
  "version": "4.9.1",
  "count": 2800,
  "icons": [
    {
      "name": "arrow-right",
      "category": "arrows",
      "tags": ["direction", "next", "forward"],
      "variants": ["line", "fill"],
      "components": {
        "line": "RiArrowRightLine",
        "fill": "RiArrowRightFill"
      }
    }
  ],
  "categories": ["arrows", "buildings", "business", "communication", ...]
}
```

This manifest serves the MCP server (Epic 8) and docs site icon browser (Epic 6).

### Package Exports

Add to `package.json`:

```json
{
  "exports": {
    "./icons": {
      "types": "./packages/icons/index.ts",
      "import": "./packages/icons/index.ts"
    }
  }
}
```

Consumer usage:

```typescript
// Static import (tree-shakeable)
import { RiArrowRightLine, RiHomeFill } from '@vlting/ui/icons'

// With existing Icon primitive
import { Icon } from '@vlting/ui/primitives'
import { RiArrowRightLine } from '@vlting/ui/icons'
<Icon icon={RiArrowRightLine} size="$1" color="$color.gray11" />

// Dynamic import (runtime name resolution)
import { DynamicIcon } from '@vlting/ui/icons'
<DynamicIcon name="arrow-right" variant="line" size={20} />
```

### Integration with Existing Icon Primitive

The generated icons conform to `IconFC` (`ComponentType<{ size?: number | string; color?: string }>`), so they work directly with the existing `Icon` wrapper:

```typescript
import { Icon } from '@vlting/ui/primitives'
import { RiSettingsLine } from '@vlting/ui/icons'

<Icon icon={RiSettingsLine} size="$1" color="$color.blue9" />
```

No changes to the `Icon` primitive are needed.

### Coexistence with Lucide Icons

Lucide icons (`@tamagui/lucide-icons`) remain available. Both icon sets:
- Conform to `IconFC` type
- Are tree-shakeable
- Work with the `Icon` primitive

The `Ri` prefix on Remix icons prevents naming collisions. Consumers can use both:

```typescript
import { ArrowRight } from '@tamagui/lucide-icons'   // Lucide
import { RiArrowRightLine } from '@vlting/ui/icons'   // Remix
```

## Implementation Approach

### Stage 1: Code Generator & Icon Factory

1. Add `remixicon` as a **devDependency** (SVG source, not bundled)
2. Create `scripts/generate-icons.mjs`:
   - Read all SVGs from `node_modules/remixicon/icons/`
   - Parse SVG to extract `<path d="...">` data
   - Generate one `.tsx` file per icon using `createIcon()`
   - Generate `index.ts` barrel export
   - Generate `manifest.json`
   - Generate `types.ts` with `IconName` union type
3. Create `packages/icons/createIcon.tsx` factory
4. Run generator, verify output

### Stage 2: Dynamic Icon Component & Exports

1. Create `packages/icons/Icon.tsx` (DynamicIcon)
2. Add `./icons` export to `package.json`
3. Add category barrel exports
4. Wire into `src/index.ts` main barrel export
5. Verify tree-shaking: import 1 icon, check bundle doesn't include all 2800

### Stage 3: Tests, Accessibility & Documentation

1. Unit tests for `createIcon` factory
2. Unit tests for `DynamicIcon` component
3. Accessibility tests: verify `aria-hidden` default, `role="img"` when labeled
4. Cross-platform rendering verification
5. Write `Icon.spec.md` updates if needed
6. Bundle size validation (< 1KB per icon, no full-set bundling on single import)

## Dependencies

| Package | Type | Purpose |
|---------|------|---------|
| `remixicon` (4.9.x) | devDependency | SVG source files for code generation |
| `react-native-svg` | peerDependency | Cross-platform SVG rendering (already in project via Tamagui) |
| `react-native-svg-web` | dependency | Web bridge for react-native-svg (already in project) |

No new runtime dependencies. The `remixicon` package is dev-only (used by the generator script).

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| SVG path extraction fails for complex icons (multiple paths, transforms) | Some icons missing or broken | Generator handles multi-path SVGs by combining paths; add validation step that renders each icon and checks for empty output |
| 2800+ generated files slow down IDE/TypeScript | DX degradation | Generated files go in `generated/` subfolder; add to `.gitattributes` as generated; TypeScript project references can isolate the module |
| Bundle size bloat from barrel export | Large bundles for consumers who import from index | Tree-shaking verified with bundle analyzer; category sub-exports provide additional boundaries |
| `react-native-svg` version mismatch with Tamagui | Runtime crashes on RN | Use same version already in Tamagui's dependency tree; test on both platforms |
| Remix Icon license change (noted in 2026) | Legal risk | Verify current license terms; document license in generated files; `remixicon` 4.x uses Apache-2.0 compatible license |

## Acceptance Criteria

Derived from PRD FR-5:

- [ ] Full Remix Icon set available (~2,800 icons, filled + outline variants)
- [ ] Tree-shakeable imports: importing 1 icon bundles only that icon (< 1KB)
- [ ] Icons use theme color tokens via `color` prop (inherits `currentColor` on web)
- [ ] Icons scale with size prop (number or token string like `"$1"`)
- [ ] Cross-platform rendering: SVG on web (via react-native-svg-web), react-native-svg on RN
- [ ] `createIcon` factory produces `IconFC`-compatible components
- [ ] `DynamicIcon` component supports runtime name-based icon selection
- [ ] Machine-readable manifest (`manifest.json`) with icon names, categories, tags, variants
- [ ] `IconName` TypeScript union type for type-safe dynamic usage
- [ ] Existing `Icon` primitive works unchanged with Remix icons
- [ ] Coexists with `@tamagui/lucide-icons` (no naming collisions)
- [ ] Generator script is reproducible (`node scripts/generate-icons.mjs`)
