<!-- auto-queue -->
<!-- target-branch: fix/quality-audit -->

# Fix: Token Discipline — Typography & NativeSelect (styledHtml configs)

Replace hardcoded numeric fontSize, padding, and height values with design tokens in Typography and NativeSelect styledHtml configs.

## Scope
- `packages/components/Typography/Typography.tsx`
- `packages/components/NativeSelect/NativeSelect.tsx`

## Instructions

Read `AI_CONSTITUTION.md` and `DESIGN_CONSTITUTION.md` before starting.

### Token Reference

**Space tokens** (padding, margin, gap): $0.25=2, $0.5=4, $0.75=8, $1=10, $1.5=12, $2=16, $2.5=18, $3=20, $3.5=24, $4=28, $4.5=32
**Size tokens** (width, height): $0.25=2, $0.5=4, $0.75=8, $1=20, $1.5=24, $2=28, $2.5=32, $3=36, $3.5=40, $4=44, $4.5=48
**Font size tokens**: $1=11, $2=12, $3=13, $4=14, $5=16, $6=18, $7=20, $8=24

### What to change

#### Typography.tsx (styledHtml configs)
These are ALL in styledHtml config objects (tokens DO work there):
- `fontSize: 24,` → `fontSize: '$8',`
- `fontSize: 20,` → `fontSize: '$7',`
- `fontSize: 18,` → `fontSize: '$6',`
- `fontSize: 16,` → `fontSize: '$5',`
- `fontSize: 14,` → `fontSize: '$4',`
- `paddingLeft: 16,` → `paddingLeft: '$2',`
- `paddingLeft: 4,` → `paddingLeft: '$0.5',`
- `paddingRight: 4,` → `paddingRight: '$0.5',`
- `paddingTop: 2,` → `paddingTop: '$0.25',`
- `paddingBottom: 2,` → `paddingBottom: '$0.25',`
- `paddingLeft: 24,` → `paddingLeft: '$3.5',`

#### NativeSelect.tsx (styledHtml config)
These are ALL in a styledHtml `variants.size` config:
- sm variant: `height: 32,` → `height: '$2.5',` | `paddingLeft: 10,` → `paddingLeft: '$1',` | `paddingRight: 28,` → `paddingRight: '$4',` | `fontSize: 13,` → `fontSize: '$3',`
- md variant: `height: 36,` → `height: '$3',` | `paddingLeft: 12,` → `paddingLeft: '$1.5',` | `paddingRight: 32,` → `paddingRight: '$4.5',` | `fontSize: 14,` → `fontSize: '$4',`
- lg variant: `height: 40,` → `height: '$3.5',` | `fontSize: 14,` → `fontSize: '$4',`
- lg paddingLeft: 14 → keep literal (no exact space token)
- lg paddingRight: 36 → keep literal (no exact space token)

### Rules
1. Use exact token matches ONLY. Keep literals where no exact token exists.
2. These are all styledHtml config objects — tokens DO work there.
3. Do NOT change opacity, flex, zIndex, or zero values.
4. Do NOT change focusVisibleStyle outlineWidth/outlineOffset.
5. Preserve visual behavior — pure token substitutions only.

## Verification
- `npx tsc --noEmit` passes
- No visual regressions

## Task Progress
<!-- lat: 2026-02-26T09:15:00Z -->
<!-- agent-pid: $PPID -->
<!-- worktree: .worktrees/q-001 -->
<!-- branch: q/001 -->

### Checklist
- [ ] **ACTIVE** → Tokenize Typography.tsx
- [ ] Tokenize NativeSelect.tsx
- [ ] Verify tsc passes
- [ ] Commit, rebase, merge, archive
