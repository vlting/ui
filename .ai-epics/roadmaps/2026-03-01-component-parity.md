# Epic: Component Parity & API Mapping

- **Branch:** epic/component-parity
- **Feature flag:** component_parity
- **GitHub Issue:** #22
- **Epic PR:** #27
- **Created:** 2026-03-01
- **Status:** in-progress
- **Project Node ID:** PVT_kwDODxaco84BP_ab
- **Project Item ID:** PVTI_lADODxaco84BP_abzgmbAYg
- **Status Field ID:** PVTSSF_lADODxaco84BP_abzg-PVjU
- **Status Options:** Planning=dfac620c, Todo=8001c035, In Progress=1078ddc4, Done=1949184c

## Stage 1: A11y Fix + Direction + Item
**Objective:** Fix the NavigationMenu Home/End keyboard gap, add the Direction provider (RTL/LTR context + useDirection hook), and add the Item list-item compound component.
**Estimated scope:** ~10 files, ~400 lines
**GitHub Sub-Issue:** #23
**Board Item ID:** PVTI_lADODxaco84BP_abzgmbAZI
**Stage Branch:** (pending)
**Stage PR:** (pending)
**Acceptance criteria:**
- [ ] NavigationMenu Content supports Home/End keys (matches spec)
- [ ] Direction provider exports DirectionProvider + useDirection hook
- [ ] Direction has spec.md and test file
- [ ] Item compound component (Root, Leading, Content, Title, Description, Trailing)
- [ ] Item has spec.md and test file
- [ ] Both new components render on web and React Native
**Status:** pending
**Iterations:** 0

## Stage 2: InputGroup + Sonner-Style Toast API
**Objective:** Add the InputGroup compound component (prefix/suffix addon slots with border-radius collapsing) and extend Toast with a Sonner-style imperative API (toast(), toast.success(), toast.error(), toast.promise()).
**Estimated scope:** ~10 files, ~500 lines
**GitHub Sub-Issue:** #24
**Board Item ID:** PVTI_lADODxaco84BP_abzgmbAZM
**Stage Branch:** (pending)
**Stage PR:** (pending)
**Acceptance criteria:**
- [ ] InputGroup compound (Root, Addon, Element, Input) with border-radius collapsing
- [ ] InputGroup has spec.md and test file
- [ ] InputGroup renders on web and React Native
- [ ] Toast imperative API: toast(), toast.success(), toast.error(), toast.warning(), toast.promise()
- [ ] Toast imperative API test file
- [ ] Imperative API works with existing Toast.Provider + Toast.Viewport
**Status:** pending
**Iterations:** 0

## Stage 3: Data Table
**Objective:** Add a Data Table component using @tanstack/react-table as an optional peer dependency, wrapping our existing Table component with sorting, filtering, pagination, and column visibility.
**Estimated scope:** ~8 files, ~600 lines
**GitHub Sub-Issue:** #25
**Board Item ID:** PVTI_lADODxaco84BP_abzgmbAZY
**Stage Branch:** (pending)
**Stage PR:** (pending)
**Acceptance criteria:**
- [ ] @tanstack/react-table added as optional peer dependency
- [ ] DataTable component wraps Table with react-table integration
- [ ] DataTable supports sorting, filtering, pagination, column visibility
- [ ] DataTable has spec.md and test file
- [ ] DataTable column type helpers exported
- [ ] DataTable renders on web (React Native fallback documented)
**Status:** pending
**Iterations:** 0

## Stage 4: API Mapping Documentation + Migration Guide
**Objective:** Create machine-readable api-mapping.json for every component (shadcn props → vlting props), aggregate into root api-mappings.json, write prose migration guide, and audit primitive APIs against shadcn equivalents.
**Estimated scope:** ~55 files (mostly new JSON), ~2000 lines
**GitHub Sub-Issue:** #26
**Board Item ID:** PVTI_lADODxaco84BP_abzgmbAZo
**Stage Branch:** (pending)
**Stage PR:** (pending)
**Acceptance criteria:**
- [ ] Every component has an api-mapping.json file
- [ ] Root api-mappings.json aggregates all mappings
- [ ] Migration guide document covers import paths, prop renames, behavior differences
- [ ] Primitive API audit confirms shadcn-equivalent surface (Badge, Kbd, Label, Separator, Skeleton, Spinner, AspectRatio)
- [ ] Breaking differences documented with code examples
**Status:** pending
**Iterations:** 0
