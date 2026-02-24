<!-- auto-queue -->
<!-- depends-on: 008, 009, 010 -->
# Write Tests for Primitives, Hooks, and Utils

## Objective

Create test files for all primitives, hooks, and utilities. Tests must cover the requirements listed in each component's unified `*.spec.md` (from tasks 008, 009, 010).

## Testing Setup

- Framework: **Jest** with **React Testing Library**
- Test environment: `jsdom`
- Custom render: use `src/__test-utils__/render.tsx` (wraps components in TamaguiProvider)
- File naming: `*.test.tsx` (or `*.test.ts` for non-JSX tests)
- Location: alongside the component (e.g., `packages/primitives/Box/Box.test.tsx`)

## Test Coverage Requirements

Every test file must cover (as applicable to the component type):

### For Primitives (visual components)
1. **Renders correctly** — mounts without errors, renders expected element type
2. **Semantic HTML** — verify the correct HTML element is rendered (not a generic `<div>` when a semantic element is required)
3. **Accessibility attributes** — verify ARIA attributes per the spec
4. **Variants** — test each variant value produces expected styling/behavior
5. **Ref forwarding** — verify `forwardRef` works
6. **Composition** — verify children render correctly
7. **Token usage** — verify no hardcoded style values (where testable)

### For Hooks
1. **Return value** — verify the hook returns the expected shape
2. **State management** — test controlled/uncontrolled behavior
3. **Edge cases** — test boundary conditions documented in the spec
4. **Cleanup** — verify event listeners/subscriptions are cleaned up on unmount

### For Utils
1. **Input/output** — test all documented function signatures
2. **Edge cases** — null, undefined, empty inputs
3. **Return types** — verify TypeScript-compatible return values

## Primitives to Test (up to 16)

**Already documented (migrated in tasks 008/009):**
1. `packages/primitives/Box/Box.test.tsx`
2. `packages/primitives/Divider/Divider.test.tsx`
3. `packages/primitives/Heading/Heading.test.tsx`
4. `packages/primitives/Icon/Icon.test.tsx`
5. `packages/primitives/Portal/Portal.test.tsx`
6. `packages/primitives/Spacer/Spacer.test.tsx`
7. `packages/primitives/Stack/Stack.test.tsx`
8. `packages/primitives/Text/Text.test.tsx`

**Newly documented (from task 010):**
9. `packages/primitives/AspectRatio/AspectRatio.test.tsx`
10. `packages/primitives/Badge/Badge.test.tsx`
11. `packages/primitives/Kbd/Kbd.test.tsx`
12. `packages/primitives/Label/Label.test.tsx`
13. `packages/primitives/Separator/Separator.test.tsx`
14. `packages/primitives/Skeleton/Skeleton.test.tsx`
15. `packages/primitives/Spinner/Spinner.test.tsx`
16. `packages/primitives/VisuallyHidden/VisuallyHidden.test.tsx`

**Hooks:**
17. `packages/hooks/useControllableState.test.ts`
18. `packages/hooks/useFocusTrap.test.tsx`
19. `packages/hooks/useKeyboardNavigation.test.tsx`

**Utils:**
20. `packages/utils/cn.test.ts`
21. `packages/utils/composeEventHandlers.test.ts`
22. `packages/utils/mergeRefs.test.ts`

**Provider:**
23. `src/provider/Provider.test.tsx`

Skip any component that is a stub (the spec will say "Status: Stub"). Stubs don't have meaningful behavior to test.

## Procedure

For each unit:

1. **Read** its unified `*.spec.md` — specifically the "Test Requirements" section
2. **Read** the TypeScript source to understand the actual implementation
3. **Write** the test file covering all spec'd test requirements
4. **Run** `yarn test` (or `npx jest <path>`) to verify tests pass
5. If tests fail due to Tamagui/JSDOM limitations, add `// TODO: requires browser environment` comments and skip those specific tests with `it.skip()`

## Important Notes

- Use `@testing-library/react` queries: `getByRole`, `getByLabelText`, `getByText` — prefer accessible queries
- For keyboard testing: use `fireEvent.keyDown` or `userEvent.keyboard`
- For focus testing: use `expect(element).toHaveFocus()`
- Do NOT test internal DOM structure — test behavior and accessibility
- Tamagui components may not render standard HTML in JSDOM — handle gracefully

## Scope
- **Creates**: Up to 23 new test files in `packages/` and `src/` directories
- **Does NOT modify**: any existing source code or spec files
