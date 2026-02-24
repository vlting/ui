# Component Spec — Tabs

> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

## 1. Purpose

- Provides a tabbed navigation interface that allows users to switch between related content panels within the same view.
- Should be used when content can be logically divided into discrete, parallel sections that share context (e.g., settings categories, detail views, data tabs).
- Should NOT be used for primary site navigation (use a navigation bar or sidebar), for sequential steps (use a stepper), or when the user needs to compare content across tabs simultaneously.

---

## 2. UX Intent

- **Primary interaction goal:** Let the user quickly switch between related content sections without leaving the current view, while clearly indicating which section is active.
- **Expected user mental model:** "I click a tab label and the content below changes. Only one tab is active at a time." This follows the universal tab bar pattern.
- **UX laws applied:**
  - **Jakob's Law** — Tabs must follow the standard tabbed interface pattern: horizontal list of triggers with visual indicator, single active panel.
  - **Hick's Law** — The number of tabs should remain manageable. The component supports this by providing clear visual distinction between active and inactive triggers.
  - **Miller's Law** — Tab labels should be concise. The visual design (size variants, font scaling) supports scanability.
  - **Gestalt Principles (Common Region & Proximity)** — The tab list background and active indicator visually connect triggers to their content panel. The content panel sits directly below the list.
  - **Doherty Threshold** — Tab switching must be instant (no loading delay). Content panels mount/unmount immediately.

---

## 3. Anatomy

Tabs is a compound component exported as a plain object with sub-components. It is built on `@tamagui/tabs`, which provides roving focus, keyboard navigation, and ARIA semantics. The styled layer adds visual presentation only.

- **Tabs.Root** — Wraps `@tamagui/tabs` `Tabs` with `activationMode="manual"`. Accepts controlled (`value` + `onValueChange`) and uncontrolled (`defaultValue`) patterns, plus an `orientation` prop.
- **Tabs.List** — Wraps `@tamagui/tabs` `Tabs.List` in `unstyled` mode. Styled with `$color3` background, `$4` border radius, `$1` padding, and `$0` gap. Contains all trigger elements.
- **Tabs.Trigger** — Wraps `@tamagui/tabs` `Tabs.Tab` in `unstyled` mode. Uses `useTabsContext` to determine if selected. Selected triggers get `$background` background color; unselected get transparent with `$backgroundHover` on hover. Size variant controls horizontal/vertical padding. Includes `focusVisibleStyle` with `$outlineColor` outline ring. Renders a `StyledTriggerText` child with `$color10` color when active, `$colorSubtitle` when inactive.
- **Tabs.Content** — Wraps `@tamagui/tabs` `Tabs.Content`. Children rendered inside a `StyledContent` view with `$3` vertical padding. Only the content panel matching the active tab value is rendered; others return `null`.

> **TypeScript is the source of truth for props.** See `TabsRootProps`, `TabsListProps`, and `TabsContentProps` in `Tabs.tsx` for the full typed API. Do not duplicate prop tables here.

---

## 4. Behavior

### States

- **Trigger idle (inactive)** — Text in `$colorSubtitle`, transparent background. Pointer cursor.
- **Trigger hover** — Background shifts to `$backgroundHover` (inactive triggers only; selected triggers remain `$background`).
- **Trigger active (selected)** — Text in `$color10`, `$background` background color, `$3` border radius.
- **Trigger disabled** — Cannot be selected via click. `cursor: not-allowed`. Native `disabled` attribute is set.
- **Trigger focus** — Visible `focusVisibleStyle` outline ring (2px, `$outlineColor`, 1px offset).

### Keyboard Interaction

