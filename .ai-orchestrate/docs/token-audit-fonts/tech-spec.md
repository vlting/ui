---
epic: token-audit-fonts
saga: shadcn-parity
prd: .ai-sagas/docs/shadcn-parity/prd.md
created: 2026-03-01
---

# Tech Spec: Token Audit & Font System

## Context

This epic addresses **FR-6** (Google Fonts System) and **FR-11** (Token-Based Styling) from the saga PRD. It is the foundational epic — every subsequent epic (component parity, icons, charts, blocks, docs, AI skill, MCP) depends on a clean token layer and the font system being in place.

**Current state:**
- Token scales exist for size, space, radius, zIndex, borderWidth, color
- 3 font slots defined (heading, body, mono) — missing "quote" slot
- No Google Fonts integration (system fonts only)
- No heading weight alternation (h1–h6 all use similar weights)
- **40+ hardcoded visual values** scattered across components (see audit below)

## Architecture

### Font System

#### Font Slot Configuration

Extend the brand config to support 4 font slots with Google Fonts:

```typescript
// packages/design-tokens/brands/types.ts
interface BrandFontConfig {
  heading: {
    family: string          // Google Font name, e.g. 'Playfair Display'
    fallback?: string       // System fallback stack
    weights: {
      heavy: number         // For h1, h3, h5 (default: 700)
      light: number         // For h2, h4, h6 (default: 300)
    }
  }
  body: {
    family: string
    fallback?: string
    weight: number          // Default body weight (default: 400)
  }
  mono: {
    family: string
    fallback?: string
    weight: number          // Default mono weight (default: 400)
  }
  quote: {
    family: string
    fallback?: string
    weight: number          // Default quote weight (default: 300)
    style?: 'normal' | 'italic'  // Default: 'italic'
  }
}
```

#### Heading Weight Alternation

The `createBrandConfig()` factory must map heading levels to weights:

```typescript
// Automatic weight mapping for h1–h6
const headingWeights = {
  h1: fonts.heading.weights.heavy,   // e.g. 700
  h2: fonts.heading.weights.light,   // e.g. 300
  h3: fonts.heading.weights.heavy,   // e.g. 700
  h4: fonts.heading.weights.light,   // e.g. 300
  h5: fonts.heading.weights.heavy,   // e.g. 700
  h6: fonts.heading.weights.light,   // e.g. 300
}
```

This maps into the Tamagui font weight scale used by the heading font:
- Weight key 1 → h6 weight (light)
- Weight key 2 → h5 weight (heavy)
- Weight key 3 → h4 weight (light)
- Weight key 4 → h3 weight (heavy)
- Weight key 5 → h2 weight (light)
- Weight key 6 → h1 weight (heavy)

#### Google Fonts Loading

**Web (React DOM):**
Create a `FontLoader` component that injects a `<link>` tag for Google Fonts:

```typescript
// packages/utils/fontLoader.ts
function getGoogleFontsUrl(fonts: BrandFontConfig): string {
  // Build URL: https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&...
  // Include all weights used by the brand config
}

// packages/provider/FontLoader.tsx
function FontLoader({ fonts }: { fonts: BrandFontConfig }) {
  // On web: inject <link rel="stylesheet" href={googleFontsUrl} />
  // On RN: no-op (consumer handles font loading via expo-font or bundling)
}
```

**React Native:**
Provide a `loadFonts()` utility that works with `expo-font`:

```typescript
// packages/utils/loadFonts.native.ts
async function loadFonts(fonts: BrandFontConfig): Promise<void> {
  // Uses expo-font to load from Google Fonts CDN or bundled assets
  // Returns a promise that resolves when fonts are ready
}
```

The Provider component should integrate FontLoader automatically when a brand config includes fonts.

### Token Audit

#### Hardcoded Values Found (40+ instances)

