# Front-of-Frontend Audit Report

## Date: 2026-02-24
## Scope: @vlting/ui component library + kitchen-sink example
## Method: Source-only static audit (no runtime / dev server)

---

## Executive Summary

The `@vlting/ui` library contains 17 primitives, 46 component directories, 3 hooks, and 3 utilities — all with real implementations (no stubs). The project demonstrates strong architectural discipline in several areas: correct use of `styledHtml()` for semantic elements, proper delegation to accessible Tamagui primitives (`@tamagui/dialog`, `@tamagui/tabs`, `@tamagui/accordion`, etc.), clean compound component patterns, and consistent workarounds for Tamagui v2 RC type bugs.

However, three systemic issues affect a significant portion of the component library:

1. **`<div role="button">` anti-pattern** — 10 components use Tamagui `View`/`XStack`/`YStack` with `onPress` + `role="button"` instead of native `<button>` elements. These render as `<div>` elements that are not keyboard-focusable or activatable without explicit `tabIndex` and `onKeyDown` handlers. This is a WCAG 2.1.1 (Keyboard) violation.

2. **Hardcoded pixel values** — 16+ components use raw numeric `fontSize`, `padding`, `width`, `height`, and `gap` values instead of design tokens. This violates `AI_CONSTITUTION.md` section 2.6 and `FRONTEND_QUALITY.contract.md` section 3.

3. **Missing focus indicators** — Only 8 of ~46 components define `focusVisibleStyle`. Many interactive components lack visible focus styles entirely, violating WCAG 2.4.7/2.4.11.

The kitchen-sink example app is well-structured with proper landmarks, native elements, and heading hierarchy.

---

## Severity Scale

- **Critical**: Accessibility barrier — wrong semantic element, missing keyboard operability, missing ARIA for interactive component
- **Major**: Redundant DOM nodes, missing focus indicator, hardcoded values where tokens are required, cross-platform breakage
- **Minor**: Suboptimal nesting, missing optional ARIA, inconsistent spacing, documentation gaps

---

## Findings by Component

### Primitives (`packages/primitives/`)

#### Box
- **Semantic HTML**: Pass — clean `styled(View)` layout primitive
- **DOM Structure**: Pass — single element
- **Accessibility**: N/A (non-interactive)
- **Token Discipline**: Pass
- **Issues**: None

#### Divider
- **Semantic HTML**: Minor issue
- **DOM Structure**: Pass
- **Accessibility**: Missing `role="separator"` and `aria-orientation` (the sibling `Separator` component has these)
- **Token Discipline**: Pass — uses `$borderColor`, `$2`
- **Issues**:
  1. (Minor) Missing `role="separator"` and `aria-orientation` — duplicates the Separator concept

#### Heading
- **Semantic HTML**: Pass — correctly uses `styledHtml('h1')` through `styledHtml('h6')`
- **DOM Structure**: Pass
- **Accessibility**: Pass — native heading semantics
- **Token Discipline**: Pass — `$heading` font family, `$10`–`$3` size tokens
- **Issues**: None — exemplary implementation

#### Icon
- **Semantic HTML**: Pass
- **Accessibility**: Minor gap
- **Token Discipline**: Minor issue
- **Issues**:
  1. (Minor) No default `aria-hidden="true"` for decorative usage
  2. (Minor) Default `size = 20` is a raw pixel value, not a token

#### Label
- **Semantic HTML**: Pass — wraps `@tamagui/label` (native `<label>`)
- **Issues**: None

#### Text
- **Semantic HTML**: Pass
- **Token Discipline**: Minor issue
- **Issues**:
  1. (Minor) Font weights use hardcoded strings (`'300'`, `'400'`) instead of weight tokens

#### Kbd
- **Semantic HTML**: Pass — uses `styledHtml('kbd')`
- **Token Discipline**: Fail
- **Issues**:
  1. (Major) Hardcoded `fontSize: 11`/`12`, `lineHeight: '16px'`/`'18px'`, `paddingLeft: 4`/`6`, `minWidth: 20`/`24`

