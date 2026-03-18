# Commit History
- f6a9db4 — fix(flags): improve ENV resolution and fix overrides index type
- b8bd42e — merge q/004 into fix/quality-audit

<!-- auto-queue -->
# Update ENV resolution in config/flags.ts

## Scope
- **Modifies**: `config/flags.ts`

## Instructions

The `const ENV` derivation currently falls back to a binary `NODE_ENV` check that can only produce `'prod'` or `'dev'` — there is no pathway to `'staging'` unless `APP_ENV` is explicitly set. Update the resolution logic so that `staging` is reachable from `NODE_ENV` as well.

Replace the current `ENV` derivation:

```ts
const ENV: Environment =
  (process.env.APP_ENV as Environment) ??
  (process.env.NODE_ENV === 'production' ? 'prod' : 'dev');
```

With a helper that maps both `APP_ENV` and `NODE_ENV` to the `Environment` union:

```ts
function resolveEnv(): Environment {
  const appEnv = process.env.APP_ENV;
  if (appEnv === 'dev' || appEnv === 'staging' || appEnv === 'prod') {
    return appEnv;
  }
  switch (process.env.NODE_ENV) {
    case 'production': return 'prod';
    case 'staging':    return 'staging';
    default:           return 'dev';
  }
}

const ENV: Environment = resolveEnv();
```

**Key behaviors:**
- `APP_ENV` takes precedence when it's a valid `Environment` value.
- `NODE_ENV=staging` now correctly resolves to `'staging'` (previously fell through to `'dev'`).
- `NODE_ENV=production` still resolves to `'prod'`.
- Everything else (including `NODE_ENV=development` or unset) defaults to `'dev'`.
- The `Environment` type, `FlagDefinition` interface, `flagRegistry`, `getFlag`, and exports remain unchanged.

## Verification
- `APP_ENV=staging` → ENV is `'staging'`
- `APP_ENV=prod` → ENV is `'prod'`
- `APP_ENV=dev` → ENV is `'dev'`
- `APP_ENV` unset, `NODE_ENV=production` → ENV is `'prod'`
- `APP_ENV` unset, `NODE_ENV=staging` → ENV is `'staging'`
- `APP_ENV` unset, `NODE_ENV=development` → ENV is `'dev'`
- `APP_ENV` unset, `NODE_ENV` unset → ENV is `'dev'`
- TypeScript compiles without errors

## Task Progress
<!-- lat: 2026-02-26T06:25:00Z -->
<!-- agent-pid: 67429 -->
<!-- worktree: .worktrees/q-004 -->
<!-- branch: q/004 -->

### Checklist
- [ ] **ACTIVE** → Create worktree from fix/quality-audit
- [ ] Update ENV resolution in config/flags.ts
- [ ] Verify TypeScript compiles
- [ ] Commit, rebase, merge, archive

### Handoff Context
- Target branch: fix/quality-audit
- Small change: replace ENV derivation with resolveEnv() helper
