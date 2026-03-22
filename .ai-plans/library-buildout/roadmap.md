---
slug: library-buildout
status: in-progress
scope: large
created: 2026-03-15
current_epic: 11
current_stage: 1
phase: breakdown
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
**Epic PR:** #212
**Status:** done

### Stage 6.1: Feedback (Alert, Progress, Loader, Empty)
**Branch prefix:** feat
**Branch:** feat/library-buildout/feedback-components
**Issue:** #208
**PR:** #209
**Acceptance criteria:**
- [x] Alert: compound (Root/Content/Title/Description/Icon), 7 themes, 4 variants, floating
- [x] Progress: value/max/size, track+indicator, role="progressbar", ARIA values
- [x] Spinner: consolidated from Loader, variant (primary/min/max), size (sm/md/lg/xl)
- [x] Empty: compound (Root/Media/Title/Description/Action), semantic HTML, color-mode-aware tokens
- [x] Playground pages with interactive demos
**Status:** done

### Stage 6.2: Content (Card, Avatar, Badge, Item)
**Branch prefix:** feat
**Branch:** feat/library-buildout/content-components
**Issue:** #211
**PR:** #213
**Acceptance criteria:**
- [x] Card: article root, compound (Header/Content/Footer/Title/Description), size/elevated/interactive, semantic HTML
- [x] Avatar: dual API (single-prop + compound), size scale (32/40/56/72), image fallback, circular
- [x] Badge: 15 themes × 3 variants (solid/subtle/outline), size scale, token-based spacing
- [x] Item: compound (Leading/Content/Title/Description/Trailing), size/interactive
- [x] Tests passing, removed from testPathIgnorePatterns
- [x] Playground pages for each
**Status:** done

### Stage 6.3: Layout & Typography
**Branch prefix:** feat
**Branch:** feat/library-buildout/layout-typography
**Issue:** #214
**PR:** #215
**Acceptance criteria:**
- [x] Heading: compound H1-H6 via Object.assign, drop level/forwardRef
- [x] Text: add Text.Small (<small>), Text.Code (<code>) sub-components
- [x] Blockquote + InlineCode as new standalone stl-react primitives
- [x] Layout semantic alternates on Row, Column, Box (.Div/.Nav/.Header/.Footer/.Main/.Aside/.Article/.Span)
- [x] Typed polymorphic `as` prop on StyledComponent
- [x] Delete Typography component, re-export Separator, implement ButtonGroup + Direction
- [x] Tests passing, removed from testPathIgnorePatterns
- [x] Playground pages for Heading, Separator, ButtonGroup
**Status:** done

### Stage 6.4: Token Infrastructure (Shadow & Layering)
**Branch prefix:** feat
**Branch:** feat/library-buildout/token-infrastructure
**Issue:** #216
**PR:** #235
**Acceptance criteria:**
- [x] `$buttonShadow` + `$buttonShadowHover` added to shadow scale (default `none`)
- [x] `ShadowScale` type extended with optional buttonShadow/buttonShadowHover
- [x] Theme presets wired with `none` defaults (zero visual change)
- [x] Button base stl uses `$buttonShadow`, `:interact` uses `$buttonShadowHover`, transition gated on `lowMotion`
- [x] Playground theme presets (Flat/Pro/Sharp) demonstrate shadow variations
- [x] Button.spec.md updated with shadow behavior
- [x] Background color scale: dark-mode steps 0-3 use non-inverted luminance progression (lighter = higher layer, matching light mode mental model). Only the `background` palette — primary/secondary/neutral/semantic scales unchanged.
- [x] Surface tokens (`surface1`, `surface2`, `surface3`) reflect corrected background layering
- [x] Visual verification: layered surfaces (Card on Dialog on page) look elevated in both modes
- [x] All existing tests still pass
**Status:** done

## Epic 7: Form Controls
**Objective:** Interactive form elements — headless hooks required, exercises focus ring, error states, disabled pattern, size scale
**Dependencies:** Epic 6
**Epic slug:** form-controls
**Epic branch:** epic/form-controls
**Epic issue:** #217
**Epic PR:** #236 (merged)
**Status:** done

