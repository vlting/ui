# Commit History
- fd3523a — fix(tokens): replace hardcoded pixel values with design tokens in Alert, Empty, Progress
- fdf684f — Merge branch 'q/003' — token discipline for feedback components

<!-- target-branch: fix/quality-audit -->

# Segment 3: Token Discipline — Feedback Components

Replace hardcoded numeric values with design tokens in feedback/status components.

## Scope
- `packages/components/Alert/Alert.tsx`
- `packages/components/Empty/Empty.tsx`
- `packages/components/Progress/Progress.tsx`

## Instructions

Read `AI_CONSTITUTION.md` and `DESIGN_CONSTITUTION.md` before starting.

### Token Reference

**Size tokens** (width, height): $0.25=2, $0.5=4, $0.75=8, $1=20, $1.5=24, $2=28, $2.5=32, $3=36, $3.5=40, $4=44, $4.5=48
**Space tokens** (padding, margin, gap): $0.25=2, $0.5=4, $0.75=8, $1=10, $1.5=12, $2=16, $2.5=18, $3=20, $3.5=24, $4=28, $4.5=32
**Font size tokens**: $1=11, $2=12, $3=13, $4=14, $5=16, $6=18, $7=20, $8=24

### Alert.tsx
- icon `width: 16, height: 16` → keep as literal (no size token at 16)
- `marginTop: 2` → `marginTop: '$0.25'`

### Empty.tsx
- `fontSize: 18` (icon) → `fontSize: '$6'`
- `paddingTop={32}` → `paddingTop="$4.5"`
- `paddingBottom={32}` → `paddingBottom="$4.5"`
- `paddingLeft={24}` → `paddingLeft="$3.5"`
- `paddingRight={24}` → `paddingRight="$3.5"`
- `gap={12}` → `gap="$1.5"`
- `marginBottom={4}` → `marginBottom="$0.5"`
- `fontSize={14}` → `fontSize="$4"`
- `maxWidth: 400` → keep literal (no size token at 400)
- `marginTop={4}` → `marginTop="$0.5"`

### Progress.tsx
- `SIZE_HEIGHT`: `sm: 4` → `'$0.5'`, `md: 8` → `'$0.75'`, `lg: 12` → keep literal (no size token at 12)
- Note: Map values that become tokens are strings. Ensure types accommodate `string | number`.

## Rules
1. Use exact token matches ONLY. Keep literals where no exact token exists.
2. Do NOT change opacity, flex, zIndex, or zero values.
3. Do NOT change focusVisibleStyle outlineWidth/outlineOffset.
4. Preserve visual behavior — pure token substitutions only.
5. When map values change from numbers to strings, update TypeScript types accordingly.

## Verification
- `npx tsc --noEmit` passes
- `yarn lint` passes
- No visual regressions in Alert, Empty, and Progress components

## Task Progress
<!-- lat: 2026-02-26T08:11:12Z -->
<!-- agent-pid: 52795 -->
<!-- worktree: .worktrees/q-003 -->
<!-- branch: q/003 -->

### Checklist
- [x] Create worktree from fix/quality-audit
- [x] Read AI_CONSTITUTION.md and DESIGN_CONSTITUTION.md
- [x] Tokenize Alert.tsx
- [x] Tokenize Empty.tsx
- [x] Tokenize Progress.tsx
- [ ] **ACTIVE** → Verify tsc --noEmit passes
- [ ] Verify yarn lint passes
- [ ] Commit, rebase, merge, archive

### Handoff Context
- Target branch: fix/quality-audit
- 3 files to modify: Alert.tsx, Empty.tsx, Progress.tsx
