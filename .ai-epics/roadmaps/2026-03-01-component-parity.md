# Epic: Component Parity & API Mapping

- **Branch:** epic/component-parity
- **Feature flag:** component_parity
- **GitHub Issue:** #22
- **Epic PR:** #27
- **Created:** 2026-03-01
- **Status:** in-review
- **Project Node ID:** PVT_kwDODxaco84BP_ab
- **Project Item ID:** PVTI_lADODxaco84BP_abzgmbAYg
- **Status Field ID:** PVTSSF_lADODxaco84BP_abzg-PVjU
- **Status Options:** Planning=dfac620c, Todo=8001c035, In Progress=1078ddc4, Done=1949184c

## Stage 1: A11y Fix + Direction + Item
**Objective:** Fix the NavigationMenu Home/End keyboard gap, add the Direction provider (RTL/LTR context + useDirection hook), and add the Item list-item compound component.
**Estimated scope:** ~10 files, ~400 lines
**GitHub Sub-Issue:** #23
**Board Item ID:** PVTI_lADODxaco84BP_abzgmbAZI
**Stage Branch:** feat/component-parity/a11y-direction-item
**Stage PR:** #28
**Acceptance criteria:**
- [x] NavigationMenu Content supports Home/End keys (matches spec)
- [x] Direction provider exports DirectionProvider + useDirection hook
- [x] Direction has spec.md and test file
- [x] Item compound component (Root, Leading, Content, Title, Description, Trailing)
- [x] Item has spec.md and test file
- [x] Both new components render on web and React Native
**Status:** complete
**Iterations:** 0

## Stage 2: InputGroup + Sonner-Style Toast API
**Objective:** Add the InputGroup compound component (prefix/suffix addon slots with border-radius collapsing) and extend Toast with a Sonner-style imperative API (toast(), toast.success(), toast.error(), toast.promise()).
**Estimated scope:** ~10 files, ~500 lines
**GitHub Sub-Issue:** #24
**Board Item ID:** PVTI_lADODxaco84BP_abzgmbAZM
**Stage Branch:** feat/component-parity/inputgroup-toast-api
**Stage PR:** #29
**Acceptance criteria:**
- [x] InputGroup compound (Root, Addon, Element, Input) with border-radius collapsing
- [x] InputGroup has spec.md and test file
- [x] InputGroup renders on web and React Native
- [x] Toast imperative API: toast(), toast.success(), toast.error(), toast.warning(), toast.promise()
- [x] Toast imperative API test file
- [x] Imperative API works with existing Toast.Provider + Toast.Viewport
**Status:** complete
**Iterations:** 0

## Stage 3: Data Table
**Objective:** Add a Data Table component using @tanstack/react-table as an optional peer dependency, wrapping our existing Table component with sorting, filtering, pagination, and column visibility.
**Estimated scope:** ~8 files, ~600 lines
**GitHub Sub-Issue:** #25
**Board Item ID:** PVTI_lADODxaco84BP_abzgmbAZY
**Stage Branch:** feat/component-parity/data-table
**Stage PR:** #30
**Acceptance criteria:**
- [x] @tanstack/react-table added as optional peer dependency
- [x] DataTable component wraps Table with react-table integration
- [x] DataTable supports sorting, filtering, pagination, column visibility
- [x] DataTable has spec.md and test file
- [x] DataTable column type helpers exported
- [x] DataTable renders on web (React Native fallback documented)
**Status:** complete
**Iterations:** 0

## Stage 4: API Mapping Documentation + Migration Guide
**Objective:** Create machine-readable api-mapping.json for every component (shadcn props → vlting props), aggregate into root api-mappings.json, write prose migration guide, and audit primitive APIs against shadcn equivalents.
**Estimated scope:** ~55 files (mostly new JSON), ~2000 lines
**GitHub Sub-Issue:** #26
**Board Item ID:** PVTI_lADODxaco84BP_abzgmbAZo
**Stage Branch:** docs/component-parity/api-mapping
**Stage PR:** (pending)
**Acceptance criteria:**
- [x] Every component has an api-mapping.json file
- [x] Root api-mappings.json aggregates all mappings
- [x] Migration guide document covers import paths, prop renames, behavior differences
- [x] Primitive API audit confirms shadcn-equivalent surface (Badge, Kbd, Label, Separator, Skeleton, Spinner, AspectRatio)
- [x] Breaking differences documented with code examples
**Status:** complete
**Iterations:** 0
