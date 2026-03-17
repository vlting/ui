---
slug: library-buildout
status: in-progress
scope: large
created: 2026-03-15
current_epic: 6
current_stage: 1
phase: execute
epic_issue: 206
---
# @vlting/ui Library Build-Out

## Overview
Build all 55 stubbed components to production quality, bottom-up. Follows the Button pattern established in the full-rebuild initiative: spec review → headless hook → styled component → tests → playground page. Every component gets human approval before merge.

Key decisions (from council — 7 personas, unanimous on ordering):
- **react-aria:** Selective wrapping in headless package for complex ARIA patterns only (listbox, combobox, calendar, dialog focus, menu). Simple components use custom hooks. react-aria is never exposed to consumers.
- **Victory:** Wrap/decorate (not drop) — own the API contract, leverage battle-tested charting + cross-platform (victory-native). Same pattern as react-aria wrapping.
- **Theming taxonomy:** 3 tiers — Theme-axis (full theme×variant like Button), Surface (semantic tokens only), Neutral-only (single color mode).
- **Universal naming:** onPress (not onClick), onPressIn/Out, onHoverIn/Out — RN conventions. Web mapProps translates.
- **Native parity:** Considered from day one in all hooks/specs. Actual .native.tsx implementations in final epic.
- **Specs & tests:** Audit/rewrite per component as part of each stage. Button spec/tests updated first as reference.
- **Icons:** Restructure barrel (3,229 re-exports) → category/dynamic imports.
- **Approval:** Per-stage batch review with playground visual verification.
- **Test queue:** jest.config.js testPathIgnorePatterns as definition-of-done.

## Metadata
- **Base branch:** main
- **Created:** 2026-03-15
- **Integrations:** github
- **Risk summary:** Volume (55 components at WCAG AA); styled() untested for compound+portal patterns; wrapping maintenance overhead

## Epic 5: Headless Foundation
**Objective:** Establish the behavioral layer — test existing hooks, add missing ones, selective react-aria integration, universal naming convention
**Dependencies:** none
**Epic slug:** headless-foundation
**Status:** done

### Stage 5.1: Button Spec & Test Audit
**Branch prefix:** chore
**Branch:** chore/library-buildout/button-spec-test-audit
**Issue:** #199
**Acceptance criteria:**
- [x] Button.spec.md reflects actual implemented API (theme×variant model, styled() options API)
- [x] Button.test.tsx covers all spec requirements with passing tests
- [x] Button established as canonical reference pattern
- [x] Document native parity considerations in spec
- [x] renderWithConditions test helper created
- [x] api-mapping.json rewritten to match current API
- [x] STL/jest test infrastructure fixed (circular dep, vanilla-extract mock)
**PR:** #200
**Status:** done

### Stage 5.2: Hook Testing & Spec Coverage
**Branch prefix:** test
**Branch:** test/library-buildout/hook-testing-spec-coverage
**Issue:** #202
**Acceptance criteria:**
- [x] spec.md created for 8 hooks (useDisclosure, useAutoplay, useContextMenu, useListState, usePopoverPosition, useSearch, useTabs, useToastQueue)
- [x] Tests written for all 9 hooks (8 new + useControllableState audit) — 153 tests, 152 pass, 1 todo
- [x] All hook tests passing
- [x] Hook API normalized (useSearch getInputProps, useListState getListProps)
- [x] ARIA gaps fixed (useDisclosure aria-controls, useContextMenu aria-haspopup, useListState roles, useTabs id+aria-controls+aria-labelledby)
**PR:** #203
**Status:** done

### Stage 5.3: react-aria Selective Integration
**Branch prefix:** feat
**Branch:** feat/library-buildout/react-aria-integration
**Issue:** #204
**Acceptance criteria:**
- [x] @react-aria/focus and @react-aria/live-announcer installed as optionalDependencies
- [x] Adapter module (_adapters/react-aria.ts) centralizes all react-aria imports
- [x] jest.config.js + vite.config.ts updated for react-aria
- [x] useFocusScope: prop-getter focus containment, replaces @deprecated useFocusTrap (no react-aria)
- [x] useTypeahead: character buffer with prefix matching + getTypeaheadProps() (no react-aria)
- [x] useRovingTabIndex: DOM focus + tabIndex management with getContainerProps() + getItemProps() (no react-aria)
- [x] useLiveRegion: announce() + getLiveRegionProps() via @react-aria/live-announcer adapter
- [x] Universal naming: onClick→onPress, onMouseEnter→onHoverIn across all existing hooks
- [x] Headless barrel updated with 4 new exports, useKeyboardNavigation @deprecated
- [x] All new hooks have spec.md and tests
- [x] All existing tests still pass after naming migration — 205 tests, 15 suites
**PR:** #205
**Status:** done