### Stage 7.1: Text Inputs (Input, Textarea, NativeSelect)
**Branch prefix:** feat
**Branch:** feat/library-buildout/text-inputs
**Issue:** #220
**PR:** #237
**Acceptance criteria:**
- [x] Input: styled input, size scale (sm/md/lg), error/disabled variants, onChangeText, aria-invalid
- [x] Textarea: styled textarea, size scale, error/disabled, resize:vertical, rows prop
- [x] NativeSelect: compound Root+Option, custom SVG arrow, onValueChange, placeholder
- [x] Focus ring pattern matching Button (outline '$neutral'/'$error', $field radius)
- [x] Fresh specs written for all 3
- [x] Fresh tests passing, removed from testPathIgnorePatterns
- [x] Playground section with all states
**Status:** done

### Stage 7.2: Selection Controls (Checkbox, Switch, RadioGroup, Toggle)
**Branch prefix:** feat
**Branch:** feat/library-buildout/selection-controls
**Issue:** #221
**PR:** #238
**Acceptance criteria:**
- [x] Checkbox: compound Root+Indicator, useControllableState, indeterminate, size sm/md/lg, error/disabled
- [x] Switch: button role="switch" + thumb, useControllableState, thumb animation in STL core, lowMotion
- [x] RadioGroup: compound Root+Item, useControllableState+useRovingTabIndex, role="radiogroup", context
- [x] Toggle: spec filled from bak, test audit (aria-pressed, controlled mode, onPressedChange)
- [x] All use headless hooks from packages/headless
- [x] Tests passing, removed from testPathIgnorePatterns
- [x] Playground SelectionSection with all states
**Status:** done

### Stage 7.3: Range & Complex Inputs (Slider, InputOTP, InputGroup)
**Branch prefix:** feat
**Branch:** feat/library-buildout/range-complex-inputs
**Issue:** #239
**PR:** #240
**Acceptance criteria:**
- [x] Slider: theme-axis, single-thumb, role="slider", aria-valuemin/max/now, keyboard (arrows, Home/End), pointer drag, 44px touch target
- [x] InputOTP: compound (Root/Group/Slot/Separator), hidden input, auto-advance, paste, onComplete, inputMode="numeric"
- [x] InputGroup: compound, size context, role="group", border-radius collapsing, Addon aria-hidden, Element placement
- [x] Tests passing, removed from testPathIgnorePatterns
- [x] Playground sections + demo scene integration
**Status:** done

### Stage 7.4: Form Infrastructure (Field, Form)
**Branch prefix:** feat
**Branch:** feat/library-buildout/form-infrastructure
**Issue:** #241
**PR:** #242
**Acceptance criteria:**
- [x] Field: compound (Root/Label/Control/Description/Error), context + useId + cloneElement, auto-wires aria
- [x] Form: styled <form> with onSubmit/preventDefault, noValidate
- [x] Label primitive in stl-react already done — Field.Label wraps it, no duplication
- [x] Tests rewritten to match actual implementation
- [x] Playground section + demo scene integration
**Status:** done

## Epic 8: Disclosure & Overlay
**Objective:** Components with open/close state, focus management, portals. First real test of styled() for compound+portal patterns.
**Dependencies:** Epic 7
**Epic slug:** disclosure-overlay
**Epic branch:** epic/disclosure-overlay
**Epic issue:** #243
**Epic PR:** #244 (merged)
**Status:** done

### Stage 8.1: Disclosure (Accordion, Collapsible) + Slider cleanup
**Branch prefix:** feat
**Branch:** feat/library-buildout/disclosure
**Issue:** #245
**Acceptance criteria:**
- [x] useSlider extracted to packages/headless/, Slider component refactored to pure structure
- [x] Collapsible: compound (Root/Trigger/Content), uses useDisclosure, controlled/uncontrolled
- [x] useAccordion hook in packages/headless/ (state coordination, roving tabindex, prop-getters)
- [x] Accordion: compound (Root/Item/Trigger/Content), consumes useAccordion, single/multiple mode
- [x] data-state="open"|"closed" on disclosure elements for future CSS animation
- [x] Tests passing, removed from testPathIgnorePatterns
- [x] Playground sections
**PR:** #246
**Status:** done

### Stage 8.2: Dialogs (Dialog, AlertDialog, Sheet, Drawer)
**Branch prefix:** feat
**Branch:** feat/library-buildout/dialogs
**Issue:** #225
**PR:** #247
**Acceptance criteria:**
- [x] Dialog: compound, focus trap, focus restoration, Escape close, aria-modal, overlay background
- [x] AlertDialog: extends Dialog, auto-focus destructive action, aria-alertdialog
- [x] Sheet: bottom/side panel variant, drag-to-dismiss option
- [x] Drawer: side panel, persistent/temporary modes
- [x] All use useFocusScope, Portal
- [x] Shadow tokens ($sm-$2xl), animation tokens (slideIn*/fadeIn)
- [x] Tests passing (60), removed from testPathIgnorePatterns
- [x] Playground sections (top of gallery) + demo scene integration
**Status:** done

