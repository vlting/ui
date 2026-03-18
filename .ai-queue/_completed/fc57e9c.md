<!-- auto-queue -->
<!-- target-branch: feat/docs-site/theme-content-polish -->

# Commit History
- `782fa66` — fix(docs): improve code block contrast and copy button visibility
- `fc57e9c` — Merge q/001 into feat/docs-site/theme-content-polish

# Code Block Syntax Highlighting Contrast + Copy Button Visibility

Stage 10 of docs-site epic (#79): Fix code block light mode contrast and make copy button always visible.

## Scope

- `examples/docs/components/code-block.tsx`
- `examples/docs/components/copy-button.tsx`

## Instructions

### Issue 1 — Light mode syntax highlighting has insufficient contrast

The code block at `code-block.tsx` uses Shiki's `github-light` theme (line 19) for light mode. This theme produces very light grey text on white backgrounds, failing WCAG contrast requirements.

**Fix:** Change line 19 from `theme: 'github-light'` to a higher-contrast theme. Try these in order:
1. `'github-light-default'` — higher contrast variant of github-light
2. `'one-light'` — Atom One Light theme
3. `'vitesse-light'` — good contrast

Verify the theme exists in the installed Shiki version by checking `bundledThemes` from `shiki`. The dark mode theme (`github-dark`, line 24) is fine — don't change it.

**Fallback:** If none of the above themes are available, use a CSS override on the light-mode wrapper div (line 40-42). Add classes that boost contrast on syntax tokens:
```
[&_.line_span]:!opacity-100
```
Only use this as a last resort since it may reduce syntax color variety.

### Issue 2 — Copy button is invisible until hover

In `copy-button.tsx`, line 21, the button className includes `opacity-0 group-hover:opacity-100` which makes it invisible until hover. This is a discoverability issue and completely broken on touch devices.

**Fix:** Remove `opacity-0 group-hover:opacity-100` from the className. Make the button always visible with a subtle style:

```tsx
className="p-1.5 rounded-md text-foreground-secondary hover:text-foreground hover:bg-surface-muted transition-colors"
```

Use `text-foreground-secondary` for the default state and `hover:bg-surface-muted` for hover feedback. Keep the existing `aria-label` and icon swap behavior (copy → checkmark) unchanged.

## Verification

- [ ] Light mode code blocks show syntax-highlighted text with sufficient contrast (no light grey on white)
- [ ] Dark mode code blocks still look correct (unchanged)
- [ ] Copy button is visible without hovering
- [ ] Copy button copies code to clipboard when clicked
- [ ] Copy button shows checkmark feedback after clicking
- [ ] No TypeScript errors introduced

## Task Progress
<!-- lat: 2026-03-02T17:54:15Z -->
<!-- agent-pid: 67544 -->
<!-- worktree: .worktrees/q-001 -->
<!-- branch: q/001 -->

### Checklist
- [x] Create worktree from target branch
- [x] Fix light mode syntax highlighting theme in code-block.tsx
- [x] Fix copy button visibility in copy-button.tsx
- [x] Verify changes look correct
- [ ] **ACTIVE** → Merge and clean up

### Handoff Context
- Target branch: feat/docs-site/theme-content-polish
- Two files: code-block.tsx, copy-button.tsx
- Issue 1: change Shiki light theme for better contrast
- Issue 2: remove opacity-0/group-hover:opacity-100, make button always visible