- **Arrow keys** (Left/Right for horizontal, Up/Down for vertical) move focus between triggers. Navigation loops at the ends. Home/End keys jump to first/last tab.
- **Enter/Space** selects the focused trigger (manual activation mode).
- **Tab** moves focus into the active content panel (via `tabIndex={0}` on the panel), then out of the tabs component.
- Keyboard navigation is handled by `@tamagui/roving-focus` integrated into `@tamagui/tabs`.
- Follows the WAI-ARIA APG [Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

### Motion

- No animations are defined on tab switching. Content panels mount and unmount instantly. Hover background changes are instant.

---

## 5. Accessibility

- **Semantic element:** Each trigger renders as a `<button>` with `role="tab"` (via `@tamagui/tabs`). The list renders with `role="tablist"`. Content panels render with `role="tabpanel"`.
- **ARIA attributes:**
  - List has `role="tablist"` and `aria-orientation` matching the `orientation` prop.
  - Each trigger has `role="tab"`, `aria-selected`, `aria-controls` (linking to its panel), and `data-state`.
  - Each content panel has `role="tabpanel"`, `aria-labelledby` (linking to its trigger).
  - Disabled triggers have the native `disabled` attribute.
  - Tab/panel IDs are auto-generated by `@tamagui/tabs` using `React.useId()`.
- **Focus management:** Roving tabindex -- only the selected trigger has `tabIndex={0}`. Arrow keys move focus between triggers. Tab key moves into the active panel. Focus must not get stuck in the tab list.
- **Screen reader announcements:** Triggers announce as tabs with selected state. Content panels announce as tabpanels with their associated trigger label.
- **Contrast:** Active trigger text (`$color10`) and inactive text (`$colorSubtitle`) must both meet WCAG 2.1 AA contrast ratios against the tab list background (`$color3`). The active indicator background must be visually distinguishable.

---

## 6. Styling

- **Design tokens used:**
  - Colors: `$color3` (list background), `$color10` (active text), `$colorSubtitle` (inactive text), `$background` (selected trigger bg), `$backgroundHover` (hover), `$outlineColor` (focus ring).
  - Font: `$body` family, `$3` weight. Font sizes scale with size variant (`$2`, `$3`, `$4`).
  - Spacing: trigger padding scales with size (sm=`$2`/`$1`, md=`$3`/`$2`, lg=`$4`/`$3`). Content padding `$3` vertical. List padding `$1`, gap `$0`.
  - Radius: `$4` on list, `$3` on triggers.
- **Responsive behavior:** Accepts Tamagui media query props. The tab list does not wrap by default; on narrow screens, the consumer is responsible for handling overflow (e.g., horizontal scroll or responsive size variant).
- **Reduced motion:** Not applicable -- no animations are used for tab switching.
- **Dark mode:** All visual tokens must resolve correctly in both light and dark themes. The active indicator, text colors, and hover background must remain clearly distinguishable in both modes. No hardcoded values are used.

---

## 7. Composition

- **What can contain this component:** Any layout primitive (YStack, XStack, View). Page sections. Card content areas.
- **What this component can contain:**
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
  - Do not omit `value` on `Tabs.Trigger` or `Tabs.Content` -- they must match to associate triggers with panels.

---

## 8. Breaking Change Criteria

- Removing any sub-component (`Root`, `List`, `Trigger`, `Content`).
- Removing the `value`/`defaultValue`/`onValueChange` controlled/uncontrolled API on Root.
- Removing the `orientation` prop from Root.
- Removing the `value` prop from Trigger or Content.
- Removing the `disabled` prop from Trigger.
- Removing `role="tablist"`, `role="tab"`, or `role="tabpanel"`.
- Removing keyboard navigation support (arrow keys, looping, Home/End).
- Removing `aria-selected`, `aria-controls`, or `aria-labelledby` attributes.
- Changing from single-panel rendering to all-panels-rendered (would change mount/unmount behavior).

---

## 9. Test Requirements

- **Behavioral tests:**
  - Only the active content panel is rendered; others are unmounted.
  - Controlled mode (`value` + `onValueChange`) reflects the controlled selection.
  - Uncontrolled mode (`defaultValue`) initializes with the correct tab selected.
  - Each size variant (`sm`, `md`, `lg`) applies correct padding and font size.
  - Active trigger shows `$background` background and `$color10` text.
  - Inactive triggers show transparent background and `$colorSubtitle` text.
  - Disabled triggers cannot be selected.
- **Accessibility tests:**
  - List has `role="tablist"` and `aria-orientation`.
  - Each trigger has `role="tab"` and `aria-selected`.
  - Selected trigger has `tabIndex={0}`; others have `tabIndex={-1}`.
  - `aria-controls` on trigger matches `id` on content panel.
  - `aria-labelledby` on content panel matches `id` on trigger.
  - Content panel has `role="tabpanel"` and `tabIndex={0}`.
  - Arrow keys move focus between triggers.
  - Arrow navigation loops at the ends.
  - Enter/Space on a focused trigger selects it.
- **Visual regression:**
  - Active and inactive trigger states.
  - Each size variant.
  - Hover and focus states on triggers.