**Category 1: Dimensions (replace with size tokens)**
| Component | Value | Replacement |
|-----------|-------|-------------|
| Avatar.tsx | `width: 56, height: 56` (lg) | `size: '$6'` (64) or define `$avatar.lg` |
| Avatar.tsx | `width: 72, height: 72` (xl) | `size: '$7'` (74) or define `$avatar.xl` |
| Alert.tsx | `width: 16, height: 16` (icon) | `size: '$0.75'` (8) — or `$1` (20) if 16px intended |
| Dialog.tsx | `400, 500, 640` (max-widths) | Define `$dialog.sm`, `$dialog.md`, `$dialog.lg` size tokens |
| Sidebar.tsx | `width: 256` | Define `$sidebar.width` token |
| Drawer.tsx | `width: 360` | Define `$drawer.width` token |
| Drawer.tsx | `maxHeight: '90vh'` | Keep (viewport-relative is acceptable) |

**Category 2: Typography (replace with font tokens)**
| Component | Value | Replacement |
|-----------|-------|-------------|
| Typography.tsx H1 | `fontSize: 36, lineHeight: 44, fontWeight: '700'` | Use `$heading` font token with size scale |
| Typography.tsx H2 | `fontSize: 30, lineHeight: 38, fontWeight: '600'` | Use `$heading` font token with size scale |
| Typography.tsx H3 | `fontSize: $8` (mixed!) | Already partial — complete migration |
| Typography.tsx P | `lineHeight: 28` | Use `$body` font lineHeight scale |
| Kbd.tsx | `fontSize: 11, fontSize: 12` | Use `$mono` font token size scale |
| InlineCode | `fontFamily: 'ui-monospace...'` hardcoded | Use `$mono` font family from config |

**Category 3: Z-Index (replace with zIndex tokens)**
| Component | Value | Replacement |
|-----------|-------|-------------|
| DatePicker.tsx | `zIndex: 100` | `zIndex: '$1'` (100) |
| Dialog.tsx | `zIndex: 50, 51` | Define `$overlay` (50) and `$modal` (51) zIndex tokens |
| Tooltip.tsx | `zIndex: 1000` | Define `$tooltip` zIndex token or use `$5` (500) |
| HoverCard.tsx | `zIndex: 50` | `zIndex: '$1'` or `$overlay` |

**Category 4: Border Radius (replace with radius tokens)**
| Component | Value | Replacement |
|-----------|-------|-------------|
| Avatar.tsx | `borderRadius: 1000` | `borderRadius: '$12'` (pill/circle: 9999) or `borderRadius: 1000000` (circle) |
| Carousel.tsx | `borderRadius: 9999` | `borderRadius: '$12'` |
| RadioGroup.tsx | `borderRadius: 1000` | `borderRadius: '$12'` |
| Breadcrumb.tsx | `borderRadius: 2` | `borderRadius: '$1'` (3) |

**Category 5: Spacing (replace with space tokens)**
| Component | Value | Replacement |
|-----------|-------|-------------|
| Checkbox.tsx | `gap: 8` (inline) | `gap: '$0.75'` (8) |
| RadioGroup.tsx | `gap: 8` (inline) | `gap: '$0.75'` (8) |
| Sidebar.tsx | `margin: 8` (inline) | `margin: '$0.75'` (8) |

**Category 6: Shadows (keep or tokenize)**
| Component | Value | Replacement |
|-----------|-------|-------------|
| Dialog.tsx | `shadowOffset: { width: 0, height: 16 }` | Use shadow token from theme |
| ContextMenu.tsx | `shadowOffset: { width: 0, height: 4 }` | Use shadow token from theme |
| AlertDialog.tsx | `shadowOffset: { width: 0, height: 16 }` | Use shadow token from theme |

### New Token Definitions Needed

Add semantic token aliases for component-specific dimensions:

```typescript
// packages/design-tokens/base.ts — additions to size tokens
const componentSizes = {
  // These are semantic aliases, not new scale positions
  '$sidebar.width': 256,
  '$drawer.width': 360,
  '$dialog.sm': 400,
  '$dialog.md': 500,
  '$dialog.lg': 640,
}
```

