<!-- LAT: 2026-03-15T18:37:00Z -->
<!-- PID: $PPID -->
<!-- auto-queue -->
<!-- target-branch: chore/library-buildout/button-spec-test-audit -->
# Task: Restructure Button.test.tsx

Update `packages/components/Button/Button.test.tsx` to establish the canonical test template for all 55 components.

## Changes Required

### Structure: Nested Describes
Reorganize tests into fixed-vocabulary nested `describe` blocks:
```
describe('Button', () => {
  describe('Rendering', () => { ... })
  describe('Accessibility', () => { ... })
  describe('Keyboard', () => { ... })
  describe('Disabled & Loading', () => { ... })
  describe('Focus', () => { ... })
})
```

Keep ALL existing passing tests — just reorganize into these sections.

### Add Missing Tests

1. **Rendering section:**
   - `it('forwards ref to native button element')` — test ref.current is an HTMLButtonElement

2. **Accessibility section:**
   - `it('has disabled attribute when disabled prop is true')` — assert `toBeDisabled()`
   - `it('does not use aria-disabled when native disabled suffices')` — assert no aria-disabled attribute
   - Add comment: `// WCAG 2.4.7 — focus indicator: visual test (see playground)`

3. **Disabled & Loading section:**
   - `it('sets aria-busy and disabled when loading')` — compound state test

### Cleanup
- Remove the redundant `beforeAll(() => { ... ResizeObserver ... })` block — `jest.setup.js` already provides this globally
- Add comment on loading visibility test: `// Note: children hidden via visibility:hidden, queryByText returns null due to STL mock`

### Do NOT Add
- Visual state tests (hover colors, focus ring colors, lowMotion visual effects) — these belong in visual regression tooling
- Contrast ratio tests — system-level concern, not per-component

### Reference Files
- Read `packages/components/Button/Button.spec.md` section 9 for test requirements
- Read `packages/components/Button/Button.test.tsx` for current tests
- Read `packages/QUALITY_BASELINE.md` for quality requirements
- Read existing test patterns: check how other tests in packages/components/ are structured

## Checklist
- [ ] Read reference files
- [ ] Restructure into nested describes
- [ ] Add missing tests
- [ ] Cleanup redundant setup
- [ ] Run tests and verify all pass
