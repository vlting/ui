<!-- auto-queue -->
# Commit History
- `5d74d8a` chore(examples): delete volta and dating example apps
- `ab452aa` chore(examples): delete volta and dating example apps (#002) [merge]

# Delete volta and dating example apps

## Objective

Remove the `volta` and `dating` (crushd) example apps entirely. Only the `kitchen-sink` example should remain.

## Scope

**Delete entirely:**
- `examples/volta/` (entire directory)
- `examples/dating/` (entire directory)

**Update references:**
- `package.json` (root) — remove `dev:crushd` and `dev:volta` scripts
- `AI_CONSTITUTION.md` — remove references to `@vlting/examples-crushd`, `yarn dev:crushd`, `yarn dev:volta`

## Instructions

1. Delete `examples/volta/` directory and all contents.
2. Delete `examples/dating/` directory and all contents.
3. In root `package.json`, remove these scripts:
   - `"dev:crushd": "yarn workspace @vlting/examples-crushd dev"`
   - `"dev:volta": "yarn workspace @vlting/examples-volta dev"`
   The workspaces glob `"examples/*"` can stay — it will just match `kitchen-sink` only now.
4. In `AI_CONSTITUTION.md`, remove or update any lines referencing:
   - `@vlting/examples-crushd`
   - `@vlting/examples-volta`
   - `yarn dev:crushd`
   - `yarn dev:volta`
   Keep the `yarn dev:ks` / kitchen-sink references.
5. Run `yarn install` (or equivalent) to update the lockfile after removing workspaces.
6. Verify the kitchen-sink example still builds and runs after deletion.

## Acceptance Criteria

- [ ] `examples/volta/` does not exist
- [ ] `examples/dating/` does not exist
- [ ] No references to volta or crushd in root `package.json` scripts
- [ ] No references to volta or crushd in `AI_CONSTITUTION.md`
- [ ] `yarn install` completes without errors
- [ ] `yarn dev:ks` (kitchen-sink) still works
