# Commit History
- 44d546c — fix(tokens): replace hardcoded pixel values in NavigationMenu, Combobox, Sidebar, Field
- 1fdbb43 — Merge branch 'q/002'

<!-- auto-queue -->
<!-- target-branch: fix/quality-audit -->

# Fix: Token Discipline — Navigation & Complex Components

Replace hardcoded numeric fontSize, padding, margin, and gap values with design tokens in navigation and complex interaction components.

## Scope
- `packages/components/NavigationMenu/NavigationMenu.tsx`
- `packages/components/Combobox/Combobox.tsx`
- `packages/components/Sidebar/Sidebar.tsx`
- `packages/components/Field/Field.tsx`

## Instructions

Read `AI_CONSTITUTION.md` and `DESIGN_CONSTITUTION.md` before starting.

### Token Reference

**Space tokens** (padding, margin, gap): $0.25=2, $0.5=4, $0.75=8, $1=10, $1.5=12, $2=16, $2.5=18, $3=20, $3.5=24, $4=28, $4.5=32
**Font size tokens**: $1=11, $2=12, $3=13, $4=14, $5=16, $6=18, $7=20, $8=24

### What to change

For each file, find ALL instances of:
- `fontSize={14}` → `fontSize="$4"`
- `fontSize={12}` → `fontSize="$2"`
- `fontSize={16}` → `fontSize="$5"`
- `fontSize={10}` → keep literal (no font token at 10)
- `padding={4}` → `padding="$0.5"`
- `padding={12}` → `padding="$1.5"`
- `padding={16}` → `padding="$2"`
- `padding={24}` → `padding="$3.5"`
- `paddingVertical={N}` / `paddingHorizontal={N}` → use matching space tokens
- `margin*={4}` → `margin*="$0.5"`
- `margin*={8}` → `margin*="$0.75"`
- `margin*={16}` → `margin*="$2"`
- `margin*={24}` → `margin*="$3.5"`
- `gap={2}` → `gap="$0.25"`
- `gap={4}` → `gap="$0.5"`
- `gap={8}` → `gap="$0.75"`

### Rules
1. Use exact token matches ONLY. Keep literals where no exact token exists.
2. Do NOT change values inside `style={{}}` on native HTML elements (tokens don't work there).
3. DO change values that are Tamagui props on Tamagui/cast components (ViewJsx, TextJsx, etc.).
4. Do NOT change opacity, flex, zIndex, or zero values.
5. Do NOT change focusVisibleStyle outlineWidth/outlineOffset.
6. Do NOT change borderRadius 999/1000/9999 (pill shapes).
7. Preserve visual behavior — pure token substitutions only.

## Verification
- `npx tsc --noEmit` passes
- No visual regressions

## Task Progress
<!-- lat: 2026-02-26T08:19:17Z -->
<!-- agent-pid: 52795 -->
<!-- worktree: .worktrees/q-002 -->
<!-- branch: q/002 -->

### Checklist
- [ ] **ACTIVE** → Create worktree from fix/quality-audit
- [ ] Tokenize NavigationMenu.tsx
- [ ] Tokenize Combobox.tsx
- [ ] Tokenize Sidebar.tsx
- [ ] Tokenize Field.tsx
- [ ] Verify tsc --noEmit passes
- [ ] Commit, rebase, merge, archive

### Handoff Context
- Target branch: fix/quality-audit
- Iteration 1 fix: components missed in initial segmentation
