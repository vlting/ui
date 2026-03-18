# Council Plan: Headless-to-Styled Bridge Pattern

**Date:** 2026-03-16
**Personas:** pragma, arch, dx, maint, perf

---

## Context

The `styled()` API now has `useHooks` and `mapProps`. The question: how should headless hooks (like a future `useButton`) integrate with `styled()` ergonomically?

Two options evaluated:
- **Option A (spread):** factory returns `{ useHooks, mapProps }`, spread into `styled()` options
- **Option B (wrapper):** factory wraps `styled()` entirely, hides it from call site

---

## Verdict: Option A (spread) — unanimous

All 5 personas chose Option A. Key reasons:

| Concern | Why Option A wins |
|---------|-------------------|
| **Dependency graph** | `headless` never imports `stl-react`. Option B violates this. |
| **API uniformity** | Every component file shows `styled('el', {...})`. One pattern to learn. |
| **Performance** | Zero overhead — static function refs spread at module scope. Option B adds per-render object allocation in composed `mapProps`. |
| **Type safety** | `S` flows through `StyledOptions` generics naturally. Option B must re-declare all 5 generics. |
| **Composability** | All options visible at one call site. Option B hides available options. |

### Usage pattern

```tsx
// packages/headless/src/styledButton.ts
export function styledButton() {
  return {
    useHooks: (props) => useButton(props),
    mapProps: (props, state) => ({ ...props, ...state.getButtonProps() }),
  }
}

// packages/components/Button/Button.tsx
const Button = styled('button', {
  stl: {...},
  ...styledButton(),
  ...props<{ loading?, prefix?, suffix? }>('loading', 'prefix', 'suffix'),
  template: ({ children, loading, prefix, suffix }, state) => ...,
  styleName: 'Button',
})
```

---

## Key Decisions

| Decision | Resolution | Attribution |
|----------|-----------|-------------|
| Option A vs B | **A (spread)** — unanimous | all 5 |
| Naming convention | `styledButton()`, `styledDisclosure()`, etc. No `use` prefix — avoids Rules of Hooks lint violations at module scope. | user + dx + pragma |
| Bridge location | In `headless` pkg, co-located with hooks. Returns plain functions, no stl-react import needed. | pragma + maint |
| Which components get bridges? | Only complex ones needing headless state (~15-20). Simple components (Alert, Loader, Progress) keep inline `mapProps`. | maint |
| `headless` must never depend on `stl-react` | Hard boundary. Bridge returns plain `{ useHooks, mapProps }` object — no styled types at runtime. | maint + perf (non-negotiable) |

---

## TypeScript S Inference Through Spread — VERIFIED

The arch persona raised a concern that `S` may not infer correctly when `{ useHooks, mapProps }` is spread into `styled()` options.

**Result: S inference works.** Tested 2026-03-16. TypeScript correctly:
- Infers `S` from `useHooks` return type through spread
- Threads `S` to `template` and `mapProps` state params
- Catches invalid property access on state (e.g., `state.nonExistent` errors)

No fallbacks needed. The spread pattern is type-safe as-is.

---

## Risk Summary

1. **S inference failure** — TS may not thread the hook return type through spread. Validate with type test.
2. **Prop-getter merge order** — `getButtonProps()` must not overwrite user event handlers. Bridge `mapProps` must spread user props after getter props.
3. **Premature abstraction** — No `useButton` hook exists yet. Ship the hook first, bridge when pattern proves itself on 2-3 components.

---

## Next Steps

1. Create `useButton` headless hook (prop-getter pattern)
2. Spike the S inference question with a type test
3. Build one bridge (`styledButton`), validate on Button component
4. If pattern holds, replicate for Disclosure, Tabs, etc.
