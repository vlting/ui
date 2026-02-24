# Epic: Add Focus Indicators to Kitchen-Sink Navigation

- **Feature branch:** feat/focus-indicators
- **GitHub Issue:** #1
- **Created:** 2026-02-23
- **Status:** in-review

## Stage 1: Add focus ring to BrandLayout navigation elements
**Objective:** Add focusVisibleStyle to interactive navigation elements in BrandLayout.tsx that currently lack visible focus indicators (sidebar links, header buttons, brand/theme toggles).
**Estimated scope:** ~1 file, ~20 lines
**Acceptance criteria:**
- [ ] All interactive elements in BrandLayout have focusVisibleStyle
- [ ] Focus ring uses the standard pattern: outlineWidth 2, outlineOffset 1, outlineColor $color10
- [ ] Keyboard tab navigation shows visible focus on all nav elements
**Status:** complete
**Iterations:** 0
**PR:** #2