### Stage 8.3: Floating (Popover, Tooltip, HoverCard)
**Branch prefix:** feat
**Branch:** feat/library-buildout/floating
**Issue:** #226
**PR:** #248
**Acceptance criteria:**
- [x] Popover: compound, positioning (usePopoverPosition), focus management, arrow
- [x] Tooltip: delay, positioning, aria-describedby on trigger
- [x] HoverCard: hover-triggered popover, delay, pointer tracking
- [x] All use Portal, positioning logic
- [x] Tests passing (30), removed from testPathIgnorePatterns
- [x] Playground sections (top of gallery) + demo scene integration
**Status:** done

### Stage 8.4: Feedback Overlay (Toast)
**Branch prefix:** feat
**Branch:** feat/library-buildout/toast
**Issue:** #227
**PR:** #249
**Acceptance criteria:**
- [x] Toast: compound, queue management, auto-dismiss, imperative API
- [x] Toaster container, positioning (top/bottom × left/center/right)
- [x] aria-live announcements
- [x] Enter/exit animations
- [x] Tests passing (25), removed from testPathIgnorePatterns
- [x] Playground section (top of gallery) + demo scene integration
**Status:** done

## Epic 9: React Native Parity (Core)
**Objective:** .native.tsx for Epics 6-8 components — enough for real-world cross-platform apps. Remaining RN work done incrementally after later web epics.
**Dependencies:** Epic 8
**Epic slug:** rn-parity
**Epic branch:** epic/rn-parity
**Epic issue:** #231
**Epic PR:** #253 (merged)
**Status:** done

### Stage 9.1: Display Native Implementations
**Branch prefix:** feat
**Branch:** feat/library-buildout/rn-display
**Issue:** #232
**PR:** #250
**Acceptance criteria:**
- [x] Alert, Avatar, Badge, Card, Empty, Item, Progress, Separator, ButtonGroup .native.tsx
- [x] API parity with web versions
- [x] Exported from index.native.ts
**Status:** done

### Stage 9.2: Form Control Native Implementations
**Branch prefix:** feat
**Branch:** feat/library-buildout/rn-forms
**Issue:** #233
**PR:** #251
**Acceptance criteria:**
- [x] Button, Input, Textarea, NativeSelect, Checkbox, Switch, RadioGroup, Toggle, ToggleGroup, Slider, InputOTP, InputGroup, Field, Form .native.tsx
- [x] Platform-specific adaptations (PanResponder for Slider, RN Switch)
- [x] Exported from index.native.ts
**Status:** done

### Stage 9.3: Overlay Native + Expo Showcase
**Branch prefix:** feat
**Branch:** feat/library-buildout/rn-disclosure
**Issue:** #234
**PR:** #252
**Acceptance criteria:**
- [x] Accordion, Collapsible, Dialog, AlertDialog, Sheet, Drawer, Popover, Tooltip, HoverCard, Toast .native.tsx
- [x] RN Animated API for animations, Modal for overlays
- [x] Expo showcase app screens (Display, Form, Disclosure, Overlay)
**Status:** done

## Epic 10: Menus & Navigation
**Objective:** Complex keyboard navigation, roving tabindex, typeahead. react-aria-backed where appropriate.
**Dependencies:** Epic 8
**Epic slug:** menus-navigation
**Epic branch:** epic/menus-navigation
**Epic issue:** #219
**Epic PR:** #257 (merged)
**Status:** done

### Stage 10.1: Menus (Menu, DropdownMenu, ContextMenu, Menubar)
**Branch prefix:** feat
**Branch:** feat/library-buildout/menus
**Issue:** #228
**PR:** #254
**Acceptance criteria:**
- [x] Menu: compound, roving tabindex, typeahead, nested submenus, CheckboxItem, RadioGroup/RadioItem
- [x] DropdownMenu: click-triggered menu with all sub-components
- [x] ContextMenu: right-click trigger + Menu at cursor position
- [x] Menubar: horizontal bar, hover-switching, ArrowLeft/Right navigation
- [x] Tests passing (64), removed from testPathIgnorePatterns
- [x] Playground section + demo scene integration
**Status:** done