## Epic 6: Display Components
**Objective:** Pure styled components — no hooks needed. Exercises token system broadly (colors, spacing, typography, borders, shadows)
**Dependencies:** Epic 5
**Epic slug:** display-components
**Epic branch:** epic/display-components
**Epic issue:** #206
**Status:** in-progress

### Stage 6.1: Feedback (Alert, Progress, Loader, Empty)
**Branch prefix:** feat
**Branch:** feat/library-buildout/feedback-components
**Issue:** #208
**Acceptance criteria:**
- [ ] Alert: compound (Root/Title/Description/Icon), theme (primary/secondary/tertiary/success/warning/error/info), role mapping
- [ ] Progress: value/max/size, track+indicator, role="progressbar", ARIA values
- [ ] Loader: Spinner wrapper, variant (primary/min/max), size (sm/md/lg)
- [ ] Empty: compound (Root/Media/Title/Description/Action), role="status", surface tokens
- [ ] Specs audited/rewritten for each component
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages for each
**Status:** in-progress

### Stage 6.2: Content (Card, Avatar, Badge, Item)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Card: surface, compound (Header/Body/Footer), shadow tokens
- [ ] Avatar: neutral, image with fallback, size scale
- [ ] Badge: theme-axis, variant (solid/subtle/outline), size scale
- [ ] Item: surface, compound (Leading/Title/Description/Trailing)
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages for each
**Status:** pending

### Stage 6.3: Layout & Typography (Typography, Separator, ButtonGroup, Direction)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Typography: H1-H6, P, Lead, Large, Small, Muted, InlineCode, Blockquote — all using type scale tokens
- [ ] Separator: neutral, horizontal/vertical orientation, decorative vs semantic
- [ ] ButtonGroup: layout wrapper, spacing, connected variant
- [ ] Direction: RTL provider, context-based
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages for each
**Status:** pending

## Epic 7: Form Controls
**Objective:** Interactive form elements — headless hooks required, exercises focus ring, error states, disabled pattern, size scale
**Dependencies:** Epic 6
**Epic slug:** form-controls
**Status:** pending

### Stage 7.1: Text Inputs (Input, Textarea, NativeSelect)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Specs audited/rewritten
- [ ] Input: neutral, size scale, error/disabled states, aria-invalid/aria-describedby, placeholder
- [ ] Textarea: neutral, auto-resize option, character count
- [ ] NativeSelect: neutral, native <select> wrapper, size scale
- [ ] Focus ring pattern from Button ($outlineColor, 2px solid, 2px offset)
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages with all states
**Status:** pending

### Stage 7.2: Selection Controls (Checkbox, Switch, RadioGroup, Toggle)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Checkbox: theme-axis, controlled/uncontrolled, indeterminate, group support
- [ ] Switch: theme-axis, controlled/uncontrolled, aria-checked
- [ ] RadioGroup: theme-axis, roving tabindex, aria-radiogroup
- [ ] Toggle: theme-axis, pressed state, aria-pressed
- [ ] All use headless hooks from packages/headless
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages
**Status:** pending

### Stage 7.3: Range & Complex Inputs (Slider, InputOTP, InputGroup)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Slider: theme-axis, range support, aria-valuemin/max/now, keyboard (arrows, Home/End)
- [ ] InputOTP: neutral, auto-focus next, paste support, aria-label per field
- [ ] InputGroup: neutral, prefix/suffix addons, integrated elements
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages
**Status:** pending

### Stage 7.4: Form Infrastructure (Field, Form, Label)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Field: compound (Label/Control/Error/Description), auto-wires aria-describedby/aria-invalid
- [ ] Form: root container, validation integration points
- [ ] Label: associates with control, required indicator
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages
**Status:** pending

## Epic 8: Disclosure & Overlay
**Objective:** Components with open/close state, focus management, portals. First real test of styled() for compound+portal patterns.
**Dependencies:** Epic 7
**Epic slug:** disclosure-overlay
**Status:** pending

