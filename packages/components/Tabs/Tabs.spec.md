# Component Spec — Tabs

## 1. Purpose

- Provides a tabbed navigation interface that allows users to switch between related content panels within the same view.
- Should be used when content can be logically divided into discrete, parallel sections that share context (e.g., settings categories, detail views, data tabs).
- Should NOT be used for primary site navigation (use a navigation bar or sidebar), for sequential steps (use a stepper), or when the user needs to compare content across tabs simultaneously.

---

## 2. UX Intent

- **Primary interaction goal:** Let the user quickly switch between related content sections without leaving the current view, while clearly indicating which section is active.
- **Expected user mental model:** "I click a tab label and the content below changes. Only one tab is active at a time." This follows the universal tab bar pattern.
- **UX laws applied:**
  - **Jakob's Law** — Tabs must follow the standard tabbed interface pattern: horizontal list of triggers with underline indicator, single active panel.
  - **Hick's Law** — The number of tabs should remain manageable. The component supports this by providing clear visual distinction between active and inactive triggers.
  - **Miller's Law** — Tab labels should be concise. The visual design (size variants, font scaling) supports scanability.
  - **Gestalt Principles (Common Region & Proximity)** — The tab list border and active indicator visually connect triggers to their content panel. The content panel sits directly below the list.
  - **Doherty Threshold** — Tab switching must be instant (no loading delay). Content panels mount/unmount immediately.

---

## 3. Visual Behavior

- **Layout:** `Tabs.List` is a horizontal row (`XStack`) with a 1px bottom border. `Tabs.Content` panels stack below the list.
- **Spacing:** Trigger padding scales with `size` variant — `sm` = `$2`/`$1`, `md` = `$3`/`$2`, `lg` = `$4`/`$3`. Content panel has `$3` vertical padding. List has no gap between triggers (`gap: '$0'`).
- **Typography:** Trigger text uses `$body` font family with `$3` weight. Font size scales with `size` variant (`$2`, `$3`, `$4`). Active trigger text uses `$color10`. Inactive trigger text uses `$colorSubtitle`.
- **Active indicator:** A 2px bottom border on the active trigger, colored `$color10`. Inactive triggers have a transparent bottom border.
- **Token usage:** All colors, spacing, and fonts resolve from Tamagui design tokens. No hardcoded color or spacing values.
- **Responsive behavior:** Accepts Tamagui media query props. The tab list does not wrap by default; on narrow screens, the consumer is responsible for handling overflow (e.g., horizontal scroll or responsive size variant).

### Sub-component visual behavior

- **Tabs.List** — Horizontal row with bottom border (`$borderColor`). Contains all triggers.
- **Tabs.Trigger** — Individual tab button. Shows hover background (`$backgroundHover`). Active state applies `$color10` bottom border.
- **Tabs.Content** — Panel area below the tab list. Padded with `$3` vertically. Only the active panel is rendered.

---

## 4. Interaction Behavior

- **States:**
  - **Trigger idle (inactive)** — Text in `$colorSubtitle`, transparent bottom border. Pointer cursor.
  - **Trigger hover** — Background shifts to `$backgroundHover`.
  - **Trigger active (selected)** — Text in `$color10`, 2px `$color10` bottom border.
  - **Trigger disabled** — Cannot be selected via click. Native `disabled` attribute is set.
  - **Trigger focus** — Receives focus via keyboard navigation. `tabIndex` is `0` for the selected trigger, `-1` for all others (roving tabindex).
- **Controlled vs uncontrolled:** `Tabs.Root` supports both patterns. Controlled via `value` + `onValueChange`. Uncontrolled via `defaultValue`. State management is handled in the headless layer.
- **Keyboard behavior:**
  - **Arrow keys** (Left/Right for horizontal, Up/Down for vertical) move focus between triggers. Navigation loops at the ends.
  - **Enter/Space** selects the focused trigger.
  - **Tab** moves focus into the active content panel (via `tabIndex={0}` on the panel), then out of the tabs component.
- **Screen reader behavior:**
  - List announces as `role="tablist"` with `aria-orientation`.
  - Each trigger announces as `role="tab"` with `aria-selected` (true/false), `aria-controls` (linking to its panel ID).
  - Each content panel announces as `role="tabpanel"` with `aria-labelledby` (linking to its trigger ID).
  - Tab/panel IDs follow the pattern `tab-{value}` / `tabpanel-{value}`.
- **Motion rules:** No animations are defined on tab switching. Content panels mount and unmount instantly. Hover background changes are instant.

### Sub-component interaction behavior

