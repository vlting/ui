# Component Spec — AudienceSelector

## 1. Purpose

Provides a UI surface for selecting one or more target audience segments when configuring a marketing campaign, email, or promotion.

Use when: a user needs to choose which audience segments a campaign or message will be sent to.

Do NOT use when: displaying a static list of audiences for informational purposes only, or when audience selection is irreversible (use a confirmation dialog instead of embedding logic here).

---

## 2. UX Intent

- Primary interaction goal: enable users to identify and select audience segments with confidence, minimizing incorrect choices.
- Expected user mental model: a filterable list or tag-based chooser where segments can be browsed, searched, and selected/deselected.
- UX laws applied:
  - **Hick's Law** — when many segments are available, filtering and search reduce decision time.
  - **Miller's Law** — display a reasonable number of segments per view; paginate or virtualize long lists.
  - **Jakob's Law** — follow familiar multi-select patterns (checkboxes, chips, or toggle rows) so users understand without learning a new paradigm.
  - **Fitts's Law** — selection targets must be large enough for comfortable touch interaction.

---

## 3. Visual Behavior

- Layout: vertical stack of selectable audience rows or chips; may include a search/filter input above the list.
- Each row displays the segment name, an optional description or member count, and a selection indicator (checkbox or highlight).
- Spacing: all gaps and padding reference space tokens.
- Typography: segment name uses body-weight token; count/description uses a smaller muted token.
- Token usage: selection state background, border, and icon color reference theme tokens only.
- Responsive behavior: on narrow viewports the selector occupies full width; on wider viewports it may be presented as a constrained panel.

---

## 4. Interaction Behavior

- States:
  - **idle**: segments listed with unselected state.
  - **hover**: row or chip highlights using a background hover token.
  - **focus**: visible focus ring on each selectable row.
  - **selected**: row or chip shows active selection via background, border, and/or checkmark.
  - **disabled**: a segment may be individually disabled (e.g., insufficient permissions); renders at reduced opacity and is non-interactive.
  - **loading**: an optional loading state for async segment lists; spinner or skeleton visible.
  - **empty**: communicates clearly when no segments match the current filter.
- Controlled/uncontrolled: supports both patterns; selected segment IDs managed externally in controlled mode.
- Keyboard behavior: `Tab` moves focus between rows; `Space` or `Enter` toggles selection; arrow keys navigate within the list.
- Screen reader behavior: each row announces its name, member count if provided, and current selection state.
- Motion rules: selection transitions respect `prefers-reduced-motion`; no animation when reduced motion is active.

---

## 5. Accessibility Requirements

- ARIA: the list container uses `role="listbox"` with `aria-multiselectable="true"`; each option uses `role="option"` with `aria-selected`.
- Focus: focus must be visible at all times; focus must not leave the list unexpectedly during keyboard navigation.
- Contrast: all text and selection indicators meet WCAG 2.1 AA minimums.
- Selection state must not be communicated by color alone; a checkmark, border change, or icon must accompany color changes.
- Reduced motion: suppress animated transitions; instant visual state changes only.

---

## 6. Theming Rules

- Required tokens: `background`, `backgroundHover`, `backgroundSelected`, `borderColor`, `borderColorSelected`, `color`, `colorMuted`, `focusStyle`, `space`, `borderRadius`.
- Prohibited hardcoded values: no literal color strings, pixel spacing, or border-radius numbers.
- Dark mode: all tokens must resolve correctly in both light and dark themes with sufficient contrast.

---

## 7. Composition Rules

- May be embedded inside a form, modal, or campaign configuration panel.
- May accept a search input as a child or sibling for filtering; filtering logic is owned by the consumer.
- The component renders selection UI only; it does not fetch audience data or trigger campaign actions.
- Anti-patterns:
  - Do not nest another `AudienceSelector` inside this component.
  - Do not hardcode segment names inside the component.
  - Do not implement business rules (e.g., audience overlap warnings) inside this component; surface them via consumer-provided props.

---

## 8. Performance Constraints

- When rendering more than ~50 segments, the parent should apply virtualization; this component cooperates but does not implement virtualization itself.
- The component should be memoized when used inside a frequently re-rendering form.
- No internal data fetching, timers, or subscriptions.

---

## 9. Test Requirements

- Renders a list of audience segments from props.
- Selecting a row updates selection state (controlled) or internal state (uncontrolled).
- Deselecting a selected row removes it from the selection.
- Disabled segments are non-interactive and announce their disabled state to screen readers.
- Loading state renders a visible loading indicator.
- Empty state renders a meaningful empty message.
- Keyboard navigation (Tab, Space, Enter, arrows) works correctly.
- Focus ring is visible during keyboard navigation.
- Passes axe accessibility audit in idle, selected, and disabled states.
