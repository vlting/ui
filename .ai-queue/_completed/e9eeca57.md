<!-- LAT: 2026-03-11T03:44:24Z -->
<!-- PID: 77812 -->
<!-- auto-queue -->
<!-- target-branch: fix/theme-overhaul/hardcoded-value-audit -->
# Task: Replace hardcoded values in Block components

Replace all hardcoded hex colors, pixel values, and font sizes in block components with CSS variable references.

## Target branch
`fix/theme-overhaul/hardcoded-value-audit`

## Files to modify (ONLY these files)
- `packages/blocks/auth/_shared.tsx`
- `packages/blocks/auth/AuthBlock.tsx`
- `packages/blocks/hero/HeroBlock.tsx`
- `packages/blocks/pricing/PricingBlock.tsx`
- `packages/blocks/chat-interface/ChatInterfaceBlock.tsx`
- `packages/blocks/onboarding-wizard/OnboardingWizardBlock.tsx`
- `packages/blocks/notification-center/NotificationCenterBlock.tsx`
- `packages/blocks/file-upload/FileUploadBlock.tsx`
- `packages/blocks/feed/FeedBlock.tsx`
- `packages/blocks/dashboard/DashboardBlock.tsx`
- `packages/blocks/empty-state/EmptyStateBlock.tsx`
- `packages/blocks/settings/SettingsBlock.tsx`
- `packages/blocks/sidebar/_shared.tsx` (if it exists)

## CSS Variable Convention
Blocks use inline `style` props. Replace hardcoded values with CSS var references:
- Colors: `var(--color10)` (already used in some places), `var(--background)`, `var(--borderColor)`, `var(--color8)`
- Spacing: Use the STL space scale values directly as numbers (blocks use numeric style values)

### Space scale reference (from design-tokens/base.ts):
```
space[0] = 0, space[0.25] = 2, space[0.5] = 4, space[0.75] = 8,
space[1] = 10, space[1.5] = 12, space[2] = 16, space[2.5] = 18,
space[3] = 20, space[3.5] = 24, space[4] = 28, space[4.5] = 32,
space[5] = 36, space[6] = 40, space[7] = 48, space[8] = 56
```

## What to replace

### auth/_shared.tsx
- `color: 'var(--color10, #0066ff)'` → `color: 'var(--color10)'` (remove hex fallback)
- `padding: '24px'` → `padding: 24` (number; maps to space[3.5])
- `gap: '6px'` → `gap: 6`
- `fontSize: '18px'` → `fontSize: 18`
- `fontSize: '14px'` → `fontSize: 14`
- `fontSize: '12px'` → `fontSize: 12`

### hero/HeroBlock.tsx
- `padding: 32` → keep (maps to space[4.5])
- `gap: 16` → keep (maps to space[2])
- `minHeight: 400` → keep (layout-specific)
- `fontSize: 12, 48, 18, 36` → keep as numbers (font sizing)
- `backgroundColor: 'rgba(0,0,0,0.5)'` → `backgroundColor: 'var(--overlay, rgba(0,0,0,0.5))'` — use overlay token if available, or define as `color: 'rgba(0,0,0,0.5)'`
- `color: 'white'` → `color: '#fff'` or `color: 'var(--color1)'` if it's meant to be white-on-dark
- `color: 'rgba(255,255,255,0.85)'` → keep as-is (intentional opacity on white text in overlay context)

### pricing/PricingBlock.tsx
- `gap: 16, 12, 8, 6, 4` → keep as numbers (already map to space scale)
- `padding: 16, 20` → keep as numbers
- `fontSize: 24, 16, 12, 36, 14` → keep as numbers

### chat-interface/ChatInterfaceBlock.tsx
- `color: 'var(--color10, #0066ff)'` → `color: 'var(--color10)'`
- `color: 'var(--colorError, #ef4444)'` → `color: 'var(--colorError)'`
- `gap: 8` → keep
- `padding: 12` → keep
- `borderTop: '1px solid var(--borderColor, #e5e7eb)'` → `borderTop: '1px solid var(--borderColor)'`

### onboarding-wizard/OnboardingWizardBlock.tsx
- `var(--color10, #0066ff)` → `var(--color10)` (remove hex fallback)
- All `gap`, `padding`, `fontSize` numeric values → keep as numbers

### notification-center/NotificationCenterBlock.tsx
- `var(--background2, rgba(0,0,0,0.02))` → `var(--background2)` (remove fallback)
- `boxShadow: 'var(--shadow5, 0 4px 24px rgba(0,0,0,0.12))'` → `boxShadow: 'var(--shadow5)'`

### file-upload/FileUploadBlock.tsx
- `var(--background2, rgba(0,0,0,0.02))` → `var(--background2)`
- Other rgba fallbacks → remove fallback values from CSS var references

### feed/FeedBlock.tsx
- `var(--color10, #0066ff)` → `var(--color10)`
- `#d1d5db` → `var(--borderColor)` or `var(--color4)`
- `var(--borderColor, #e5e7eb)` → `var(--borderColor)`

### dashboard/DashboardBlock.tsx
- `fontSize: '24px'` → `fontSize: 24`
- `fontSize: '16px'` → `fontSize: 16`
- `padding: 16` → keep

### empty-state/EmptyStateBlock.tsx
- `fontSize: '20px'` → `fontSize: 20`

### settings/SettingsBlock.tsx
- Check for any hardcoded values and fix

## Key principles
- **Remove hex fallbacks from CSS var references** — the vars WILL be defined at runtime
- **Keep numeric spacing/fontSize values** — they already map to the scale, and blocks use React Native-compatible numeric styles
- **String px values (`'24px'`)** → convert to numbers (`24`)
- **Direct hex colors not in var()** → wrap in `var(--{semanticToken})`
- **rgba overlay colors in hero** — these are intentional for overlay effects, can keep
- **Do NOT touch .native.tsx files.**

## Acceptance criteria
- No remaining hardcoded hex color literals (except in rgba() overlay patterns for hero)
- All CSS var fallbacks with hex values removed (just `var(--token)` not `var(--token, #hex)`)
- String px values converted to numbers where used as React style values
- Build succeeds: `npx tsc --noEmit`