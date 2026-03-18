<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/layout-typography -->
<!-- depends-on: 004 -->
# Task: Typed Polymorphic `as` Prop

## Goal
Fix the `StyledComponent` type so that `<Row as={Link}>` correctly infers the target component's props (e.g., `href` becomes available).

Currently `as` is typed as `ComponentType` (= `ElementType<any>`) which erases the target's props. This is a regression from the Quarks predecessor.

## Files
- `packages/stl-react/src/config/styled.tsx` (type changes only)
- `packages/stl-react/src/__tests__/styled.test.tsx` (add type assertion tests)

## Current Problem

```tsx
// Line 285 of styled.tsx:
StylelessComponentProps<C> & BaseStyledProps<V> & { as?: ComponentType }
//                                                       ^^^^^^^^^^^^^^
// ComponentType = ElementType<any> — erases target props
```

When you write `<Row as={Link}>`, TypeScript allows `as={Link}` but doesn't add `href` to the available props.

## Implementation

The standard approach (used by Chakra, styled-components, Mantine):

```tsx
// Option 1: Generic call signature on StyledComponent
type StyledComponent<C extends ComponentType, V extends Variants | undefined> = {
  // Default: renders as original element
  (props: StylelessComponentProps<C> & BaseStyledProps<V> & { ref?: any }): ReactNode

  // Polymorphic: renders as different element, merges its props
  <As extends ElementType>(
    props: StylelessComponentProps<As> & BaseStyledProps<V> & { as: As; ref?: any }
  ): ReactNode

  isStyledComponent: true
  displayName?: string
}
```

This requires changing `StyledComponent` from a `ReturnType<typeof forwardRef<...>>` to a callable interface.

## Key Constraints
- **Runtime is already correct** — line 137 handles `polyAs`. This is a types-only change.
- Must preserve `forwardRef` ref support
- Must preserve `isStyledComponent` property
- Must preserve `stl` prop availability
- Must preserve variant props on the base signature
- The `as` overload should properly exclude the original element's specific props and include the target's

## Testing
Add type-level tests in `styled.test.tsx`:
```tsx
// These should typecheck without error:
<Row as="nav" />           // intrinsic element
<Row as={Link} href="/x" /> // component with own props
<Box as="button" onClick={() => {}} />

// These should NOT typecheck:
// @ts-expect-error — href not valid on default Row
<Row href="/x" />
```

## Acceptance Criteria
- `<Row as={Link}>` accepts `href` prop with correct typing
- `<Box as="button">` accepts `onClick` with correct typing
- Default usage `<Row>` still works with original element props
- Variant props still work: `<Box centered as="section">`
- `stl` prop still works on all variants
- TypeScript compiles
- No runtime changes