**Note:** Tamagui v2 may not support dotted token names. If not, use `$sidebarWidth`, `$drawerWidth`, etc. Or define them as part of the brand config's size overrides.

Add zIndex tokens for overlay layers:

```typescript
// packages/design-tokens/base.ts — extend zIndex
const zIndex = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
  // Add semantic overlay layers
  6: 1000,  // tooltip level
}
```

## Implementation Approach

### Stage 1: Font System Foundation
1. Define `BrandFontConfig` type with 4 font slots
2. Add `quote` font slot to `createBrandConfig()` factory
3. Implement heading weight alternation (h1 heavy → h6 light) in the font factory
4. Update shadcn and default brand configs with the new font structure
5. Create `FontLoader` component (web: Google Fonts `<link>`, RN: no-op)
6. Integrate FontLoader into the Provider

### Stage 2: Typography Component Migration
1. Rewrite Typography.tsx to use font tokens exclusively (zero hardcoded px)
2. Map H1–H6 to heading font with correct weight alternation
3. Map Blockquote to quote font
4. Map InlineCode/Kbd to mono font
5. Map P/Lead/Large/Small/Muted to body font
6. Verify all Typography variants render correctly with each brand

### Stage 3: Component Token Audit — Dimensions & Spacing
1. Fix all hardcoded width/height values → size tokens
2. Fix all hardcoded gap/margin/padding values → space tokens
3. Fix all hardcoded borderRadius values → radius tokens
4. Fix all hardcoded zIndex values → zIndex tokens
5. Define new semantic size tokens where needed (sidebar, drawer, dialog)
6. Run all existing tests to verify no regressions

### Stage 4: Component Token Audit — Typography & Shadows
1. Fix hardcoded fontSize/fontWeight/lineHeight in remaining components (Kbd, etc.)
2. Fix hardcoded fontFamily references → use config font tokens
3. Fix hardcoded shadow offsets → use theme shadow tokens
4. Add lint rule or grep-based check to catch future hardcoded values
5. Final audit pass: grep for any remaining hardcoded visual values
6. Update brand configs if any new tokens were needed

## Dependencies

- `@tamagui/core` 2.0.0-rc.14 (existing)
- `@tamagui/theme-builder` (existing)
- No new external packages needed for font loading (web: native `<link>`, RN: expo-font is a peer dep)

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Tamagui v2 RC may not support all token reference patterns | Test each token reference pattern before bulk migration. Use `$` prefix consistently. |
| Font token mapping may not align with Tamagui's `createFont()` weight scale | Map h1–h6 to specific weight keys (1–6) in createFont. Verify with test renders. |
| Changing size/space values may cause visual regressions | Map hardcoded values to the nearest token value. Some values may not have an exact match — add new token scale positions if needed. |
| Google Fonts `<link>` injection may cause FOUC (flash of unstyled content) | Use `font-display: swap` in the Google Fonts URL. Document the FOUC trade-off. |
| Component tests may break after token migration | Run full test suite after each stage. Fix tests that assert specific pixel values. |

## Acceptance Criteria

- [ ] 4 font slots (heading, body, mono, quote) configurable per brand
- [ ] Google Fonts loaded automatically on web based on brand config
- [ ] Heading weight alternation h1→h6 (heavy/light/heavy/light/heavy/light) works automatically
- [ ] Font size scale predefined and overridable per brand
- [ ] Typography components use font tokens exclusively (zero hardcoded families/sizes/weights)
- [ ] Zero hardcoded color values in any component
- [ ] Zero hardcoded spacing/padding/margin values (space tokens used)
- [ ] Zero hardcoded border-radius values (radius tokens used)
- [ ] Zero hardcoded font-size/weight values (font tokens used)
- [ ] Zero hardcoded zIndex values (zIndex tokens used)
- [ ] All existing tests pass after migration
- [ ] Each brand (default, shadcn, fun, posh) renders correctly after changes
