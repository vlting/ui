<!-- auto-queue -->
<!-- target-branch: test/library-buildout/hook-testing-spec-coverage -->
# Task: useTabs Spec + Test + Partial ARIA Fix

**Issue:** #202
**Files:**
- `packages/headless/src/useTabs.spec.md` (new)
- `packages/headless/src/useTabs.test.tsx` (new)
- `packages/headless/src/useTabs.ts` (modify — add id generation, aria-controls, aria-labelledby)

## Context
useTabs manages tab selection state with built-in keyboard navigation. Most complex hook — 3 prop-getters, auto-registration via getTabProps, orientation-aware keyboard nav. Currently missing id generation for tab↔panel linking (aria-controls, aria-labelledby).

**Current API (from useTabs.ts):**
- Props: `{ defaultValue?, value?, onValueChange?, orientation? = 'horizontal' }`
- Returns: `{ activeValue, setActiveValue, getTabListProps, getTabProps, getTabPanelProps }`
- getTabListProps: `{ role: 'tablist', 'aria-orientation' }`
- getTabProps(value): `{ role: 'tab', 'aria-selected', tabIndex, onClick, onKeyDown }` — MISSING id, aria-controls
- getTabPanelProps(value): `{ role: 'tabpanel', hidden, tabIndex: 0 }` — MISSING id, aria-labelledby
- Tab registration: hidden side effect inside getTabProps (pushes to ref array)
- Keyboard: orientation-aware arrows, Home/End, wraps around
- Hand-rolls controlled/uncontrolled (should compose useControllableState — tech debt)

## Implementation

### 1. Spec (useTabs.spec.md)
Follow reference format (sections 1/2/4/5/7/8/9). Include:
- Section 4: Behavior — controlled/uncontrolled tab selection, auto-registration via getTabProps, orientation-aware keyboard (ArrowLeft/Right for horizontal, ArrowUp/Down for vertical), Home/End, always wraps
- Section 5: Accessibility — WAI-ARIA tabs pattern. `role="tablist"` on container, `role="tab"` on tabs, `role="tabpanel"` on panels. `aria-selected` on active tab. `tabIndex=0` on active tab, `-1` on others. `aria-orientation` on tablist. `id` + `aria-controls` on tabs linking to panels. `id` + `aria-labelledby` on panels linking back to tabs. (WCAG 4.1.2, WCAG 1.3.1)
- Section 7: Composition — DX Note: getTabProps has hidden registerTab side effect. Note: "should compose useControllableState" as tech debt. Used by Tabs component.
- Section 8: Breaking changes — prop-getter return shapes, keyboard behavior, registration side effect
- Section 9: Test requirements

### 2. Implementation Changes (useTabs.ts)

**Add `useId()` for id generation:**
```typescript
import { useCallback, useId, useRef, useState } from 'react'
// ...
const baseId = useId()
```

**Update getTabProps to include id + aria-controls:**
```typescript
id: `${baseId}-tab-${tabValue}`,
'aria-controls': `${baseId}-panel-${tabValue}`,
```

**Update getTabPanelProps to include id + aria-labelledby:**
```typescript
id: `${baseId}-panel-${tabValue}`,
'aria-labelledby': `${baseId}-tab-${tabValue}`,
```

**Update UseTabsReturn interface** to include new properties in return types.

### 3. Test (useTabs.test.tsx)
Use render with fixture component.

**Fixture pattern:**
```tsx
function TabsFixture(props: UseTabsProps & { tabs?: string[] }) {
  const { tabs = ['one', 'two', 'three'], ...tabProps } = props
  const { activeValue, getTabListProps, getTabProps, getTabPanelProps } = useTabs({
    defaultValue: tabs[0],
    ...tabProps,
  })
  return (
    <div>
      <div {...getTabListProps()} data-testid="tablist">
        {tabs.map((tab) => (
          <button key={tab} {...getTabProps(tab)} data-testid={`tab-${tab}`}>
            {tab}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab} {...getTabPanelProps(tab)} data-testid={`panel-${tab}`}>
          Panel {tab}
        </div>
      ))}
      <span data-testid="active">{activeValue}</span>
    </div>
  )
}
```

**Test sections:**
- **uncontrolled mode:** first tab active by default, clicking tab changes active, defaultValue sets initial tab
- **controlled mode:** follows value prop, onValueChange called on click, value change doesn't affect internal state
- **keyboard navigation (horizontal):** ArrowRight moves to next tab, ArrowLeft moves to prev tab, wraps from last to first, wraps from first to last, Home goes to first, End goes to last
- **keyboard navigation (vertical):** ArrowDown moves to next, ArrowUp moves to prev (when orientation='vertical')
- **accessibility:** tablist has role="tablist" + aria-orientation, tabs have role="tab", panels have role="tabpanel", active tab has aria-selected=true + tabIndex=0, inactive tabs have aria-selected=false + tabIndex=-1, tab has id + aria-controls pointing to panel, panel has id + aria-labelledby pointing to tab, only active panel is visible (hidden=false)
- **registration:** getTabProps registers tabs for keyboard navigation (verify keyboard works after render)

## Acceptance Criteria
- [ ] useTabs.spec.md follows reference format
- [ ] useTabs.test.tsx covers all spec section 9 requirements
- [ ] id generation added via useId()
- [ ] aria-controls added to getTabProps
- [ ] aria-labelledby added to getTabPanelProps
- [ ] All tests pass
