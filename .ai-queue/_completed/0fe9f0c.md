# Commit History

- `e313662` — feat(specs): migrate 15 remaining specs to unified format
- `0fe9f0c` — feat(specs): migrate 15 remaining specs to unified format (#009) [merge]

---

<!-- auto-queue -->
<!-- depends-on: 007 -->
# Migrate Existing Primitive, Hook, Util, and Provider Specs to Unified Format

## Objective

Merge each unit's `*.spec.md` + `*.contract.md` into a single unified `*.spec.md` following the new template from task 007. Delete the now-redundant `*.contract.md` files.

## Units to Migrate (15)

### Primitives (8)
1. `packages/primitives/Box.spec.md` + `Box.contract.md`
2. `packages/primitives/Divider.spec.md` + `Divider.contract.md`
3. `packages/primitives/Heading.spec.md` + `Heading.contract.md`
4. `packages/primitives/Icon.spec.md` + `Icon.contract.md`
5. `packages/primitives/Portal.spec.md` + `Portal.contract.md`
6. `packages/primitives/Spacer.spec.md` + `Spacer.contract.md`
7. `packages/primitives/Stack.spec.md` + `Stack.contract.md`
8. `packages/primitives/Text.spec.md` + `Text.contract.md`

### Hooks (3)
9. `packages/hooks/useControllableState.spec.md` + `useControllableState.contract.md`
10. `packages/hooks/useFocusTrap.spec.md` + `useFocusTrap.contract.md`
11. `packages/hooks/useKeyboardNavigation.spec.md` + `useKeyboardNavigation.contract.md`

### Utils (3)
12. `packages/utils/cn.spec.md` + `cn.contract.md`
13. `packages/utils/composeEventHandlers.spec.md` + `composeEventHandlers.contract.md`
14. `packages/utils/mergeRefs.spec.md` + `mergeRefs.contract.md`

### Provider (1)
15. `src/provider/Provider.spec.md` + `provider.contract.md`

## Scope
- **Modifies**: All 15 `*.spec.md` files listed above
- **Deletes**: All 15 `*.contract.md` files listed above
- **Does NOT modify**: any source code or test files
