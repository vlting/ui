<!-- LAT: 2026-03-18T12:30:00Z -->
<!-- PID: $PPID -->
<!-- worktree: .worktrees/q-018 -->
<!-- branch: q-018 -->
<!-- auto-queue -->
<!-- depends-on: 016 -->
<!-- target-branch: feat/library-buildout/content-components -->

# Task: Add pill variant to Button.native.tsx

## Goal
Mirror the pill boolean variant on the native Button.

## Files
- `packages/components/Button/Button.native.tsx`

## Checklist
- [ ] Add `pill` to ButtonFrame's variant map: `pill: { true: { borderRadius: 9999 } }`
- [ ] Add `pill` to ButtonProps interface: `pill?: boolean`
- [ ] Pass `pill` prop through ButtonBase to ButtonFrame
- [ ] For icon size + pill, native borderRadius 9999 already produces a circle on a square element, so no special compound needed

## Constraints
- Native uses raw numbers, not tokens (existing pattern in this file)
- Do NOT change any existing variant behavior
