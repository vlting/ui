# Epic: Token Audit & Font System

- **Branch:** epic/token-audit-fonts
- **Feature flag:** token_audit_fonts
- **GitHub Issue:** #12
- **Epic PR:** #17
- **Created:** 2026-03-01
- **Status:** in-progress

- **Project Node ID:** PVT_kwDODxaco84BP_ab
- **Project Item ID:** PVTI_lADODxaco84BP_abzgmat3k
- **Status Field ID:** PVTSSF_lADODxaco84BP_abzg-PVjU
- **Status Options:** Planning=dfac620c, Todo=8001c035, In Progress=1078ddc4, Done=1949184c

## Stage 1: Font System Foundation
**Objective:** Define the BrandFontConfig type with 4 font slots, implement heading weight alternation, create FontLoader component, and integrate into the Provider.
**Estimated scope:** ~8 files, ~300 lines
**GitHub Sub-Issue:** #13
**Stage Branch:** feat/token-audit-fonts/font-system-foundation
**Stage PR:** #18 (merged)
**Board Item ID:** PVTI_lADODxaco84BP_abzgmat4o
**Acceptance criteria:**
- [x] BrandFontConfig type defined with heading, body, mono, quote slots
- [x] createBrandConfig() supports the new font structure
- [x] Heading weight alternation (h1 heavy, h2 light, h3 heavy, h4 light, h5 heavy, h6 light) implemented in font factory
- [x] FontLoader component created (web: Google Fonts link, RN: no-op)
- [x] Provider integrates FontLoader automatically
- [x] All 4 brand configs (default, shadcn, fun, posh) updated with new font structure
**Status:** complete
**Iterations:** 0

## Stage 2: Typography Component Migration
**Objective:** Rewrite Typography.tsx to use font tokens exclusively — zero hardcoded font families, sizes, or weights. Map heading levels to alternating weights.
**Estimated scope:** ~4 files, ~200 lines
**GitHub Sub-Issue:** #14
**Stage Branch:** feat/token-audit-fonts/typography-migration
**Stage PR:** #19 (merged)
**Board Item ID:** PVTI_lADODxaco84BP_abzgmat5c
**Acceptance criteria:**
- [x] H1–H6 use heading font with correct weight alternation
- [x] Blockquote uses quote font slot
- [x] InlineCode and Kbd use mono font slot
- [x] P, Lead, Large, Small, Muted use body font
- [x] Zero hardcoded font families, sizes, or weights in Typography.tsx
- [x] All Typography variants render correctly with each brand
**Status:** complete
**Iterations:** 0

## Stage 3: Component Token Audit — Dimensions & Spacing
**Objective:** Replace all hardcoded width/height, gap/margin/padding, borderRadius, and zIndex values across components with design tokens.
**Estimated scope:** ~20 files, ~150 lines changed
**GitHub Sub-Issue:** #15
**Stage Branch:** feat/token-audit-fonts/dimensions-spacing
**Stage PR:** (pending)
**Board Item ID:** PVTI_lADODxaco84BP_abzgmat58
**Acceptance criteria:**
- [ ] All hardcoded width/height values replaced with size tokens
- [ ] All hardcoded gap/margin/padding values replaced with space tokens
- [ ] All hardcoded borderRadius values replaced with radius tokens
- [ ] All hardcoded zIndex values replaced with zIndex tokens
- [ ] Semantic size tokens defined where needed (sidebar, drawer, dialog widths)
- [ ] All existing tests pass after migration
**Status:** executing
**Iterations:** 0

## Stage 4: Component Token Audit — Typography & Shadows
**Objective:** Replace all remaining hardcoded fontSize, fontWeight, lineHeight, fontFamily, and shadow values with font and theme tokens. Final audit pass.
**Estimated scope:** ~12 files, ~100 lines changed
**GitHub Sub-Issue:** #16
**Stage Branch:** (pending)
**Stage PR:** (pending)
**Board Item ID:** PVTI_lADODxaco84BP_abzgmat7A
**Acceptance criteria:**
- [ ] All hardcoded fontSize/fontWeight/lineHeight values replaced with font tokens
- [ ] All hardcoded fontFamily references replaced with config font tokens
- [ ] All hardcoded shadow offsets replaced with theme shadow tokens
- [ ] Final grep audit finds zero remaining hardcoded visual values
- [ ] Each brand (default, shadcn, fun, posh) renders correctly
- [ ] All existing tests pass
**Status:** pending
**Iterations:** 0