- **Tabs.Root** — Provides context for selection state and orientation. Does not render interactive elements itself.
- **Tabs.List** — Handles keyboard navigation via `useKeyboardNavigation`. Renders the `role="tablist"` container.
- **Tabs.Trigger** — Registers with the headless context on mount. Renders as a `<button>` with `role="tab"`. Click selects the tab (if not disabled).
- **Tabs.Content** — Renders only when its `value` matches the active tab. Returns `null` otherwise (unmounts from DOM).

---

## 5. Accessibility Requirements

- **ARIA requirements:**
  - List must have `role="tablist"` and `aria-orientation` matching the `orientation` prop.
  - Each trigger must have `role="tab"`, `aria-selected`, `aria-controls` (pointing to `tabpanel-{value}`), and `id` (`tab-{value}`).
  - Each content panel must have `role="tabpanel"`, `aria-labelledby` (pointing to `tab-{value}`), `id` (`tabpanel-{value}`), and `tabIndex={0}`.
  - Disabled triggers must have the native `disabled` attribute.
- **Focus rules:** Roving tabindex — only the selected trigger has `tabIndex={0}`. Arrow keys move focus between triggers. Tab key moves into the active panel. Focus must not get stuck in the tab list.
- **Contrast expectations:** Active trigger text (`$color10`) and inactive text (`$colorSubtitle`) must both meet WCAG 2.1 AA contrast ratios against the tab list background. The active indicator border (`$color10`) must be visually distinguishable.
- **Reduced motion behavior:** Not applicable — no animations are used for tab switching.

---

## 6. Theming Rules

- **Required tokens:** `$borderColor` (list bottom border), `$color10` (active indicator and text), `$colorSubtitle` (inactive text), `$backgroundHover` (trigger hover), `$body` (font family).
- **Prohibited hardcoded values:** No raw hex colors, pixel spacing, or font sizes. All values must reference tokens.
- **Dark mode expectations:** All visual tokens must resolve correctly in both light and dark themes. The active indicator, text colors, and hover background must remain clearly distinguishable in both modes.

---

## 7. Composition Rules

- **What can wrap it:** Any layout primitive (YStack, XStack, View). Page sections. Card content areas.
- **What it may contain:**
  - `Tabs.Root` wraps everything.
  - `Tabs.List` contains one or more `Tabs.Trigger` elements.
  - `Tabs.Content` panels sit as siblings to `Tabs.List` inside `Tabs.Root`.
  - Content panels can contain any arbitrary React content.
- **Anti-patterns:**
  - Do not place `Tabs.Trigger` outside of `Tabs.List`.
  - Do not place `Tabs.Content` outside of `Tabs.Root`.
  - Do not use tabs for sequential/wizard-like flows where step order matters.
  - Do not use tabs when the user needs to compare content across panels.
  - Do not nest tab components inside other tab components.
  - Do not omit `value` on `Tabs.Trigger` or `Tabs.Content` — they must match to associate triggers with panels.

---

## 8. Performance Constraints

- **Memoization rules:** Tab state is managed in the headless layer via context. The styled wrappers are thin and do not need memoization. Triggers register on mount; this is a one-time effect per trigger.
- **Virtualization:** Not applicable for the tab list. If content panels contain large lists, consumers should virtualize within the panel.
- **Render boundaries:** Only the active content panel is mounted. Inactive panels return `null` and are fully unmounted from the DOM. This prevents rendering and computation for hidden tabs. Consumers should be aware that panel state is lost on unmount unless they manage it externally.

---

## 9. Test Requirements

- **What must be tested:**
  - Only the active content panel is rendered; others are unmounted.
  - Controlled mode (`value` + `onValueChange`) reflects the controlled selection.
  - Uncontrolled mode (`defaultValue`) initializes with the correct tab selected.
  - Each size variant (`sm`, `md`, `lg`) applies correct padding and font size.
  - Active trigger shows the `$color10` bottom border indicator.
  - Inactive triggers show transparent bottom border.
  - Disabled triggers cannot be selected.
- **Interaction cases:**
  - Clicking a trigger selects that tab and shows its content.
  - Clicking a disabled trigger does not change the selection.
  - Arrow keys move focus between triggers.
  - Arrow navigation loops at the ends.
  - Enter/Space on a focused trigger selects it.
  - `onValueChange` callback fires with the new value on selection.
- **Accessibility checks:**
  - List has `role="tablist"` and `aria-orientation`.
  - Each trigger has `role="tab"` and `aria-selected`.
  - Selected trigger has `tabIndex={0}`; others have `tabIndex={-1}`.
  - `aria-controls` on trigger matches `id` on content panel.
  - `aria-labelledby` on content panel matches `id` on trigger.
  - Content panel has `role="tabpanel"` and `tabIndex={0}`.
