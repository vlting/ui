# Component Spec — InterestSelector

## 1. Purpose

Provides a UI control for selecting one or more interest tags from a predefined list, used in dating profile creation and preference configuration. It allows users to express personal interests that inform matching algorithms and are displayed on their profile.

Use when: a user is editing their dating profile or configuring match preferences and needs to pick interests from a categorical list.

Do NOT use for: free-text tagging, multi-step category navigation, or selecting non-interest attributes such as gender or age range.

---

## 2. UX Intent

- Primary interaction goal: let users quickly identify and select interests that represent them authentically, with minimal friction.
- Expected user mental model: a tag cloud or chip list where selected items appear visually distinct and can be toggled — familiar from profile-setup flows in social and dating apps (Jakob's Law).
- UX laws applied:
  - Hick's Law: interests are grouped by category so users scan a bounded subset rather than an undifferentiated long list.
  - Fitts's Law: each interest chip has a tap target that meets minimum touch size requirements.
  - Gestalt (similarity + proximity): selected chips are visually distinguished from unselected ones; chips in the same category are grouped together.
  - Miller's Law: the component communicates the current selection count and any maximum limit to prevent overload.

---

## 3. Visual Behavior

- Layout: a wrapping chip/tag list, potentially grouped under category subheadings.
- Selected chips use a filled/accent background; unselected chips use an outlined or subdued style.
- If a maximum selection limit is set, unselected chips appear muted or disabled once the limit is reached.
- A selection counter (e.g., "3 / 5 selected") is shown when a maximum is defined.
- Typography: chip labels use a small-to-body type token; category headings use a label token.
- Token usage: chip background, border, text, and selected state colors sourced from theme tokens.
- Responsive: chips wrap naturally; layout adapts to available width without horizontal scrolling.

---

## 4. Interaction Behavior

- States per chip: unselected (idle), unselected (hover/focus), selected, disabled (limit reached and chip is not selected).
- The selector is controlled: the parent owns the selected values array and receives an `onChange` callback.
- Toggling a chip adds or removes it from the selection.
- When the maximum limit is reached, unselected chips become non-interactive and visually indicate they cannot be selected.
- Keyboard behavior:
  - Each chip is focusable via Tab.
  - Space or Enter toggles the focused chip.
  - Arrow keys may optionally move focus between chips within a group.
- Screen reader behavior: each chip has a role of `checkbox` or `option` with `aria-checked`/`aria-selected` reflecting selection state. Group labels are announced.
- Motion: selected state transition (background/border fill) uses a short fade. Respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- The chip list uses a group role or `role="group"` with an `aria-label` describing the purpose (e.g., "Select your interests").
- Each chip has `role="checkbox"` and `aria-checked` reflecting its selected state.
- Disabled chips have `aria-disabled="true"` and are skipped by tab order.
- Selection count and limit are communicated to screen readers via an `aria-live` region when the selection changes.
- Color alone does not distinguish selected from unselected — shape, weight, or icon must also change.
- All chips meet 4.5:1 contrast in both selected and unselected states.
- Reduced motion: disable chip toggle animation.

---

## 6. Theming Rules

- Required tokens: `background` (chip default), `color` (chip label), accent/primary token for selected chip fill, `borderColor`, `borderRadius` from radius scale, muted/disabled token for limit-reached state.
- Prohibited hardcoded values: no raw colors, no hardcoded pixel font sizes or padding.
- Dark mode: selected and unselected chip surfaces must both resolve correctly via theme tokens.

---

## 7. Composition Rules

- What can wrap it: a profile editor section, a preference settings page, or an onboarding step.
- What it may contain: chip/tag elements and optional category heading labels.
- Anti-patterns:
  - Do not use InterestSelector for free-text input or tag creation.
  - Do not render InterestSelector without a defined interest list prop.
  - Do not hardcode the interest list inside the component — it must be data-driven via props.

---

## 8. Performance Constraints

- If the interest list exceeds ~50 items across categories, consider lazy-rendering off-screen categories.
- Memoize chip components to avoid full-list re-renders when a single chip toggles.
- Avoid recomputing disabled states on every render — derive from selected count and limit prop.

---

## 9. Test Requirements

- Renders all provided interest items as chips.
- Clicking/pressing an unselected chip calls `onChange` with the chip added to the selection array.
- Clicking/pressing a selected chip calls `onChange` with the chip removed from the selection array.
- When selection count reaches the maximum, unselected chips become non-interactive (`aria-disabled="true"`).
- Selection counter reflects current count vs. maximum.
- Each chip has `role="checkbox"` and correct `aria-checked` state.
- Group has an accessible label.
- Keyboard: Space and Enter toggle focused chip.
- `aria-live` region announces selection change.
- No animation on chip toggle when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
