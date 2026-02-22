<!-- auto-queue -->
# Commit History
- No code changes needed — kitchen-sink was already correctly configured
- Verified: `yarn dev:kitchen-sink` starts Vite dev server at localhost:5173

# Task: Make kitchen-sink runnable from root repo directory

## Objective
Ensure the `kitchen-sink` example app can be started from the repo root via `yarn dev:kitchen-sink` (the script already exists in the root `package.json`).

## Context
- Root `package.json` already has `"dev:kitchen-sink": "yarn workspace @vlting/examples-kitchen-sink dev"`
- Root `package.json` already has `"workspaces": [".", "examples/*"]`
- The kitchen-sink app should exist at `examples/kitchen-sink/`

## Steps

### 1. Verify the kitchen-sink example app exists
Check that `examples/kitchen-sink/` exists with a valid `package.json`. If it was created by a prior task, it should already be there.

### 2. Ensure the kitchen-sink `package.json` has the correct workspace name
The `name` field in `examples/kitchen-sink/package.json` must be `@vlting/examples-kitchen-sink` to match the root workspace script.

### 3. Ensure the `dev` script exists
The kitchen-sink `package.json` must have a `"dev"` script (e.g., `"dev": "vite"` for a Vite app).

### 4. Test it
Run `yarn dev:kitchen-sink` from the repo root and confirm it starts the dev server without errors. If there are dependency resolution issues, run `yarn install` from the root first.

### 5. Fix any issues
- If `yarn workspace` can't find the package, check the `name` field matches
- If dependencies are missing, ensure `@vlting/ui` is listed as a dependency using the workspace protocol (e.g., `"@vlting/ui": "*"` or `"@vlting/ui": "workspace:*"`)
- If Vite can't resolve imports, check `vite.config.ts` for proper alias/resolve configuration

## Verification
- `yarn dev:kitchen-sink` from the repo root successfully starts the dev server
- The app is accessible in a browser at the reported localhost URL
