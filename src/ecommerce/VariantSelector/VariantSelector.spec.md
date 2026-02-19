# Component Spec — VariantSelector

## 1. Purpose

Provides a UI control for selecting a specific product variant — such as size, color, or material — before adding a product to the cart. It ensures the user has made all required variant selections to uniquely identify the desired product version.

Use when: a product has multiple variants (size, color, style, etc.) and the user must choose one before proceeding to purchase.

Do NOT use for: filtering product catalog results (use filter/facet components), selecting quantities (use a stepper), or choosing between separate products.

---

## 2. UX Intent

- Primary interaction goal: make variant selection fast, clear, and mistake-proof so users are confident they have selected the right option.
- Expected user mental model: a set of option chips or swatches — color variants as color swatches; size/material variants as labeled chips (Jakob's Law, ecommerce convention).
- UX laws applied:
  - Hick's Law: options are presented all at once in a compact group; unavailable options are visually marked rather than hidden (to preserve the option's existence in the user's mental model).
  - Fitts's Law: each variant option must have a touch-friendly tap target.
  - Gestalt (similarity): all options of the same dimension (e.g., size) are grouped together with a group label.
  - Feedback: selecting a variant produces immediate visual confirmation (filled/selected state).

---

## 3. Visual Behavior

- Layout: a labeled group of selectable chips or swatches, one group per variant dimension (e.g., "Size", "Color").
- Selected option uses a filled/accent-bordered style to indicate active selection.
- Unavailable (out-of-stock) options are visually muted with a diagonal strikethrough on swatches or a muted chip style, and are non-interactive.
- Color variants: rendered as circular or square swatches showing the actual color; label is provided via tooltip or screen reader text.
- Size/material variants: rendered as labeled rectangular chips.
- Group label uses a body/label type token above the option group.
- Selected variant value (e.g., "Size: M") may be displayed alongside the group label.
- Spacing: option gap and group gap use space tokens; chip padding uses space tokens.
- Token usage: chip background, border, selected state accent, muted/disabled state, and text colors from theme tokens.
- Responsive: chip group wraps naturally; swatches maintain their defined size.

---

## 4. Interaction Behavior

- States per option: unselected (idle), unselected (hover/focus), selected, unavailable/disabled.
- The selector is controlled: the parent owns the selected value for each variant dimension and receives an `onChange(dimension, value)` callback.
- Pressing an available option selects it; pressing a selected option may deselect it (if the dimension is optional) or remain selected.
- Unavailable options are non-interactive.
- Keyboard behavior:
  - Each available option chip is focusable via Tab.
  - Arrow keys navigate between options within a group.
  - Enter or Space selects the focused option.
  - Unavailable options are skipped by arrow key navigation and tab order.
- Screen reader behavior: the group has a `role="radiogroup"` or `role="group"` with an `aria-label` (the dimension name). Each option has `role="radio"` (or equivalent) with `aria-checked` reflecting selection and `aria-disabled` for unavailable options.
- Motion: selected state transition (border fill) uses a short fade. Respects `prefers-reduced-motion`.

---

## 5. Accessibility Requirements

- Each variant dimension group has `role="radiogroup"` and `aria-label` (e.g., "Select Size").
- Each option chip has `role="radio"` and `aria-checked` reflecting its selected state.
- Unavailable options have `aria-disabled="true"` and may include a screen reader annotation (e.g., "Out of stock").
- Color swatches must not rely on color alone — each swatch has an `aria-label` with the color name.
- The selected value is communicated via `aria-checked` and, if shown inline, the visible label update.
- All selectable chips meet minimum touch target size.
- Contrast: chip labels meet 4.5:1; selected chip indicator meets 3:1 against the chip background.
- Reduced motion: no selected state transition animation.

---

## 6. Theming Rules

- Required tokens: chip background (default), accent/highlight token for selected border/background, muted token for unavailable state, `borderColor` (chip default and selected), `color` (chip label), `borderRadius` (chip shape), focus ring token.
- Prohibited hardcoded values: no raw colors (including swatch colors — they must be passed as data, not hardcoded), no hardcoded pixel chip sizes.
- Dark mode: chip backgrounds, borders, selected state, and muted state must all resolve via theme tokens.

---

## 7. Composition Rules

- What can wrap it: a product detail page, a quick-view modal, a CartItemRow variant display (read-only mode), or CheckoutForm variant confirmation.
- What it may contain: one or more labeled option groups, each containing chip or swatch elements.
- Anti-patterns:
  - Do not use VariantSelector for catalog filtering — it is product-specific selection, not a filter control.
  - Do not hardcode the list of options — accept them via props.
  - Do not allow selection of unavailable variants.

---

## 8. Performance Constraints

- Memoize VariantSelector and individual option chips — it re-renders when selection changes.
- Swatch color rendering must not cause layout recalculation; use background-color from a stable style value.
- No virtualization required; variant counts are small and bounded (typically 2–20 options per dimension).

---

## 9. Test Requirements

- Renders each variant dimension group with its label and all available options.
- Selecting an option calls `onChange` with the correct dimension and value.
- Selected option has `aria-checked="true"`.
- Unselected option has `aria-checked="false"`.
- Unavailable option has `aria-disabled="true"` and is not activatable by keyboard or pointer.
- Unavailable option is skipped in arrow key and tab navigation.
- Color swatch options have `aria-label` with the color name.
- Each group has `role="radiogroup"` and an `aria-label`.
- No selected-state transition animation when `prefers-reduced-motion` is active.
- Passes automated accessibility audit.
- Snapshot test for unselected, selected, and with-unavailable-options states.