#### AspectRatio
- **Token Discipline**: Fail
- **Issues**:
  1. (Major) Raw CSS `style={{}}` with hardcoded `position` values — breaks Tamagui style system and cross-platform contract

#### Separator
- **Semantic HTML**: Pass — `role="separator"`, `aria-orientation`, `decorative` variant
- **Issues**: None — correct implementation

#### Skeleton
- **Accessibility**: Pass — `aria-hidden: true`
- **Issues**: None

#### Spinner
- **Accessibility**: Pass — `role="status"`, `aria-label="Loading"`
- **Token Discipline**: Fail
- **Issues**:
  1. (Major) Hardcoded pixel sizes (16/20/28 for container, 4/5/6 for dots)
  2. (Major) Uses `dangerouslySetInnerHTML` for CSS keyframes — web-only, no `prefers-reduced-motion`

#### VisuallyHidden
- **Issues**: None — correct sr-only technique

#### Spacer, Stack, Portal, Badge
- **Issues**: None to Minor — clean implementations

---

### Components (`packages/components/`)

#### Button
- **Semantic HTML**: Pass — uses `@tamagui/button` (native `<button>`)
- **Accessibility**: Pass — `focusVisibleStyle`, `aria-busy` when loading, `VisuallyHidden` loading text
- **Token Discipline**: Pass
- **Issues**: None — gold standard component

#### Input
- **Semantic HTML**: Pass — uses `@tamagui/input` (native `<input>`)
- **Accessibility**: Pass — `focusVisibleStyle`, `aria-invalid`, `aria-describedby`, native `<label>` with `htmlFor`/`id`
- **Issues**: None — exemplary form component

#### Textarea
- **Semantic HTML**: Pass — native `<textarea>`
- **Accessibility**: Pass — same ARIA pattern as Input
- **Issues**:
  1. (Minor) Missing `focusVisibleStyle` (Input has it, Textarea does not)

#### Checkbox
- **Semantic HTML**: Pass — `@tamagui/checkbox` with native `<label>`
- **Accessibility**: Pass — `focusVisibleStyle`
- **Issues**:
  1. (Minor) Hardcoded `gap: 8`, `fontSize: 14`, `fontWeight: '700'`, inline `style={{}}` on label

#### Switch
- **Semantic HTML**: Pass — `@tamagui/switch`
- **Accessibility**: Pass — `focusVisibleStyle`, animation token
- **Issues**:
  1. (Major) Hardcoded `padding: 3`, `borderRadius: 999`, thumb sizes (16/20/24 px), track widths (48/60/72 px)

#### RadioGroup
- **Semantic HTML**: Pass — `@tamagui/radio-group`, native `<label>`
- **Accessibility**: Pass — `focusVisibleStyle`, `aria-label`
- **Issues**:
  1. (Minor) Hardcoded `gap: 8`, `borderRadius: 1000`

#### Select
- **Semantic HTML**: Pass — `@tamagui/select`
- **Accessibility**: Pass — `focusVisibleStyle`
- **Issues**:
  1. (Minor) Hardcoded `fontSize: 12` on chevron

#### Dialog
- **Semantic HTML**: Pass — `@tamagui/dialog` (focus trap, Escape key)
- **Issues**:
  1. (Minor) Hardcoded `maxWidth` values (400/500/640), `maxHeight: '85%'`

#### Accordion
- **Semantic HTML**: Pass — `@tamagui/accordion` (ARIA, keyboard)
- **Accessibility**: Pass — `focusVisibleStyle`
- **Issues**:
  1. (Minor) CSS transition `'transform 200ms ease'` with no `prefers-reduced-motion`

#### Alert
- **Semantic HTML**: Pass — `role="alert"` for destructive, `role="status"` for default
- **Issues**:
  1. (Major) Hardcoded `width: 16`, `height: 16`, `marginTop: 2` on icon frame