### Stage 10.2: Selection (Select, Combobox, Command)
**Branch prefix:** feat
**Branch:** feat/library-buildout/selection
**Issue:** #229
**PR:** #255
**Acceptance criteria:**
- [x] Select: compound listbox, keyboard nav, type-ahead, groups, ARIA listbox/option
- [x] Combobox: searchable select with filter, empty state, compound + options API
- [x] Command: command palette, search + action list, keyboard selection
- [x] Tests passing (44), removed from testPathIgnorePatterns
- [x] Playground sections + demo scene integration (Command in Dashboard)
**Status:** done

### Stage 10.3: Navigation (Tabs, NavigationMenu, Breadcrumb, Pagination, Sidebar)
**Branch prefix:** feat
**Branch:** feat/library-buildout/navigation
**Issue:** #230
**PR:** #256
**Acceptance criteria:**
- [x] Tabs: compound with useTabs, keyboard nav, horizontal/vertical orientation
- [x] NavigationMenu: hover-triggered dropdown nav, nav/menubar roles
- [x] Breadcrumb: semantic nav/ol/li, customizable separator, aria-current="page"
- [x] Pagination: controlled page state, prev/next, active highlighting
- [x] Sidebar: aside with groups/items, collapsible mode, active item variant
- [x] Tests passing (54), removed from testPathIgnorePatterns
- [x] Playground sections + demo scene integration (Tabs in Settings)
**Status:** done

## Epic 11: Complex & Data
**Objective:** Data-heavy components with complex state management. Full RN parity at every stage.
**Dependencies:** Epic 10
**Epic slug:** complex-data
**Epic issue:** #258
**Status:** pending

### Stage 11.1: Tables (Table, DataTable)
**Branch prefix:** feat
**Issue:** #259
**Acceptance criteria:**
- [ ] Table: compound (Head/Body/Row/Cell/Header/Footer), semantic HTML, sortable headers
- [ ] DataTable: TanStack Table integration, sorting, filtering, pagination, column visibility
- [ ] Responsive: horizontal scroll on small screens
- [ ] .native.tsx implementations with API parity (Table, DataTable)
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground sections (top of gallery) + demo scene integration
- [ ] Expo showcase screen updated
**Status:** pending

### Stage 11.2: Dates (Calendar, DatePicker)
**Branch prefix:** feat
**Issue:** #260
**Acceptance criteria:**
- [ ] Calendar: grid navigation, keyboard (arrows, Page Up/Down, Home/End), aria-grid
- [ ] DatePicker: Calendar + Input, date formatting, range support
- [ ] react-aria backed for calendar grid patterns
- [ ] .native.tsx implementations with API parity (Calendar, DatePicker)
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground sections (top of gallery) + demo scene integration
- [ ] Expo showcase screen updated
**Status:** pending

### Stage 11.3: Advanced Interaction (Carousel, ScrollArea, Resizable)
**Branch prefix:** feat
**Issue:** #261
**Acceptance criteria:**
- [ ] Carousel: compound, auto-play, keyboard, touch/swipe, aria-roledescription
- [ ] ScrollArea: custom scrollbar, overflow detection
- [ ] Resizable: compound (PanelGroup/Panel/Handle), keyboard resize, min/max constraints
- [ ] .native.tsx implementations with API parity (Carousel, ScrollArea, Resizable)
- [ ] Tests passing, removed from testPathIgnorePatterns
- [ ] Playground sections (top of gallery) + demo scene integration
- [ ] Expo showcase screen updated
**Status:** pending

## Epic 12: Blocks Rebuild
**Objective:** Rebuild all 13 pre-composed blocks on top of real components. Full RN parity at every stage.
**Dependencies:** Epic 11
**Epic slug:** blocks-rebuild
**Epic issue:** #262
**Status:** pending

### Stage 12.1: Core Blocks (AppShell, Auth, Dashboard, Sidebar, Hero, EmptyState)
**Branch prefix:** feat
**Issue:** #263
**Acceptance criteria:**
- [ ] Each block rebuilt using real components (no stubs)
- [ ] Responsive layout via STL tokens/conditions
- [ ] .native.tsx block compositions with API parity
- [ ] Playground sections (top of gallery) + demo scene integration
- [ ] Expo showcase screen updated
- [ ] Tests for composition and responsive behavior
**Status:** pending

