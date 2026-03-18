<!-- auto-queue -->
<!-- target-branch: feat/docs-site/theme-content-polish -->

# Commit History
- `617ef38` — fix(blocks): reduce login heading size, tighten spacing, add AuthFormActions
- `b748aba` — Merge q/003 into feat/docs-site/theme-content-polish

# Login Block Heading Size + Spacing Fixes

Stage 10 of docs-site epic (#79): Reduce login preview heading size, subtitle size, and add button spacing.

## Scope

- `packages/blocks/login/_shared.tsx`

## Instructions

### Fix 1 — Reduce heading size

In `AuthFormHeader` (line 51), change `fontSize="$6"` to `fontSize="$5"` for the title. Token `$6` is ~24px which is oversized for a login card. `$5` is ~20px which is more appropriate.

### Fix 2 — Tighten header group gap

In `AuthFormHeader` (line 49), the gap between title and subtitle/logo is `gap="$2"` (8px). Change to `gap="$1.5"` to tighten the header group, improving visual hierarchy.

### Fix 3 — Add AuthFormActions component for button spacing

The login blocks use a `YStack` with `gap="$4"` which spaces form inputs and the submit button equally. The button should have MORE spacing than inputs to create visual separation.

Add a new exported component to `_shared.tsx`:

```tsx
export function AuthFormActions({ children }: { children: ReactNode }) {
  return (
    <YStackJsx gap="$3" width="100%" paddingTop="$2">
      {children}
    </YStackJsx>
  )
}
```

This adds `paddingTop="$2"` (8px extra) above the button area. The `YStackJsx` cast is already defined in the file.

**Important:** Only modify `_shared.tsx`. Do NOT modify any individual login block files (Login01.tsx, Login02.tsx, etc.). The login blocks can adopt `AuthFormActions` in a later pass.

## Verification

- [ ] AuthFormHeader title uses `fontSize="$5"` (not `$6`)
- [ ] AuthFormHeader gap is `$1.5` (not `$2`)
- [ ] AuthFormActions component is exported from `_shared.tsx`
- [ ] AuthFormActions wraps children in a YStack with `gap="$3"` and `paddingTop="$2"`
- [ ] No TypeScript errors introduced
- [ ] Existing login block imports from `_shared` still work

## Task Progress
<!-- lat: 2026-03-02T17:54:31Z -->
<!-- agent-pid: 67544 -->
<!-- worktree: .worktrees/q-003 -->
<!-- branch: q/003 -->

### Checklist
- [ ] **ACTIVE** → Create worktree from target branch
- [ ] Reduce heading font size from $6 to $5
- [ ] Tighten header gap from $2 to $1.5
- [ ] Add AuthFormActions component
- [ ] Verify no TypeScript errors
- [ ] Merge and clean up

### Handoff Context
- Target branch: feat/docs-site/theme-content-polish
- Single file: packages/blocks/login/_shared.tsx
