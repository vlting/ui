<!-- auto-queue -->
# Commit History
- `0564157` feat(brands): replace neon with three distinct brands — default, fun, posh
- `8fdde0d` chore(queue): complete task 002 — three brand definitions (default, fun, posh)

# Task 002: Create 3 Brand Definitions — default, fun, posh

## Objective
Replace the existing `defaultBrand` and `neonBrand` with three new brand definitions: **default**, **fun**, and **posh**. Each must produce a visually distinct, polished experience when applied through `createBrandConfig()`.

## Design Direction
All brands should follow the shadcn/ui philosophy: minimalist, neutral-first, with one or at most two ACCENT colors. Components should default to neutral styling; only specific variants (e.g., a "primary" button) use the accent color.

## Brand Specifications

### 1. `default` — Clean, trustworthy, minimalist
- **Accent color:** YInMn Blue (#2B5B9C range — a rich, slightly muted blue)
- **Neutrals:** Slightly cool (blue-tinted grays, not warm)
- **Spacing/sizing:** Balanced, standard — not too tight, not too loose
- **Radius:** Subtle rounding (4-8px default, not pill-shaped)
- **Borders:** Standard 1px borders where appropriate
- **Shadows:** Subtle, standard elevation shadows
- **Outline (focus):** Standard 2px offset ring in accent color
- **Default theme:** `light`
- **Typography:**
  - Heading: `Inter` or similar clean sans-serif, weight 600, tight letter-spacing
  - Body: `Inter` or similar, weight 400, standard letter-spacing
  - Mono: System monospace stack
  - Very minimalist — no transforms, no italic

### 2. `fun` — Playful, expressive, dark-first
- **Accent color:** Slightly pinkish purple (#9B59B6 / #A855F7 range)
- **Neutrals:** Slightly warm (warm grays with a hint of rose/amber)
- **Spacing:** Slightly more spaced out than default (~110-120% of default space values)
- **Sizing:** Slightly smaller than default (~90-95% of default size values)
- **Radius:** Generous rounding (12-16px default)
- **Borders:** NONE — completely flat, borderless design. Use `borderWidth: { none: 0, thin: 0, medium: 0, thick: 0 }`
- **Shadows:** Flat / no shadows (or extremely subtle, almost invisible)
- **Outline (focus):** Thicker (3-4px) and more offset (3-4px) ring — more visible/playful
- **Default theme:** `dark`
- **Typography:**
  - Heading: A minimalist serif font (e.g., `'DM Serif Display'`, `'Playfair Display'`, or `'Lora'`) — for titles and accent text
  - Body: Clean sans-serif (`'DM Sans'`, `'Nunito Sans'`, or `'Inter'`)
  - Mono: System monospace stack
  - No transforms

### 3. `posh` — Sophisticated, editorial, premium
- **Accent color:** Pure black (#000000) — buttons, links, active states all in black
- **Neutrals:** Balanced/true gray (no warm or cool tint)
- **Spacing:** Slightly larger than default (~110-115% of default space values)
- **Sizing:** Slightly larger than default (~105-110% of default size values)
- **Radius:** 0 — straight/square corners everywhere
- **Borders:** Very thin (0.5-1px), subtle, always present where structurally needed
- **Shadows:** Soft, diffused shadows (large blur, low opacity)
- **Outline (focus):** Very thin (1px), tight offset (1px) — elegant, not chunky
- **Default theme:** `light`
- **Typography:**
  - Heading: Sophisticated serif or transitional font (e.g., `'Cormorant Garamond'`, `'Libre Baskerville'`, or `'EB Garamond'`), weight 400-500, generous letter-spacing
  - Body: Clean, slightly editorial sans-serif (`'Inter'`, `'Karla'`, or `'Source Sans 3'`), weight 300-400
  - Mono: System monospace stack
  - No transforms, but lighter weights throughout for an airy feel

## Implementation

### Files to create/modify
- `packages/design-tokens/brands/default.ts` — rewrite with YInMn Blue accent brand
- `packages/design-tokens/brands/fun.ts` — new file (replacing `neon.ts`)
- `packages/design-tokens/brands/posh.ts` — new file
- `packages/design-tokens/brands/index.ts` — update exports (remove neonBrand, add funBrand, poshBrand)
- `src/index.ts` — update re-exports (remove neonBrand, add funBrand, poshBrand)

### Delete
- `packages/design-tokens/brands/neon.ts` — replaced by the new brands

### Palette construction
Each brand needs a 12-step palette for both light and dark modes. Follow the existing pattern (12 colors from lightest to darkest for light, reversed for dark). The palette steps map to semantic roles in Tamagui's theme builder:
- Steps 1-2: Backgrounds
- Steps 3-4: Subtle backgrounds / hover states
- Steps 5-6: Borders / separators
- Steps 7-8: Solid backgrounds (buttons, etc.)
- Steps 9-10: Solid hover states
- Steps 11-12: Text / high-contrast

For the accent palette (used for accent-colored components), create an `accentPalettes` entry with the brand's accent color as the primary hue.

### Font loading
Note: Web fonts (DM Serif Display, Cormorant Garamond, etc.) need to be loaded by the consuming app (e.g., via Google Fonts link in `index.html`). The brand definitions just specify the `family` string. Update the kitchen-sink example's `index.html` to load all required fonts.

## Verification
- `createBrandConfig(defaultBrand)` produces a valid Tamagui config
- `createBrandConfig(funBrand)` produces a valid Tamagui config
- `createBrandConfig(poshBrand)` produces a valid Tamagui config
- Kitchen-sink app renders with each brand and they look visually distinct
- TypeScript compiles without new errors