### Stage 12.2: Interactive Blocks (ChatInterface, DataTable, Feed, FileUpload, NotificationCenter, OnboardingWizard, Pricing)
**Branch prefix:** feat
**Issue:** #264
**Acceptance criteria:**
- [ ] Each block rebuilt using real components
- [ ] Interactive behaviors working (file upload, chat input, wizard steps)
- [ ] .native.tsx block compositions with API parity
- [ ] Playground sections (top of gallery) + demo scene integration
- [ ] Expo showcase screen updated
- [ ] Tests
**Status:** pending

## Epic 13: Charts
**Objective:** Wrap Victory with owned API contract — leverage cross-platform charting (victory-native) while owning the component surface. Full RN parity at every stage.
**Dependencies:** Epic 11
**Epic slug:** charts
**Epic issue:** #265
**Status:** pending

### Stage 13.1: Chart Infrastructure
**Branch prefix:** feat
**Issue:** #266
**Acceptance criteria:**
- [ ] ChartContainer: responsive wrapper, theme integration via STL tokens
- [ ] ChartTooltip: styled tooltip overlay
- [ ] ChartLegend: styled legend
- [ ] ChartDataTable: accessible data table alternative for screen readers
- [ ] Victory wrapped behind owned API — consumers import from @vlting/ui, never from victory directly
- [ ] Lazy-loaded via separate subpath export (@vlting/ui/charts)
- [ ] .native.tsx implementations via victory-native (ChartContainer, ChartTooltip, ChartLegend)
- [ ] Playground sections (top of gallery) + demo scene integration
- [ ] Expo showcase screen updated
**Status:** pending

### Stage 13.2: Core Charts (LineChart, BarChart, AreaChart)
**Branch prefix:** feat
**Issue:** #267
**Acceptance criteria:**
- [ ] Each wraps Victory equivalent with owned props API
- [ ] Theme-aware (uses STL color tokens)
- [ ] Responsive sizing
- [ ] .native.tsx implementations via victory-native with API parity
- [ ] Tests for rendering and data handling
- [ ] Playground sections (top of gallery) + demo scene integration
- [ ] Expo showcase screen updated
**Status:** pending

### Stage 13.3: Specialized Charts (PieChart, RadarChart, RadialChart)
**Branch prefix:** feat
**Issue:** #268
**Acceptance criteria:**
- [ ] Each wraps Victory equivalent
- [ ] Theme-aware
- [ ] .native.tsx implementations via victory-native with API parity
- [ ] Tests, playground sections (top of gallery) + demo scene integration
- [ ] Expo showcase screen updated
**Status:** pending

## Epic 14: Playground & Docs
**Objective:** Full playground with routing + Expo native playground + docs site rebuild. RN parity verified across all platforms.
**Dependencies:** Epic 11 (playground alongside components), Epic 13 (docs after charts)
**Epic slug:** playground-docs
**Epic issue:** #269
**Status:** pending

### Stage 14.1: Playground Infrastructure
**Branch prefix:** feat
**Issue:** #270
**Acceptance criteria:**
- [ ] React Router added to playground app
- [ ] Sidebar nav listing all components grouped by category
- [ ] PermutationGrid utility component (auto-generates variant combinations)
- [ ] Code toggle showing JSX for each rendered permutation
- [ ] All component pages created (built alongside Epics 6-13)
**Status:** pending

### Stage 14.2: Expo Native Playground
**Branch prefix:** feat
**Issue:** #271
**Acceptance criteria:**
- [ ] Full Expo playground app at apps/playground-native
- [ ] Mirrors web playground structure — every component has a native demo page
- [ ] Tests native-specific behavior (touch, gestures, platform differences)
- [ ] Connected to same theme system
- [ ] Visual parity audit: web vs native for all components
**Status:** pending

### Stage 14.3: Docs Site Rebuild
**Branch prefix:** feat
**Issue:** #272
**Acceptance criteria:**
- [ ] Auto-generated prop tables from TypeScript types
- [ ] Live editable code examples
- [ ] Per-component pages (Purpose, Anatomy, Behavior, Accessibility, Styling, Composition)
- [ ] Copy-paste-ready import snippets for web AND native
- [ ] Platform toggle showing web/native code side-by-side
- [ ] Search functionality
- [ ] All component docs complete
**Status:** pending
