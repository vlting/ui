# TODO: Theme-Driven Button Shadows

## Context
Button has no shadows today — all visual weight is color-only (bg, text, border, outline). The shadow token system (`$sm`→`$2xl`) already exists, is theme-overridable, and supports light/dark via CSS variables. Goal: let consumers control button elevation purely through their theme.

## Steps

1. **Add `buttonShadow` + `buttonShadowHover` to shadow scale** (`packages/stl/src/config/scales/shadow.ts`)
   - Two new vars, both defaulting to `none` in light and dark

2. **Extend `ShadowScale` type** (`packages/stl/src/shared/models/theme.models.ts`)
   - Add optional `buttonShadow?: ShadowToken` and `buttonShadowHover?: ShadowToken`

3. **Wire defaults in theme presets** (`packages/stl/src/theme/presets.ts`)
   - Both light/dark shadows get `buttonShadow` and `buttonShadowHover` defaulting to `{ boxShadow: 'none', color: 'transparent' }`

4. **Add shadow to Button base stl** (`packages/components/Button/Button.tsx`)
   - `boxShadow: '$buttonShadow'` in base stl
   - `':interact': { boxShadow: '$buttonShadowHover' }`
   - `transition: 'box-shadow 150ms ease'` + `lowMotion: { transition: 'none' }`
   - Default `none` → zero visual change

5. **Set shadow values in playground theme presets** (`config/themes/index.ts`)
   - Flat: hard-edge idle + slightly larger on hover
   - Pro: soft idle + deeper on hover
   - Sharp: `none`

6. **Update Button spec** (`packages/components/Button/Button.spec.md`)

## Files
- `packages/stl/src/config/scales/shadow.ts`
- `packages/stl/src/shared/models/theme.models.ts`
- `packages/stl/src/theme/presets.ts`
- `packages/components/Button/Button.tsx`
- `config/themes/index.ts`
- `packages/components/Button/Button.spec.md`

## Verification
- Default theme: buttons have no shadow (visual parity with today)
- Flat/Pro: buttons show themed shadows with hover transition
- Dark mode: shadows adapt automatically
- `lowMotion`: no transition
