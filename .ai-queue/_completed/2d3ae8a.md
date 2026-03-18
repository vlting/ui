<!-- auto-queue -->
<!-- target-branch: fix/docs-site/nav-layout-fixes -->

# Brand Switcher Fix

Stage 6 of Documentation Site epic (#72). Fix the brand config/theme switcher so it actually switches the active brand and theme across the docs site.

## Scope
- `examples/docs/components/brand-switcher.tsx`
- `examples/docs/components/providers.tsx`

## Instructions

### 1. Investigate Brand Switching Mechanism (`providers.tsx`)

Read `examples/docs/components/providers.tsx` carefully. The brand switching pipeline is:

1. `BrandProvider` stores the current brand name in state + localStorage
2. `TamaguiWrapper` reads the brand from `useBrand()` context
3. `TamaguiWrapper` calls `createBrandConfig(brandDefinition)` from `@vlting/ui` to get Tamagui config
4. `TamaguiWrapper` wraps children in `<Provider config={config}>`

**Diagnose the issue:**
- Check if `createBrandConfig` is actually imported and called correctly
- Check if the `brandMap` contains valid brand definitions for all 4 brands (default, shadcn, fun, posh)
- Check if the brand definitions actually exist in `@vlting/ui` — look at `src/brands/` for available exports
- Check if `createTamagui()` is called with the brand config result
- Check if the Tamagui `Provider` component's `config` prop is reactive — it may need a key change to force re-mount

**Common issues to check:**
- The Tamagui Provider may cache its config and not re-render when config changes. If so, add a `key={brand}` to force re-mount.
- The brand definitions may not exist or may be stubs (empty objects). Check what `@vlting/ui` actually exports from `src/brands/`.
- The docs site uses Tailwind CSS for most styling, not Tamagui tokens. The brand switch may work for Tamagui-rendered components but have no effect on Tailwind-styled elements.

### 2. Fix the Brand Switching (`providers.tsx`)

Based on your diagnosis, fix the issue. Common fixes:

**If Tamagui Provider doesn't re-render on config change:**
```tsx
// Add key to force re-mount when brand changes
<Provider config={config} defaultTheme={resolvedTheme} key={brand}>
  {children}
</Provider>
```

**If brand definitions don't exist in @vlting/ui:**
- Check `@vlting/ui` exports for brand-related items: `createBrandConfig`, `BrandDefinition`, `defaultBrand`, etc.
- If brand definitions are stubs, create minimal working brand definitions inline in `providers.tsx`
- Each brand should at minimum define different color palettes

**If Tailwind styling ignores brand changes:**
- The docs site's Tailwind-styled elements won't respond to Tamagui theme changes
- Consider extracting key theme values (primary color, accent, etc.) from the active Tamagui theme and setting them as CSS custom properties on the root element
- This bridges Tamagui's token system with Tailwind's CSS variable approach:
```tsx
useEffect(() => {
  const root = document.documentElement
  const theme = getThemeTokens(config) // extract relevant values
  root.style.setProperty('--brand-primary', theme.primary)
  root.style.setProperty('--brand-accent', theme.accent)
  // etc.
}, [brand, config])
```

### 3. Improve Brand Switcher UI (`brand-switcher.tsx`)

The brand switcher is currently a plain `<select>` element. Improve it:

- Keep the `<select>` element (it's accessible and functional) but style it better
- Add Tailwind classes for consistent styling with the rest of the header
- Consider showing the current brand name more prominently
- Add a visual transition when brand changes (e.g., brief fade or border flash on the select)
- Ensure the select is properly styled in both light and dark mode

### 4. Verify Brand Persistence

Ensure:
- Selected brand is saved to `localStorage` under the correct key
- On page reload, the saved brand is restored
- If no saved brand exists, default to 'default'

## Verification
- Changing brand in the switcher visibly changes the appearance of component previews
- Brand selection persists across page reloads
- All 4 brands (default, shadcn, fun, posh) are selectable and produce distinct visual results
- Brand switcher is properly styled in both light and dark mode
- No console errors when switching brands

## Task Progress
<!-- lat: 2026-03-02T13:58:55Z -->
<!-- agent-pid: 22715 -->
<!-- worktree: .worktrees/q-002 -->
<!-- branch: q/002 -->

### Checklist
- [x] Investigate brand switching mechanism (providers.tsx, brand-switcher.tsx, @vlting/ui exports)
- [x] Fix brand switching in providers.tsx
- [x] Improve brand switcher UI in brand-switcher.tsx
- [ ] **ACTIVE** → Commit, rebase, merge to fix/docs-site/nav-layout-fixes

### Handoff Context
- Target branch: fix/docs-site/nav-layout-fixes
- Root cause: TamaguiProvider caches config internally, needs `key={brand}` to force re-mount on brand change
- Added CSS custom property bridge (`--brand-*` variables) so Tailwind elements can react to brand changes
- Brand definitions are all correct and produce distinct palettes/tokens/fonts
- localStorage persistence was already correct in the original code
- Brand switcher UI improved with custom chevron, focus ring, flash transition on change