### Stage 8.1: Disclosure (Accordion, Collapsible)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Accordion: compound (Root/Item/Trigger/Content), single/multiple mode, keyboard (Enter/Space, arrows)
- [ ] Collapsible: compound (Root/Trigger/Content), controlled/uncontrolled
- [ ] Both use useDisclosure from headless
- [ ] Enter/exit animations using $normalDuration, gated on lowMotion
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages
**Status:** pending

### Stage 8.2: Dialogs (Dialog, AlertDialog, Sheet, Drawer)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Dialog: compound, focus trap, focus restoration, Escape close, aria-modal, overlay background
- [ ] AlertDialog: extends Dialog, auto-focus destructive action, aria-alertdialog
- [ ] Sheet: bottom/side panel variant, drag-to-dismiss option
- [ ] Drawer: side panel, persistent/temporary modes
- [ ] All use useFocusScope, Portal
- [ ] Shadow tokens ($sm-$2xl), animation tokens (slideIn*/fadeIn)
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages
**Status:** pending

### Stage 8.3: Floating (Popover, Tooltip, HoverCard)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Popover: compound, positioning (usePopoverPosition), focus management, arrow
- [ ] Tooltip: delay, positioning, aria-describedby on trigger
- [ ] HoverCard: hover-triggered popover, delay, pointer tracking
- [ ] All use Portal, positioning logic
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages
**Status:** pending

### Stage 8.4: Feedback Overlay (Toast)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Toast: compound, queue management (useToastQueue), auto-dismiss, swipe-to-dismiss
- [ ] Toaster container, positioning (top/bottom × left/center/right)
- [ ] aria-live announcements (useLiveRegion)
- [ ] Enter/exit animations
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground page
**Status:** pending

## Epic 9: Menus & Navigation
**Objective:** Complex keyboard navigation, roving tabindex, typeahead. react-aria-backed where appropriate.
**Dependencies:** Epic 8
**Epic slug:** menus-navigation
**Status:** pending

### Stage 9.1: Menus (DropdownMenu, ContextMenu, Menu, Menubar)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Menu: compound, roving tabindex, typeahead, nested submenus, aria-menu
- [ ] DropdownMenu: trigger + Menu, positioning
- [ ] ContextMenu: right-click trigger + Menu
- [ ] Menubar: horizontal menu bar, nested menus, keyboard (arrows, Enter, Escape)
- [ ] react-aria backed via headless wrappers
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages
**Status:** pending

### Stage 9.2: Selection (Select, Combobox, Command)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Select: compound, listbox pattern, typeahead, single/multi select, aria-listbox
- [ ] Combobox: input + listbox, filtering, async loading, aria-combobox
- [ ] Command: command palette, search + action list, keyboard-first
- [ ] react-aria backed for listbox/combobox patterns
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages
**Status:** pending

### Stage 9.3: Navigation (Tabs, NavigationMenu, Breadcrumb, Pagination, Sidebar)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Tabs: compound, roving tabindex, aria-tablist/tab/tabpanel, controlled/uncontrolled
- [ ] NavigationMenu: horizontal nav, active state, mega-menu support
- [ ] Breadcrumb: compound, aria-breadcrumb, separator
- [ ] Pagination: page navigation, aria-label, keyboard
- [ ] Sidebar: collapsible navigation, responsive, compound
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages
**Status:** pending

## Epic 10: Complex & Data
**Objective:** Data-heavy components with complex state management
**Dependencies:** Epic 9
**Epic slug:** complex-data
**Status:** pending

### Stage 10.1: Tables (Table, DataTable)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Table: compound (Head/Body/Row/Cell/Header/Footer), semantic HTML, sortable headers
- [ ] DataTable: TanStack Table integration, sorting, filtering, pagination, column visibility
- [ ] Responsive: horizontal scroll on small screens
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages
**Status:** pending

### Stage 10.2: Dates (Calendar, DatePicker)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Calendar: grid navigation, keyboard (arrows, Page Up/Down, Home/End), aria-grid
- [ ] DatePicker: Calendar + Input, date formatting, range support
- [ ] react-aria backed for calendar grid patterns
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages
**Status:** pending

### Stage 10.3: Advanced Interaction (Carousel, ScrollArea, Resizable)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Carousel: compound, auto-play, keyboard, touch/swipe, aria-roledescription
- [ ] ScrollArea: custom scrollbar, overflow detection
- [ ] Resizable: compound (PanelGroup/Panel/Handle), keyboard resize, min/max constraints
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground pages
**Status:** pending

