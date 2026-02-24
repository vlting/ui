> **Baseline**: This component must satisfy all requirements in [`QUALITY_BASELINE.md`](../../QUALITY_BASELINE.md).

# Component Spec — Switch

## 1. Purpose

- Renders a toggle switch for binary on/off settings.
- Use for immediate-effect settings (enable notifications, dark mode).
- Do NOT use for form submissions requiring confirmation — use Checkbox instead. Visually distinct from Checkbox.

---

## 2. UX Intent

- **Primary interaction goal:** Toggle a setting between on and off states.
- **Expected user mental model:** A physical switch that slides between two positions.
- **UX laws applied:**
  - **Jakob's Law** — follows the iOS/Android toggle switch pattern.
  - **Fitts's Law** — pill-shaped track provides a large click target.
  - **Doherty Threshold** — immediate visual feedback on toggle.

---

## 3. Anatomy

- **Switch** — Single-component API wrapping Tamagui Switch + Switch.Thumb.

Tamagui Switch.Thumb is used internally but not exposed as a sub-component.

> **TypeScript is the source of truth for props.** See `SwitchProps` in `Switch.tsx` for the full typed API.

---

## 4. Behavior

### States

- **Off** — Thumb positioned left; track in default background.
- **On** — Thumb positioned right; track in active background.
- **Hover** — Subtle background change.
- **Focus** — Blue outline ring (focus-visible).
- **Disabled** — 50% opacity; no interaction.

### Keyboard Interaction

- **Space** — Toggles the switch.
- **Enter** — Toggles the switch (Tamagui built-in).
- Follows the [WAI-ARIA Switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/).

### Motion

- Thumb slides with `animation: 'fast'` on toggle.
- Should respect `prefers-reduced-motion`.

---

## 5. Accessibility

- **Semantic element:** Tamagui Switch provides `role="switch"` semantics.
- **ARIA attributes:** `aria-checked` (true/false); `aria-disabled` when disabled.
- **Focus management:** Switch is focusable; standard tab order.
- **Screen reader announcements:** Role, checked state, and label announced.

---

## 6. Styling

- **Design tokens used:** Size variant maps width and thumb size (`sm`: 36/18, `md`: 44/22, `lg`: 52/26). Track uses `$gray5` when off, `$color` when on. Thumb uses `$background` with `$borderColor` border. Border radius `999` (pill). Focus ring uses `$outlineColor`.
- **Responsive behavior:** Fixed size per variant; does not stretch.
- **Dark mode:** Token-based; resolves automatically.

---

## 7. Composition

- **What can contain this component:** Forms, settings rows (typically paired with a Label).
- **What this component can contain:** No children.
- **Anti-patterns:** Do not use without an associated label. Do not make it look like a checkbox.

---

## 8. Breaking Change Criteria

- Removing `checked`, `onCheckedChange`, `size`, or `disabled` props.
- Changing the ARIA switch role.
- Removing keyboard toggle support.
- Changing the thumb animation behavior.

---

## 9. Test Requirements

- **Behavioral tests:** Toggles on click; `onCheckedChange` fires with correct value; controlled and uncontrolled modes; disabled prevents toggle; `name` prop for form submission.
- **Accessibility tests:** `role="switch"` present; `aria-checked` toggles; Space/Enter toggle; focus ring visible.
- **Visual regression:** Off, on, disabled-off, disabled-on, each size variant.
