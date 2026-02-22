# Component Spec — Tabs (Headless)

## 1. Purpose

- Provides a tabbed interface that organizes content into mutually exclusive panels, with only one panel visible at a time.
- Use when content can be logically grouped into distinct sections and the user benefits from switching between them without navigating to a new page.
- Do NOT use for sequential steps (use a stepper), for navigation between pages (use a nav bar), or for collapsible sections that can all be open simultaneously (use an accordion).

---

## 2. UX Intent

- **Primary interaction goal**: Allow the user to switch between related content panels quickly with clear indication of which panel is active.
- **Expected user mental model**: A standard tabbed interface where clicking a tab reveals its associated content and hides the others. Arrow keys move between tabs.
- **UX laws applied**:
  - **Jakob's Law** -- Tab behavior must match the WAI-ARIA Tabs pattern that users expect: arrow keys navigate, Enter/Space select, only one panel is visible.
  - **Hick's Law** -- Tabs reduce decision complexity by chunking content into clearly labeled groups rather than presenting everything at once.
  - **Miller's Law** -- Tabs help organize information into manageable chunks, keeping the visible content within cognitive limits.
  - **Gestalt Proximity** -- Tab triggers are grouped together in a list, visually and semantically associated with their panels.

---

## 3. Visual Behavior

This is a headless component. It renders semantic HTML (`<div>`, `<button>`) with no built-in styles, design tokens, or theme dependencies. All visual behavior -- active tab highlighting, panel transitions, layout direction, and spacing -- is the consumer's responsibility. Consumers style via `className`, rest props, or `data-state` / `data-orientation` attribute selectors.

---

## 4. Interaction Behavior

### States

| Element | State | Condition | `data-state` |
|---------|-------|-----------|--------------|
| Trigger | Active | Trigger's `value` matches the active tab value | `active` |
| Trigger | Inactive | Trigger's `value` does not match the active tab value | `inactive` |
| Trigger | Disabled | `disabled` prop is `true` | native `disabled` attribute set |
| Content | Active | Content's `value` matches the active tab value | `active` (rendered) |
| Content | Inactive | Content's `value` does not match the active tab value | not rendered (`null`) |

- Hover, focus, and active visual states are not managed by this component; they are the consumer's responsibility via CSS.

### Controlled vs Uncontrolled

- **Controlled**: Pass `value` and `onValueChange`. The component reflects the `value` prop and calls `onValueChange` on interaction.
- **Uncontrolled**: Pass `defaultValue`. The component manages its own state internally and calls `onValueChange` on every change.

### Keyboard Behavior

All keyboard behavior applies when focus is within `Tabs.List`.

| Key | Orientation | Behavior |
|-----|-------------|----------|
| **ArrowRight** | Horizontal | Move to next tab (loops from last to first). Selects the tab automatically. |
| **ArrowLeft** | Horizontal | Move to previous tab (loops from first to last). Selects the tab automatically. |
| **ArrowDown** | Vertical | Move to next tab (loops from last to first). Selects the tab automatically. |
| **ArrowUp** | Vertical | Move to previous tab (loops from first to last). Selects the tab automatically. |
| **Home** | Both | Move to first tab. Selects the tab automatically. |
| **End** | Both | Move to last tab. Selects the tab automatically. |
| **Enter** | Both | Select the currently focused tab. |
| **Space** | Both | Select the currently focused tab. |

- All of the above keys call `preventDefault` to avoid default scroll behavior.
- Navigation uses **automatic activation**: moving focus via arrow keys immediately selects and activates the tab (not manual activation where the user must press Enter/Space to confirm).
- Navigation loops: moving past the last tab wraps to the first, and vice versa.

### Screen Reader Behavior

- The tab list is announced as a `tablist` with its orientation.
- Each trigger is announced as a `tab` with its selected state.
- Each panel is announced as a `tabpanel` with a label referencing its trigger.
- The association between triggers and panels is communicated via `aria-controls` / `aria-labelledby` ID linkage.

### Motion Rules