#### AlertDialog
- **Semantic HTML**: Pass — `@tamagui/alert-dialog`
- **Issues**:
  1. (Minor) Hardcoded `maxWidth: 500`, `maxHeight: '85%'`, shadow values

#### Avatar
- **Accessibility**: Pass — `role="img"`, `aria-label` fallback chain
- **Issues**:
  1. (Major) Hardcoded pixel sizes for all variants (32/40/56/72 px), `borderRadius: 1000`

#### Breadcrumb
- **Semantic HTML**: Pass — `<nav aria-label="Breadcrumb">`, `<ol>`, `<li>`, `<a>`, `aria-current="page"`
- **Issues**:
  1. (Minor) Injects `<style>` tag via `document.createElement` for focus styles
  2. (Minor) Hardcoded `gap: 4`, `borderRadius: 2`

#### ButtonGroup
- **DOM Structure**: Fail
- **Issues**:
  1. (Major) `dangerouslySetInnerHTML` for CSS border-radius — web-only
  2. (Major) Extra wrapper `<div>` solely for style injection
  3. (Major) No `role="group"` or `aria-label`

#### Calendar
- **Semantic HTML**: Fail
- **Issues**:
  1. (Critical) Nav arrows use `ViewJsx` with `onPress` + `role="button"` — not keyboard-focusable
  2. (Critical) Day cells use `ViewJsx` with `onPress` — not focusable
  3. (Critical) No `<table>` or `role="grid"` wrapping the calendar grid
  4. (Critical) No keyboard navigation (arrow keys between days)
  5. (Major) Hardcoded pixel values throughout

#### Carousel
- **Semantic HTML**: Partial — `role="region"`, `aria-roledescription="carousel"`, arrow key support
- **Issues**:
  1. (Critical) Previous/Next buttons are `ViewJsx` with `onPress` — not keyboard-focusable
  2. (Critical) Dot indicators are 8x8 px (below 24x24 minimum) and not keyboard-focusable
  3. (Major) CSS transitions with no `prefers-reduced-motion`
  4. (Major) Hardcoded pixel values throughout

#### Collapsible
- **Semantic HTML**: Pass — `@tamagui/collapsible`, `role="region"`
- **Issues**:
  1. (Minor) Missing `focusVisibleStyle` — relies on consumer

#### Combobox
- **Semantic HTML**: Partial — correct ARIA roles, `styledHtml('input')` for search
- **Issues**:
  1. (Critical) Trigger is `ViewJsx` with `onPress` — not keyboard-focusable
  2. (Critical) Options are `ViewJsx` with `onPress` — not focusable
  3. (Major) No focus management when dropdown opens
  4. (Major) Hardcoded pixel values throughout

#### Command
- **Semantic HTML**: Partial — `styledHtml('input')`, `role="listbox"`, `role="option"`
- **Issues**:
  1. (Critical) Items use `ViewJsx` with `onPress` — not focusable
  2. (Critical) No keyboard navigation between items
  3. (Major) Hardcoded pixel values throughout

#### ContextMenu
- **Semantic HTML**: Partial — correct ARIA roles
- **Issues**:
  1. (Critical) Menu items are `ViewJsx` with `onPress` — not focusable or keyboard-activatable
  2. (Critical) No keyboard navigation (ArrowUp/Down, Home/End, Escape)
  3. (Major) Hardcoded pixel values

#### DatePicker
- **Semantic HTML**: Fail
- **Issues**:
  1. (Critical) `TriggerFrame` uses `tag="button"` — confirmed broken in Tamagui v2 RC (renders `<div tag="button">`)
  2. (Critical) Nav buttons and day cells use styled `XStack` with `onPress` — not keyboard-focusable
  3. (Major) Uses `document.addEventListener` directly — web-only
  4. (Major) Hardcoded pixel values

