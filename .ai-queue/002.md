<!-- auto-queue -->
<!-- target-branch: test/library-buildout/hook-testing-spec-coverage -->
# Task: useDisclosure Spec + Test + ARIA Fix

**Issue:** #202
**Files:**
- `packages/headless/src/useDisclosure.spec.md` (new)
- `packages/headless/src/useDisclosure.test.tsx` (new)
- `packages/headless/src/useDisclosure.ts` (modify — add aria-controls)

## Context
useDisclosure manages open/close state with controlled/uncontrolled support. Returns prop-getters: `getToggleProps()` and `getContentProps()`. Currently missing `aria-controls` on toggle props linking to content ID.

**Current API (from useDisclosure.ts):**
- Props: `{ defaultOpen?, open?, onOpenChange? }`
- Returns: `{ isOpen, onOpen, onClose, onToggle, getToggleProps, getContentProps }`
- getToggleProps returns: `{ onClick, 'aria-expanded' }` — MISSING `aria-controls`
- getContentProps returns: `{ hidden, id }` — uses `useId()` for ID generation
- Hand-rolls controlled/uncontrolled instead of composing useControllableState

## Implementation

### 1. Spec (useDisclosure.spec.md)
Follow useControllableState.spec.md format exactly (sections 1/2/4/5/7/8/9). Include:
- Section 1: Purpose — disclosure pattern for accordions, collapsibles, dropdowns
- Section 4: Behavior — controlled/uncontrolled modes, getToggleProps returns `{ onClick, 'aria-expanded', 'aria-controls': contentId }`, getContentProps returns `{ hidden, id }`
- Section 5: Accessibility — WAI-ARIA disclosure pattern, `aria-expanded` (WCAG 4.1.2), `aria-controls` linking trigger to content
- Section 7: Composition — note "should compose useControllableState" as tech debt
- Section 8: Breaking changes — prop-getter return shapes, event handler names
- Section 9: Test requirements — all scenarios listed below

### 2. Implementation Fix (useDisclosure.ts)
Add `'aria-controls': contentId` to the getToggleProps return object. This is the only change — additive, non-breaking.

Update the `getToggleProps` return type in the `UseDisclosureReturn` interface to include `'aria-controls': string`.

### 3. Test (useDisclosure.test.tsx)
Use render with a fixture component (not just renderHook) since we need DOM for ARIA assertions.

**Fixture pattern:**
```tsx
function DisclosureFixture(props: UseDisclosureProps) {
  const { isOpen, getToggleProps, getContentProps } = useDisclosure(props)
  return (
    <div>
      <button {...getToggleProps()} data-testid="toggle">Toggle</button>
      <div {...getContentProps()} data-testid="content">Content</div>
    </div>
  )
}
```

**Test sections (describe blocks):**
- **uncontrolled mode:** default closed, opens on click, closes on click, onOpenChange called
- **controlled mode:** follows `open` prop, onOpenChange called but state doesn't change
- **actions:** onOpen, onClose, onToggle work correctly
- **accessibility:** aria-expanded reflects state, aria-controls links to content id, content has hidden attribute, ID is consistent across renders
- **prop-getters:** getToggleProps returns correct shape, getContentProps returns correct shape

## Acceptance Criteria
- [ ] useDisclosure.spec.md follows reference format
- [ ] useDisclosure.test.tsx covers all spec section 9 requirements
- [ ] aria-controls added to getToggleProps return
- [ ] All tests pass
