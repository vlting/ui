<!-- auto-queue -->
<!-- target-branch: feat/library-buildout/react-aria-integration -->
# Task: Universal naming — onPress migration across all hooks

**Issue:** #204
**Files:**
- `packages/headless/src/useDisclosure.ts` (modify)
- `packages/headless/src/useDisclosure.spec.md` (modify)
- `packages/headless/src/useDisclosure.test.tsx` (modify)
- `packages/headless/src/useContextMenu.ts` (modify — onContextMenu stays, it's web-specific)
- `packages/headless/src/useContextMenu.spec.md` (modify)
- `packages/headless/src/useContextMenu.test.tsx` (modify)
- `packages/headless/src/useListState.ts` (modify)
- `packages/headless/src/useListState.spec.md` (modify)
- `packages/headless/src/useListState.test.tsx` (modify)
- `packages/headless/src/useTabs.ts` (modify)
- `packages/headless/src/useTabs.spec.md` (modify)
- `packages/headless/src/useTabs.test.tsx` (modify)

## Context
User mandated: "I hate the idea of having some hooks use onClick and some onPress; either migrate, or dual alias." Decision: full migration to `onPress` (React Native convention). Also `onMouseEnter` → `onHoverIn` (RN convention).

**`useSearch` is NOT included** — `onChange` is a form event, not a press/click event. It stays as-is.

**`useContextMenu` onContextMenu stays** — it's inherently web-specific (right-click). No RN equivalent. But document it clearly in the spec.

## Implementation

### 1. useDisclosure.ts
**In getToggleProps return and UseDisclosureReturn interface:**
- `onClick` → `onPress`

Current (line 42):
```typescript
onClick: onToggle,
```
Change to:
```typescript
onPress: onToggle,
```

Update `UseDisclosureReturn` interface `getToggleProps` return type:
```typescript
getToggleProps: () => { onPress: () => void; 'aria-expanded': boolean; 'aria-controls': string }
```

### 2. useListState.ts
**In getItemProps return and UseListStateReturn interface:**
- `onMouseEnter` → `onHoverIn`
- `onClick` → `onPress`

Current (lines 82-93):
```typescript
onMouseEnter: () => setHighlightIndex(index),
onClick: () => { ... }
```
Change to:
```typescript
onHoverIn: () => setHighlightIndex(index),
onPress: () => { ... }
```

Update `UseListStateReturn` interface `getItemProps` return type:
```typescript
getItemProps: (index: number) => {
  role: 'option'
  'aria-selected': boolean
  onHoverIn: () => void
  onPress: () => void
}
```

### 3. useTabs.ts
**In getTabProps return and UseTabsReturn interface:**
- `onClick` → `onPress`

Current (line 76):
```typescript
onClick: () => setActiveValue(tabValue),
```
Change to:
```typescript
onPress: () => setActiveValue(tabValue),
```

Update `UseTabsReturn` interface `getTabProps` return type — change `onClick` to `onPress`.

### 4. Update ALL specs
In each `*.spec.md` file, find all references to `onClick`, `onMouseEnter` and update:
- `onClick` → `onPress`
- `onMouseEnter` → `onHoverIn`
- Add note in Section 7 (Composition): "Universal naming convention: onPress (not onClick), onHoverIn (not onMouseEnter) — follows React Native conventions for cross-platform compatibility."

### 5. Update ALL tests
In each `*.test.tsx` file:
- Update fixture components to use `onPress`/`onHoverIn` from prop-getters
- For DOM testing: since `onPress` is not a native DOM event, fixtures need to wire `onPress` to `onClick` on the DOM element. **BUT** — the prop-getters return `onPress`, so the fixture must map it:

**Pattern for test fixtures:**
```tsx
// The hook returns onPress, but DOM buttons need onClick
// In test fixtures, spread the props — React will ignore unknown props
// Then test the handler directly:
function DisclosureFixture(props: UseDisclosureProps) {
  const { isOpen, getToggleProps, getContentProps } = useDisclosure(props)
  const toggleProps = getToggleProps()
  return (
    <div>
      <button onClick={toggleProps.onPress} aria-expanded={toggleProps['aria-expanded']} aria-controls={toggleProps['aria-controls']} data-testid="toggle">
        Toggle
      </button>
      <div {...getContentProps()} data-testid="content">Content</div>
    </div>
  )
}
```

**Same pattern for all hooks.** The test fixture maps `onPress` → `onClick` and `onHoverIn` → `onMouseEnter` for DOM compatibility. The HOOK returns universal names; the test fixture bridges to DOM.

**useListState fixture:**
```tsx
function ListFixture<T>({ items, ...props }: UseListStateProps<T>) {
  const { highlightIndex, getListProps, getItemProps } = useListState({ items, ...props })
  return (
    <ul {...getListProps()} data-testid="list">
      {items.map((item, i) => {
        const itemProps = getItemProps(i)
        return (
          <li
            key={i}
            role={itemProps.role}
            aria-selected={itemProps['aria-selected']}
            onClick={itemProps.onPress}
            onMouseEnter={itemProps.onHoverIn}
            data-testid={`item-${i}`}
          >
            {String(item)}
          </li>
        )
      })}
    </ul>
  )
}
```

**useTabs fixture:** Same pattern — `onClick={tabProps.onPress}`.

### 6. Test assertions
Update any assertions that check for `onClick`/`onMouseEnter` property names:
- `expect(props.onClick)` → `expect(props.onPress)`
- `expect(props.onMouseEnter)` → `expect(props.onHoverIn)`

## Acceptance Criteria
- [ ] useDisclosure: onClick → onPress in impl + interface + spec + tests
- [ ] useListState: onClick → onPress, onMouseEnter → onHoverIn in impl + interface + spec + tests
- [ ] useTabs: onClick → onPress in impl + interface + spec + tests
- [ ] useContextMenu: onContextMenu preserved (web-specific), noted in spec
- [ ] useSearch: onChange preserved (form event), no changes
- [ ] All test fixtures bridge onPress → onClick for DOM compat
- [ ] All specs reference universal naming convention
- [ ] All tests pass