## Epic 11: Blocks Rebuild
**Objective:** Rebuild all 13 pre-composed blocks on top of real components
**Dependencies:** Epic 10
**Epic slug:** blocks-rebuild
**Status:** pending

### Stage 11.1: Core Blocks (AppShell, Auth, Dashboard, Sidebar, Hero, EmptyState)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Each block rebuilt using real components (no stubs)
- [ ] Responsive layout via STL tokens/conditions
- [ ] Playground pages demonstrating each block
- [ ] Tests for composition and responsive behavior
**Status:** pending

### Stage 11.2: Interactive Blocks (ChatInterface, DataTable, Feed, FileUpload, NotificationCenter, OnboardingWizard, Pricing)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Each block rebuilt using real components
- [ ] Interactive behaviors working (file upload, chat input, wizard steps)
- [ ] Playground pages
- [ ] Tests
**Status:** pending

## Epic 12: Charts
**Objective:** Wrap Victory with owned API contract — leverage cross-platform charting (victory-native) while owning the component surface
**Dependencies:** Epic 10
**Epic slug:** charts
**Status:** pending

### Stage 12.1: Chart Infrastructure
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] ChartContainer: responsive wrapper, theme integration via STL tokens
- [ ] ChartTooltip: styled tooltip overlay
- [ ] ChartLegend: styled legend
- [ ] ChartDataTable: accessible data table alternative for screen readers
- [ ] Victory wrapped behind owned API — consumers import from @vlting/ui, never from victory directly
- [ ] Lazy-loaded via separate subpath export (@vlting/ui/charts)
- [ ] Playground page for infrastructure components
**Status:** pending

### Stage 12.2: Core Charts (LineChart, BarChart, AreaChart)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Each wraps Victory equivalent with owned props API
- [ ] Theme-aware (uses STL color tokens)
- [ ] Responsive sizing
- [ ] Tests for rendering and data handling
- [ ] Playground pages with sample data
**Status:** pending

### Stage 12.3: Specialized Charts (PieChart, RadarChart, RadialChart)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Each wraps Victory equivalent
- [ ] Theme-aware
- [ ] Tests and playground pages
**Status:** pending

## Epic 13: Playground & Docs
**Objective:** Full playground with routing + Expo native playground + docs site rebuild
**Dependencies:** Epic 10 (playground alongside components), Epic 12 (docs after charts)
**Epic slug:** playground-docs
**Status:** pending

### Stage 13.1: Playground Infrastructure
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] React Router added to playground app
- [ ] Sidebar nav listing all components grouped by category
- [ ] PermutationGrid utility component (auto-generates variant combinations)
- [ ] Code toggle showing JSX for each rendered permutation
- [ ] All component pages created (built alongside Epics 6-12)
**Status:** pending

### Stage 13.2: Expo Native Playground
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Expo app at apps/playground-native
- [ ] Mirrors web playground structure
- [ ] Tests native-specific behavior (touch, gestures, platform differences)
- [ ] Connected to same theme system
**Status:** pending

### Stage 13.3: Docs Site Rebuild
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Auto-generated prop tables from TypeScript types
- [ ] Live editable code examples
- [ ] Per-component pages (Purpose, Anatomy, Behavior, Accessibility, Styling, Composition)
- [ ] Copy-paste-ready import snippets for web and native
- [ ] Search functionality
- [ ] All component docs complete
**Status:** pending

## Epic 14: React Native Parity
**Objective:** .native.tsx for all components, universal headless hooks validated, Expo tested
**Dependencies:** Epic 13
**Epic slug:** react-native-parity
**Status:** pending

### Stage 14.1: Primitive & Display Native Implementations
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] All stl-react primitives have working .native.tsx
- [ ] All Epic 6 display components have .native.tsx
- [ ] Expo playground pages for each
**Status:** pending

### Stage 14.2: Form Control Native Implementations
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] All Epic 7 form controls have .native.tsx
- [ ] Platform-specific adaptations (native pickers, keyboard handling)
- [ ] Expo playground pages
**Status:** pending

### Stage 14.3: Overlay & Navigation Native Implementations
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] All Epic 8-9 components have .native.tsx
- [ ] Native modal/sheet patterns (react-native-reanimated, gesture-handler)
- [ ] Expo playground pages
**Status:** pending

### Stage 14.4: Complex Component Native Implementations
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] All Epic 10 components have .native.tsx
- [ ] Victory-native integration for charts
- [ ] Full Expo validation pass
**Status:** pending
