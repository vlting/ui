# Component Spec — Button

## 1. Purpose

Provides a universally consistent, accessible, and themeable trigger element for actions — from primary calls-to-action to secondary and destructive actions.

Use it for any user-initiated action that does not navigate to another page (for navigation, use a Link). It is the single source of truth for all button-like interactive elements in the design system.

Do NOT use it for navigation (use Link), for toggles with two stable states (use Switch or a toggle button pattern), or as a non-interactive label.

---

## 2. UX Intent

- Primary interaction goal: action initiation — the user taps or clicks to trigger a discrete, well-labeled action.
- Expected user mental model: a standard pressable button. The label communicates the exact outcome of pressing it.
- UX laws applied:
  - Fitts's Law: minimum tap target size must meet the 44x44pt minimum for touch and 24x24px for pointer devices. Size variants are all touch-accessible.
  - Jakob's Law: use established button visual patterns (filled for primary, outlined for secondary, text-only for tertiary) so users know how to interact without instructions.
  - Hick's Law: limit the number of buttons in a single context. This component must not encourage overuse of primary button style.
  - Doherty Threshold: any visual feedback (press state, loading spinner) must appear within 400ms.

---

## 3. Visual Behavior

- Layout: inline-flex, horizontally centered content (icon + label). Stretches to content width by default; can accept a full-width variant.
- Spacing: internal padding (horizontal larger than vertical) from space tokens. Icon gap from space tokens. Minimum height from size tokens.
- Typography: label text uses a button/label scale from the type system. No wrapping — single line always.
- Token usage:
  - Variant: `primary` (filled accent background, on-accent text), `secondary` (outlined border, accent text or primary text), `tertiary` (no background, accent text), `destructive` (destructive semantic background or border + text).
  - Hover: darken or lighten the background token using a hover-state token.
  - Focus: visible focus ring using an outline token offset from the button edge.
  - Active/pressed: pressed-state token (slightly darkened or scale).
  - Disabled: muted background and text tokens, no interactive states.
  - Loading: spinner icon replaces or accompanies the label; background and text use muted tokens.
- Responsive behavior: the button itself does not change layout at breakpoints. The parent controls layout. A `fullWidth` prop causes the button to fill its container.

---

## 4. Interaction Behavior

- States:
  - Idle: default visual for the variant.
  - Hover: hover-state token applied to background or text.
  - Focus: focus ring visible.
  - Active/pressed: pressed-state visual feedback.
  - Loading: loading spinner visible, label optionally hidden or alongside spinner, not interactive.
  - Disabled: visually muted, not interactive, `aria-disabled="true"` or `disabled` attribute.
- Controlled vs uncontrolled: the button does not own state. It fires an `onPress` / `onClick` callback. Loading and disabled states are controlled by the parent.
- Keyboard behavior:
  - Tab focuses the button.
  - Enter or Space activates the button (both must work).
  - Escape does not activate the button.
- Screen reader behavior: the button's label text is its accessible name. If icon-only (no visible label), an `aria-label` must be provided. Loading state announces "loading" via an `aria-label` update or via an `aria-live` region. Disabled button is conveyed via `aria-disabled` or `disabled` attribute.
- Motion rules: hover and active background transitions use a short duration from motion tokens. Focus ring appearance is instant (no transition). Suppressed under reduced motion.

---

## 5. Accessibility Requirements

- ARIA requirements: always has an accessible name (label text or `aria-label`). When loading, `aria-label` may update to convey the loading state (e.g., "Saving..."). `aria-disabled="true"` is used when the button must remain in the tab order but is non-functional. `disabled` attribute is used when it should be fully skipped.
- Focus rules: always visible focus ring. The focus ring must not be clipped by overflow:hidden on parent containers.
- Contrast expectations: label text against button background must meet WCAG AA in all variants and states (idle, hover, active). Disabled state is exempt from contrast requirements per WCAG but must still be perceivably distinct from non-disabled.
- Reduced motion behavior: hover and active background transitions are instant under `prefers-reduced-motion: reduce`.

---

## 6. Theming Rules

- Required tokens: primary accent, on-accent text, secondary/outline border, tertiary/ghost text, destructive semantic tokens, hover-state overlay, pressed-state overlay, disabled tokens (background and text), focus ring token, space tokens (padding, icon gap, minimum height), border-radius token, type scale token (button label).
- Prohibited hardcoded values: no raw hex colors, no pixel-based padding or min-height, no hardcoded font sizes or weights.
- Dark mode expectations: all button variants must maintain correct contrast and visual hierarchy in dark mode. Destructive variant must remain clearly destructive-looking. Focus ring must be visible against both light and dark backgrounds.

---

## 7. Composition Rules

- What can wrap it: forms, dialog footers, toolbar groups, card footers, list item actions, page-level CTAs.
- What it may contain: a text label, a leading icon, a trailing icon, or a loading spinner. Icon-only variant requires an `aria-label`.
- Anti-patterns:
  - Do not use Button for page navigation — use a Link styled as a button if needed.
  - Do not use multiple primary buttons in the same context.
  - Do not nest buttons inside buttons.
  - Do not use disabled buttons without providing an explanation (tooltip or adjacent text) for why the action is unavailable.

---

## 8. Performance Constraints

- Memoization rules: memoize Button components in lists where many instances render simultaneously (e.g., a list of row action buttons).
- Virtualization: not applicable.
- Render boundaries: the button is a pure presentational primitive. No internal state beyond press animation. No side effects.

---

## 9. Test Requirements

- What must be tested:
  - Renders correctly for all variants (primary, secondary, tertiary, destructive).
  - Renders an icon when provided (leading and trailing positions).
  - `onPress` callback fires on press.
  - `onPress` does not fire when disabled.
  - `onPress` does not fire when loading.
  - Loading state renders a spinner.
  - Disabled state renders with `aria-disabled` or `disabled`.
  - Full-width variant fills its container.
- Interaction cases:
  - Enter key fires `onPress`.
  - Space key fires `onPress`.
  - Tab focuses the button.
  - Disabled button is skipped or non-interactive per the chosen disabled pattern.
- Accessibility checks:
  - Accessible name is present (label text or `aria-label`).
  - Icon-only button without label has `aria-label`.
  - Focus ring is visible when focused.
  - Contrast meets WCAG AA for all variants in both themes.
  - Loading state communicates loading to screen readers.
  - Reduced motion: transitions are instant.