- No motion is built in. Consumer-applied transitions (panel transitions, active-tab indicator animations) should respect `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

### ARIA Attributes

| Element | Attribute | Value |
|---------|-----------|-------|
| List (`<div>`) | `role` | `"tablist"` |
| List (`<div>`) | `aria-orientation` | `"horizontal"` or `"vertical"` |
| Trigger (`<button>`) | `role` | `"tab"` |
| Trigger (`<button>`) | `aria-selected` | `true` when active, `false` when inactive |
| Trigger (`<button>`) | `aria-controls` | `"tabpanel-{value}"` linking to the associated panel |
| Trigger (`<button>`) | `id` | `"tab-{value}"` for panel back-reference |
| Trigger (`<button>`) | `type` | `"button"` |
| Trigger (`<button>`) | `disabled` | native disabled attribute when `disabled` is `true` |
| Content (`<div>`) | `role` | `"tabpanel"` |
| Content (`<div>`) | `id` | `"tabpanel-{value}"` |
| Content (`<div>`) | `aria-labelledby` | `"tab-{value}"` linking back to the trigger |

### Data Attributes

| Element | Attribute | Values |
|---------|-----------|--------|
| Root | `data-orientation` | `"horizontal"` / `"vertical"` |
| Trigger | `data-state` | `"active"` / `"inactive"` |
| Content | `data-state` | `"active"` (only rendered when active) |

### Focus Rules

- **Roving tabindex**: The active trigger has `tabIndex={0}`; all inactive triggers have `tabIndex={-1}`. Only the active tab participates in the page's tab order.
- **Tab panel focusable**: Content has `tabIndex={0}` so the panel itself is focusable, allowing keyboard users to Tab from the active trigger into the panel content.
- No focus trap is needed.
- No focus restoration is needed.

### Contrast Expectations

N/A -- headless component. Consumer is responsible for meeting WCAG contrast ratios.

### Reduced Motion Behavior

N/A -- no built-in animations. Consumer-applied animations must respect `prefers-reduced-motion`.

---

## 6. Theming Rules

This is a headless component. It has no theming, no design tokens, and no built-in styles. Theming is entirely the consumer's responsibility.

---

## 7. Composition Rules

### What Can Wrap It

- Any layout container (section, aside, card, page region).
- `Tabs.Root` can be placed anywhere in the component tree.

### What It May Contain

- `Tabs.Root` must contain exactly one `Tabs.List` and one or more `Tabs.Content` components.
- `Tabs.List` must contain one or more `Tabs.Trigger` components.
- Each `Tabs.Trigger` must have a unique `value` string.
- Each `Tabs.Content` must have a `value` string matching a corresponding `Tabs.Trigger`.
- `Tabs.Trigger` may contain any React node (text, icons, badges).
- `Tabs.Content` may contain any React node (the panel body).

### Anti-Patterns

- Do NOT use any compound child (`List`, `Trigger`, `Content`) outside of `Tabs.Root`. It will throw a context error.
- Do NOT use duplicate `value` strings across triggers; duplicates are silently ignored by the registration mechanism, leading to unpredictable keyboard navigation.
- Do NOT place `Tabs.Content` inside `Tabs.List`; panels must be siblings of the list, not children.
- Do NOT mix orientation-specific arrow key expectations; set `orientation` once on Root and keep it consistent.

### Context Boundaries

- All compound children must be rendered inside `Tabs.Root`.
- Using any compound child outside of Root throws: `"Tabs compound components must be used within Tabs.Root"`.
- Each `Tabs.Trigger` registers its `value` into the context's `tabIds` array on mount. The array preserves insertion order and drives keyboard navigation indexing.

---

## 8. Performance Constraints

### Memoization Rules

- `onValueChange` callback should be stable (memoized by the consumer) to avoid unnecessary re-renders of the entire tab tree.
- The `registerTab` function is memoized via `useCallback` to prevent unnecessary re-registrations.
- The keyboard navigation handler is derived from `useKeyboardNavigation` and depends on `tabIds.length`, `activeIdx`, and `orientation`.

### Render Boundaries

- Only the active `Tabs.Content` is rendered to the DOM. Inactive panels return `null`, preventing unnecessary DOM nodes and render cost.
- Changing the active tab causes the previous Content to unmount and the new Content to mount. Consumer code inside panels should account for mount/unmount lifecycle.
- Tab registration (`registerTab`) uses a de-duplication check (`includes`) to avoid unnecessary state updates when triggers re-render.

---

## 9. Test Requirements

### What Must Be Tested

- Only one panel is visible at a time; non-active panels are not in the DOM.
- Clicking a trigger activates its associated panel.
- Controlled mode reflects the `value` prop and calls `onValueChange`.
- Uncontrolled mode activates the `defaultValue` tab initially and toggles on interaction.
- Disabled triggers do not activate on click.
- Tab registration preserves insertion order.
- External value changes (controlled mode) sync the active tab correctly.

### Interaction Cases

- **Mouse**: Clicking a trigger activates it. Clicking a disabled trigger does nothing.
- **Keyboard -- ArrowRight** (horizontal): Moves to the next tab and activates it; wraps from last to first.
- **Keyboard -- ArrowLeft** (horizontal): Moves to the previous tab and activates it; wraps from first to last.
- **Keyboard -- ArrowDown** (vertical): Moves to the next tab and activates it; wraps from last to first.
- **Keyboard -- ArrowUp** (vertical): Moves to the previous tab and activates it; wraps from first to last.
- **Keyboard -- Home**: Moves to the first tab and activates it.
- **Keyboard -- End**: Moves to the last tab and activates it.
- **Keyboard -- Enter/Space**: Activates the currently focused tab.
- **Tab key**: Focus moves from the active trigger (tabIndex=0) to the panel (tabIndex=0), skipping inactive triggers (tabIndex=-1).

### Accessibility Checks

- `role="tablist"` is present on List.
- `aria-orientation` matches the `orientation` prop.
- `role="tab"` is present on each Trigger.
- `aria-selected` is `true` on the active Trigger and `false` on all others.
- `aria-controls` on each Trigger matches the `id` of its associated Content panel.
- `role="tabpanel"` is present on Content.
- `aria-labelledby` on Content matches the `id` of its associated Trigger.
- Active Trigger has `tabIndex={0}`; inactive Triggers have `tabIndex={-1}`.
- Content has `tabIndex={0}`.
- `data-state` and `data-orientation` attributes reflect correct values.
- Using any compound child outside of `Tabs.Root` throws the expected context error.