#### DateRangePicker
- **Semantic HTML**: Fail (same issues as DatePicker)
- **Issues**: Same as DatePicker — broken `tag="button"`, non-native buttons, direct DOM listeners
- **Additional**: Duplicates ~200 lines of calendar utility code

#### Drawer
- **Semantic HTML**: Partial — uses `@tamagui/dialog` for modal behavior
- **Issues**:
  1. (Major) `Title` renders in `ViewJsx` (`<div>`) instead of a heading element
  2. (Major) Hardcoded `width: 48`, `height: 4`, `margin` values

#### DropdownMenu
- **Semantic HTML**: Partial — correct ARIA roles
- **Issues**:
  1. (Critical) Trigger is `ViewJsx` with `onPress` — not a `<button>`
  2. (Critical) Menu items are `ViewJsx` with `onPress` — not focusable
  3. (Critical) No keyboard navigation within menu
  4. (Major) Hardcoded pixel values

#### Form
- **Semantic HTML**: Pass — `@tamagui/form` (native `<form>`), native `<label>`, `role="alert"` on errors
- **Issues**:
  1. (Minor) `onSubmit` receives dummy `{} as React.FormEvent`

#### HoverCard
- **Issues**:
  1. (Minor) Content only appears on hover — no keyboard/focus trigger
  2. (Minor) Hardcoded `minWidth: 256`, margin values

#### InputOTP
- **Semantic HTML**: Pass — hidden native `<input>` with `inputMode="numeric"`, `autoComplete="one-time-code"`
- **Issues**:
  1. (Major) Hardcoded pixel values: `width: 40`, `height: 44`, `fontSize: 20`, etc.

#### Loader
- **Issues**: None — delegates to Spinner primitive

#### Menu
- **Semantic HTML**: Pass — uses `@tamagui/menu` (native menu semantics, keyboard)
- **Issues**: None

#### Menubar
- **Semantic HTML**: Partial — correct ARIA roles on all elements
- **Issues**:
  1. (Critical) Triggers and items are `ViewJsx` — not keyboard-focusable
  2. (Critical) No keyboard navigation between menu bar items
  3. (Major) Module-level `let menuIdCounter` — not SSR-safe
  4. (Major) Hardcoded pixel values

#### NativeSelect
- **Semantic HTML**: Pass — `styledHtml('select')`, `styledHtml('option')`
- **Issues**:
  1. (Major) Hardcoded `height`, `padding`, `fontSize` values

#### NavigationMenu
- **Semantic HTML**: Partial — `role="navigation"`, `aria-label`
- **Issues**:
  1. (Critical) Trigger is `ViewJsx` with `role="button"` — not a `<button>`
  2. (Critical) Link sub-component uses `ViewJsx` with `role="link"` — not an `<a>` element
  3. (Major) Module-level `let navItemId` — not SSR-safe
  4. (Major) Hardcoded pixel values

#### Pagination
- **Semantic HTML**: Pass — composes `Button` (native `<button>`), `role="navigation"`, `aria-current="page"`
- **Issues**: None — exemplary

#### Popover
- **Semantic HTML**: Pass — `@tamagui/popover`
- **Issues**: None

#### Progress
- **Semantic HTML**: Pass — `@tamagui/progress` (`role="progressbar"`, `aria-valuenow`, `aria-valuemax`)
- **Issues**: None

#### Resizable
- **Semantic HTML**: Partial — `role="separator"`, `tabIndex={0}`
- **Issues**:
  1. (Major) No keyboard support for resizing (arrow keys expected)
  2. (Major) `document.addEventListener('mousemove')` — web-only
  3. (Minor) Hardcoded `width: 4`, `height: 16`

#### ScrollArea
- **Issues**:
  1. (Minor) `dangerouslySetInnerHTML` for scrollbar CSS — web-only
  2. (Minor) Sub-components return `null` (API compatibility stubs)

#### Sheet
- **Semantic HTML**: Pass — `@tamagui/sheet`
- **Issues**: None

