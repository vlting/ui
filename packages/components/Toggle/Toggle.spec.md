> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Toggle

## 1. Purpose

- Renders a button that maintains a pressed/unpressed state.
- Use for toggling view modes, formatting options, or feature flags.
- Do NOT use for on/off settings — use Switch. Do NOT use for selecting from a group — use ToggleGroup.

---

## 2. UX Intent

- **Primary interaction goal:** Toggle a binary state by pressing a button.
- **Expected user mental model:** A button that stays "pressed in" when active and "pops out" when inactive.
- **UX laws applied:**
  - **Jakob's Law** — follows toolbar toggle button conventions.
  - **Fitts's Law** — appropriately sized per `size` variant.

---

## 3. Anatomy

- **Toggle** — Standalone toggle button using `styledHtml('button')` for native HTML `<button>`.
- **ToggleGroup** — Container for multiple related toggles (single or multiple selection).
- **ToggleGroup.Item** — Individual toggle within a group (wraps Tamagui ToggleGroup.Item).

> **TypeScript is the source of truth for props.** See `ToggleProps` and `ToggleGroupProps` in `Toggle.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Unpressed** — Default appearance; `aria-pressed="false"`.
- **Pressed** — Active appearance (background change); `aria-pressed="true"`.
- **Hover** — Background hover feedback.
- **Focus** — Focus ring (focus-visible).
- **Disabled** — Reduced opacity; no interaction; `aria-disabled="true"`.

### Keyboard Interaction

- **Enter/Space** — Toggles pressed state.
- **ToggleGroup:** Arrow keys navigate between items (roving tabindex via Tamagui).
- Follows the [WAI-ARIA Toggle Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

### Motion

- No animations.

---

## 5. Accessibility

- **Semantic element:** Native `<button>` via `styledHtml('button')` for Toggle. Tamagui ToggleGroup for group.
- **ARIA attributes:** `aria-pressed` (true/false) on Toggle; `type="button"` to prevent form submission; `aria-disabled` when disabled.
- **Focus management:** Standard tab order. ToggleGroup uses roving tabindex for arrow key navigation.
- **Screen reader announcements:** Button role, pressed state, and label announced.

---

## 6. Styling

- **Design tokens used:** Size variant (`sm`/`md`/`lg`) controls height, padding, font size, and border radius. `$borderColor` for border; `$backgroundHover` for hover; `$gray4` for pressed background. Outline variant uses transparent background with border.
- **Responsive behavior:** Inline sizing; adapts to content.
- **Dark mode:** Token-based; resolves automatically.

---

## 7. Composition

- **What can contain this component:** Toolbars, form controls, filter bars.
- **What this component can contain:** Text or icon children.
- **Anti-patterns:** Do not use Toggle for navigation. Do not mix Toggle and ToggleGroup.Item in the same group.

---

## 8. Breaking Change Criteria

- Removing `pressed`, `onPressedChange`, `variant`, `size`, or `disabled` props.
- Removing `aria-pressed` attribute.
- Changing the rendered element from native `<button>`.
- Removing ToggleGroup or ToggleGroup.Item sub-components.
- Changing ToggleGroup `type` behavior (single vs multiple).

---

## 9. Test Requirements

- **Behavioral tests:** Toggles pressed state on click; `onPressedChange` fires; controlled mode works; disabled prevents toggle; ToggleGroup single mode enforces one selection; multiple mode allows many.
- **Accessibility tests:** `aria-pressed` toggles; native `<button>` rendered; `type="button"` set; arrow keys navigate ToggleGroup; `aria-disabled` when disabled.
- **Visual regression:** Unpressed, pressed, disabled, outline variant, each size, ToggleGroup horizontal/vertical.