#### Sidebar
- **Semantic HTML**: Partial — `role="complementary"`, `aria-label`, `styledHtml('h3')` for group labels
- **Issues**:
  1. (Critical) Trigger is `ViewJsx` with `role="button"` — not keyboard-focusable
  2. (Critical) Menu items are `ViewJsx` with `onPress` — not focusable
  3. (Major) CSS transition without `prefers-reduced-motion`
  4. (Major) Hardcoded pixel values throughout

#### Slider
- **Semantic HTML**: Pass — `@tamagui/slider` (`role="slider"`, `aria-valuemin/max/now`)
- **Issues**: None

#### Table
- **Semantic HTML**: Pass — native `<table>`, `<thead>`, `<tbody>`, `<th scope="col">`, `<td>`, `<caption>`
- **Issues**:
  1. (Minor) Hardcoded hex fallback values in CSS custom properties

#### Tabs
- **Semantic HTML**: Pass — `@tamagui/tabs` (correct ARIA, keyboard navigation)
- **Accessibility**: Pass — `focusVisibleStyle`
- **Issues**: None

#### Toast
- **Semantic HTML**: Pass — `@tamagui/toast`
- **Issues**: None

#### Toggle
- **Semantic HTML**: Pass — `styledHtml('button')`, `type="button"`, `aria-pressed`, `aria-disabled`
- **Issues**: None — exemplary

#### Tooltip
- **Semantic HTML**: Pass — `@tamagui/tooltip`
- **Issues**: None

#### Typography
- **Semantic HTML**: Pass — all elements use `styledHtml()` (h1-h4, p, span, blockquote, code, ul, li)
- **Issues**:
  1. (Major) All `fontSize` and `lineHeight` values are hardcoded pixels instead of tokens
  2. (Minor) Hardcoded `letterSpacing`, `paddingLeft`/`paddingTop` values

---

## Findings: Kitchen-Sink Example App

### BrandLayout (main layout)
- **Page Structure**: Pass — `role="banner"`, `<nav aria-label>`, `role="main"`, native `<button>` elements
- **Heading Hierarchy**: Pass — `<h2>` for nav groups, content sections use `Heading level={2}`
- **Navigation**: Pass — `<ul>`/`<li>` lists, React Router `<Link>` (renders `<a>`)
- **Issues**:
  1. (Minor) Hardcoded `backgroundColor="rgba(0,0,0,0.4)"` for mobile overlay
  2. (Minor) Brand selector uses `window.location.href` (full page reload)
  3. (Minor) Hardcoded `paddingLeft: 36` for sub-items

### Section Component
- Pass — `<Heading level={2}>` with auto-generated `id` for anchor linking

---

## Cross-Cutting Findings

### 1. The `<div role="button">` Problem

**Affected components (10):** Calendar, Carousel, Combobox, ContextMenu, DatePicker, DateRangePicker, DropdownMenu, Menubar, NavigationMenu, Sidebar

These components render `<div>` elements with `role="button"` or `role="menuitem"` but without `tabIndex={0}` or keyboard event handlers. They are invisible to keyboard users navigating via Tab and cannot be activated with Enter/Space. This is a WCAG 2.1.1 (Keyboard) and 4.1.2 (Name, Role, Value) failure.

**Fix:** Replace all `ViewJsx`/`XStack`/`YStack` button patterns with native `<button>` elements or `styledHtml('button')`.

### 2. The `tag="button"` Bug

**Affected components (2):** DatePicker, DateRangePicker

These use `tag: 'button'` in `styled()` — confirmed broken in Tamagui v2 RC (renders `<div tag="button">`).

**Fix:** Replace with `styledHtml('button')` or native `<button>` wrapper.

### 3. Token Discipline Violations

**16+ components** use hardcoded pixel values for sizing, spacing, and typography. Components with fully token-based styling (Button, Input, Tabs, Dialog, etc.) prove the pattern works — the issue is inconsistent adoption.

### 4. Missing Focus Indicators

**Only 8 of ~46 components** define `focusVisibleStyle`: Button, Input, Checkbox, Switch, RadioGroup, Select, Accordion, Tabs.

Components that need but lack focus indicators: DropdownMenu, ContextMenu, Combobox, Command, Menubar, NavigationMenu, Calendar, Carousel, DatePicker, DateRangePicker, Sidebar, Resizable, HoverCard.

### 5. Reduced Motion

Several components use CSS transitions or animations without `prefers-reduced-motion` support: Spinner (keyframes), Carousel, Accordion (chevron rotation), Sidebar (width transition).

### 6. Web-Only APIs

Several components use web-only APIs without React Native fallbacks:
- `dangerouslySetInnerHTML`: Spinner, ButtonGroup, ScrollArea
- `document.addEventListener`: DatePicker, DateRangePicker, Resizable
- `document.createElement('style')`: Breadcrumb

---

## What Is Done Well

1. **Tamagui v2 RC pattern mastery** — Consistent `as ComponentType<Record<string, unknown>>` casting with clear comments
2. **`styledHtml()` adoption** — Heading, Kbd, NativeSelect, Toggle, Typography, Combobox input, Command input correctly render native elements
3. **Tamagui primitive delegation** — Components using `@tamagui/dialog`, `@tamagui/tabs`, `@tamagui/accordion`, `@tamagui/slider`, `@tamagui/progress`, `@tamagui/toast`, `@tamagui/popover`, `@tamagui/menu`, `@tamagui/toggle-group` inherit correct ARIA automatically
4. **Button and Input as gold standards** — Proper native elements, focus styles, ARIA, token discipline
5. **Breadcrumb and Pagination** — Exemplary semantic HTML with landmarks, lists, and ARIA attributes
6. **Compound component pattern** — Clean, consistent API across Dialog, Alert, Accordion, Form, Select, RadioGroup, Checkbox
7. **Kitchen-sink architecture** — Proper landmarks, native elements, heading hierarchy, section IDs

---

## Summary Statistics

| Metric | Count |
|---|---|
| Total primitives audited | 17 |
| Total components audited | 46 |
| Total hooks audited | 3 |
| Total utils audited | 3 |
| Critical issues | 10 components affected |
| Major issues | 10 components affected |
| Minor issues | 12 components affected |
| Clean (no issues) | ~15 components |

---

## Recommended Priority Fixes

### Priority 1: Critical — Keyboard Accessibility

Replace all `<div role="button">` / `<div role="menuitem">` patterns with native `<button>` elements across 10 components. This is the single highest-impact fix for accessibility.

**Components:** Calendar, Carousel, Combobox, ContextMenu, DatePicker, DateRangePicker, DropdownMenu, Menubar, NavigationMenu, Sidebar

### Priority 2: Critical — Fix `tag="button"` Bug

Replace `tag: 'button'` with `styledHtml('button')` or native `<button>` wrapper in DatePicker and DateRangePicker trigger frames.

### Priority 3: Major — Add Focus Indicators

Add `focusVisibleStyle` to all interactive components that lack it (matching the standard pattern from `FRONTEND_QUALITY.contract.md`).

### Priority 4: Major — Token Discipline

Replace hardcoded pixel values with design tokens in the 16+ affected components. Prioritize components with the most violations: Typography, Calendar, Carousel, Combobox, Command, Menubar, NavigationMenu.

### Priority 5: Major — Reduced Motion Support

Add `prefers-reduced-motion` support to all animated components: Spinner, Carousel, Accordion, Sidebar.

### Priority 6: Major — Cross-Platform

Replace `dangerouslySetInnerHTML` and direct `document.*` calls with Tamagui/React abstractions, or clearly document web-only components as such.

### Priority 7: Minor — Misc Cleanup

- Add `role="group"` to ButtonGroup
- Add `aria-hidden="true"` default to Icon
- Fix Drawer Title to use a heading element
- Add keyboard resize support to Resizable
